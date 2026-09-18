import { ImageResponse } from "next/og";

import { SITE_DESCRIPTION, SITE_NAME } from "@/shared/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 50% 30%, rgba(0, 188, 212, 0.25), transparent 60%)",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 84,
          fontWeight: 800,
          color: "white",
          letterSpacing: "-0.02em",
        }}
      >
        {SITE_NAME}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          maxWidth: 900,
          textAlign: "center",
          fontSize: 32,
          color: "#a1a1aa",
        }}
      >
        {SITE_DESCRIPTION}
      </div>
    </div>,
    size,
  );
}
