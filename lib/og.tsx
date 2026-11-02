import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${site.name} — ${site.tagline}`;

// Read once at module scope (static assets, not request data).
const logoSrc = `data:image/png;base64,${await readFile(
  join(process.cwd(), "public/brand/heyula-logo.png"),
  "base64",
)}`;
const plexMono = await readFile(join(process.cwd(), "assets/fonts/ibm-plex-mono-latin-400-normal.woff"));

const LOGO_W = 640;
const LOGO_H = Math.round((LOGO_W * 148) / 447);

const text = {
  fontFamily: "IBM Plex Mono",
  fontSize: 22,
  letterSpacing: 2.2,
  textTransform: "uppercase" as const,
};

/** Social share card: black ground so the logo's black backdrop disappears. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#000",
          color: "#fff",
          padding: "40px 48px",
          ...text,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: 18,
            borderBottom: "1px solid #3a3a3a",
          }}
        >
          <span>{site.location.display}</span>
          <span>{new URL(site.url).host}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          {/* crop to the left 96.18% of the source, same as the Figma frame */}
          <div style={{ display: "flex", width: LOGO_W, height: LOGO_H, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- OG images render plain <img> */}
            <img src={logoSrc} width={Math.round(LOGO_W * 1.03973)} height={LOGO_H} alt="" />
          </div>
          <span style={{ fontSize: 26, letterSpacing: 2.6 }}>{site.tagline}</span>
        </div>

        <div
          style={{
            display: "flex",
            color: site.colors.accent,
            border: `1px solid ${site.colors.accent}`,
            borderTop: "none",
            borderBottom: "none",
            padding: "10px 28px",
          }}
        >
          New website under construction
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "IBM Plex Mono", data: plexMono, weight: 400, style: "normal" }],
    },
  );
}
