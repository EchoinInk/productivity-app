import catHome from "@/assets/categoryIcons/category-home.webp";
import catHealth from "@/assets/categoryIcons/category-health.webp";
import catCareer from "@/assets/categoryIcons/category-career.webp";
import catErrands from "@/assets/categoryIcons/category-errands.webp";
import catFamily from "@/assets/categoryIcons/category-family.webp";
import catFinance from "@/assets/categoryIcons/category-finance.webp";
import type { TaskCategory } from "@/features/tasks/types/types";

export const taskCategories = [
  "Home & Household",
  "Health & Wellness",
  "Career Development",
  "Errands & Life Admin",
  "Family & Relationships",
  "Finances",
] as const satisfies readonly TaskCategory[];

export const categoryMetadata = {
  "Home & Household": { bg: "bg-surface-blue", text: "text-blue", icon: catHome },
  "Health & Wellness": { bg: "bg-surface-red", text: "text-red", icon: catHealth },
  "Career Development": { bg: "bg-surface-yellow", text: "text-yellow", icon: catCareer },
  "Errands & Life Admin": { bg: "bg-surface-cyan", text: "text-cyan", icon: catErrands },
  "Family & Relationships": { bg: "bg-surface-purple", text: "text-purple", icon: catFamily },
  Finances: { bg: "bg-surface-gray", text: "text-gray", icon: catFinance },
  Other: { bg: "bg-muted", text: "text-muted-foreground", icon: catErrands },
} as const;
