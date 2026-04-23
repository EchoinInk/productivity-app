import { gradientSecondaryCss } from "@/lib/gradients";

export const surfaceShadow =
  "shadow-[0_6px_18px_rgba(120,120,200,0.18)]";

// ✅ ADD THIS
export const surfaceText =
  "text-white drop-shadow-soft";

export const surfaces = {
  gradientSubtle: {
    background: gradientSecondaryCss,
    filter: "saturate(1.1) contrast(1.05)",
  },
};