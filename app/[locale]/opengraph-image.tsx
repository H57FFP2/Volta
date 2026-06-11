import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "VAULTAWEB — Studio de création web";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tagline =
    locale === "en"
      ? "Premium web design studio — Montreal"
      : "Studio de création web premium — Montréal";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#0f1511",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(184,255,46,0.18), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#B8FF2E",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#B8FF2E",
            }}
          />
          Montréal, Canada
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 150,
            fontWeight: 900,
            color: "#f5f7f4",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          VAULTAWEB
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 44,
            color: "#a8b3a6",
            maxWidth: 900,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
