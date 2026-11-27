import { hashIdentifier } from "@/lib/request-identity";

export type RateLimitRule = {
  id: string;
  limit: number;
  windowSeconds: number;
};

export const rateLimitRules = {
  enquiryIp: {
    id: "enquiry-ip",
    limit: 10,
    windowSeconds: 10 * 60, // 10 minutes
  },
  enquiryEmail: {
    id: "enquiry-email",
    limit: 5,
    windowSeconds: 10 * 60, // 10 minutes
  },
  apiGeneralIp: {
    id: "api-general-ip",
    limit: 60,
    windowSeconds: 60, // 1 minute
  },
} as const;

type Bucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, Bucket>();

// Auto-cleanup stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of memoryBuckets.entries()) {
      if (bucket.resetAt <= now) {
        memoryBuckets.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    (cleanupTimer as { unref: () => void }).unref();
  }
}

export type RateLimitCheckResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

export async function checkRateLimit(
  rule: RateLimitRule,
  identifierParts: string[]
): Promise<RateLimitCheckResult> {
  const hashedKey = `${rule.id}:${hashIdentifier(identifierParts)}`;
  const now = Date.now();
  const windowMs = rule.windowSeconds * 1000;

  const current = memoryBuckets.get(hashedKey);

  if (!current || current.resetAt <= now) {
    const newBucket: Bucket = {
      count: 1,
      resetAt: now + windowMs,
    };
    memoryBuckets.set(hashedKey, newBucket);
    return {
      success: true,
      limit: rule.limit,
      remaining: rule.limit - 1,
      reset: Math.ceil(newBucket.resetAt / 1000),
    };
  }

  if (current.count >= rule.limit) {
    return {
      success: false,
      limit: rule.limit,
      remaining: 0,
      reset: Math.ceil(current.resetAt / 1000),
    };
  }

  current.count += 1;
  return {
    success: true,
    limit: rule.limit,
    remaining: rule.limit - current.count,
    reset: Math.ceil(current.resetAt / 1000),
  };
}
