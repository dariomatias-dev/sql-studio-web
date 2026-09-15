import { SITE_DESCRIPTION, SITE_NAME } from "@/shared/lib/site";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00bcd4",
    icons: [{ src: "/icons/sql_studio.png", sizes: "280x280", type: "image/png" }],
  };
}
