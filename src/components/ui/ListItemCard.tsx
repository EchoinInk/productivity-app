import { motion } from "framer-motion";
import { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

interface ListItemCardProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "glass" | "solid";
  className?: string;
  withAnimation?: boolean;
}

export const ListItemCard = ({
  children,
  onClick,
  variant = "solid",
  className = "",
  withAnimation = true,
}: ListItemCardProps) => {
  const cardContent = (
    <Card
      variant={variant}
      className={`px-4 py-3 ${onClick ? "cursor-pointer active:scale-[0.98] transition-transform duration-150" : ""} ${className}`}
    >
      {children}
    </Card>
  );

  if (withAnimation) {
    return (
      <motion.div layout whileTap={{ scale: 0.98 }} transition={spring}>
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};
