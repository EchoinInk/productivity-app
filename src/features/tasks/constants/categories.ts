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
  "Home & Household": { bg: "hsl(211 84% 97%)", text: "hsl(214 38% 47%)", icon: catHome },
  "Health & Wellness": { bg: "hsl(348 67% 97%)", text: "hsl(340 48% 56%)", icon: catHealth },
  "Career Development": { bg: "hsl(45 22% 96%)", text: "hsl(0 0% 42%)", icon: catCareer },
  "Errands & Life Admin": { bg: "hsl(193 70% 98%)", text: "hsl(194 38% 47%)", icon: catErrands },
  "Family & Relationships": { bg: "hsl(306 78% 97%)", text: "hsl(326 42% 53%)", icon: catFamily },
  Finances: { bg: "hsl(240 38% 95%)", text: "hsl(240 38% 53%)", icon: catFinance },
  Other: { bg: "hsl(var(--muted))", text: "hsl(var(--muted-foreground))", icon: catErrands },
} as const;
