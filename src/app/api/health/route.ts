export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      ok: true,
      service: "onspec-web-production",
      status: "operational",
      checkedAt: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    }
  );
}
