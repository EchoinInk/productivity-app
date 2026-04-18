export const gradientPrimary = [
  "#8efbf2", // cyan (soft, milky)
  "#b2e7e6",
  "#abc4f1",
  "#E0D0FF", // **in‑between lavender (new smoothing stop)**
  "#E7D9FF", // lavender (your signature tone)
  "#D4C4FF", // darker lavender (richer, moodier, still pastel)
  "#E0D0FF", // **in‑between lavender (new smoothing stop)**
  "#F0DFFF", // blue‑pink (cool blush)
  "#FFE7D1", // peach (gentle finish)
];

export const gradientPrimaryCss = `linear-gradient(115deg, ${gradientPrimary.join(", ")})`;
