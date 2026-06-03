"use client";

const BG = "15,21,17";

const rawStops: Array<[number, number]> = Array.from(
  { length: 18 },
  (_, i) => {
    const pos = Math.round((i / 17) * 100);
    const t   = pos / 100;
    const a   = Math.round(t * t * t * 1000) / 1000;
    return [pos, a];
  }
);

const GRADIENT = [
  "linear-gradient(in srgb-linear to bottom,",
  rawStops
    .map(([pos, a]) => `  rgba(${BG},${a}) ${pos}%`)
    .join(",\n"),
  ")",
].join("\n");

export function SectionFade() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none"
      style={{
        height: "clamp(320px, 40vh, 520px)",
        marginTop: "clamp(-160px, -20vh, -260px)",
        zIndex: 10,
        background: GRADIENT,
      }}
    />
  );
}
