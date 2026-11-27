import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ONSPEC.EU",
    short_name: "ONSPEC",
    description: "Your Vision. Our Execution. Engineered to operate across Cyprus & the EU.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/onspec_logo_transparent.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/onspec_logo_transparent.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
