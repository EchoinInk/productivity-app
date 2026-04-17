export const gradientPrimary = [
  "#E7D9FF", // lilac
  "#F8DFFF", // blush pink
  "#FADCEB", // rose haze
  "#FFE7D1", // peach mist
];

export const gradientPrimaryCss = `linear-gradient(135deg, ${gradientPrimary.join(", ")})`;

// Stroke gradient (slightly more saturated for visibility on icons)
export const gradientStroke = ["#B9A5E8", "#E8A8D4", "#F2B89E"];
export const gradientStrokeCss = `linear-gradient(135deg, ${gradientStroke.join(", ")})`;
