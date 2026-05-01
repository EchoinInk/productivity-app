/**
 * 🎯 Card Variants (UX-driven, not just visual)
 */
export type CardVariant =
  | "hero"     // Primary focus (top of screen)
  | "default"  // Standard content
  | "glass"    // Glass morphism effect
  | "solid"    // Solid background with subtle shadow
  | "data"     // Metrics / insights
  | "alert"    // Urgent / attention
  | "subtle"   // Minimal / transparent
  | "budget";  // Budget-focused gradient (legacy)

/**
 * 📏 Size Variants (controls padding + radius)
 */
export type CardSize = "sm" | "md" | "lg";