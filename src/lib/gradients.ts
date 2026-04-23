export const gradientPrimary = [
  "#b8fff8", // soft aqua
  "#d2e1fb", // powder periwinkle
  "#d9ddff", // lilac mist
  "#eeddf7", // lavender blush
  "#ffe8e8", // rose haze
]; // used action button

export const gradientPrimaryCss = `linear-gradient(165deg, ${gradientPrimary.join(", ")})`;

export const gradientSecondary = [
  "#b4fdf6", // soft aqua (slightly deeper than primary)
  "#cde0f7", // powder periwinkle (gentle shift)
  "#d4d7fb", // lilac mist (soft but clearer difference)
  "#e9d7f3", // lavender blush (slightly richer)
  "#ffe2e2", // rose haze (soft warm shift)
];
// used one add button on dashboard

export const gradientSecondaryCss = `linear-gradient(-150deg, ${gradientSecondary.join(", ")})`;

export const gradientTertiary = [
  "#b0f7f3", // balanced aqua
  "#c0d0f3", // balanced periwinkle
  "#c7c9f6", // balanced lavender-blue
  "#ded0e7", // balanced muted lilac
  "#f6d0d0", // balanced soft rose
];
//addbutton expense dashboard

export const gradientTertiaryCss = `linear-gradient(130deg, ${gradientTertiary.join(", ")})`;

export const gradientQuaternary = [
  "#b2f4ee", // bright airy teal
  "#c4d4f0", // light soft periwinkle
  "#cfcdf5", // brighter lavender-blue
  "#e2d2eb", // soft muted lilac
  "#f7d2d2", // bright soft rose
];

export const gradientQuaternaryCss = `linear-gradient(110deg, ${gradientQuaternary.join(", ")})`;
