import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { Card, CardBody } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";

interface TodaySummaryCardProps {
  remaining: number;
  billsDueCount: number;
}

const TodaySummaryCard = ({ remaining, billsDueCount }: TodaySummaryCardProps) => {
  const navigate = useNavigate();

  const billsLabel =
    billsDueCount === 0
      ? "No bills due"
      : `${billsDueCount} ${billsDueCount === 1 ? "bill" : "bills"} due`;

  return (
    <Card variant="data">
      <CardBody>
        <button
          type="button"
          onClick={() => navigate("/budget")}
          className="w-full flex items-center justify-between gap-4 active:opacity-70 transition"
          aria-label="View budget and bills summary"
        >
          <div className="flex items-baseline gap-2 min-w-0">
            <UIText.Metric>${remaining}</UIText.Metric>
            <UIText.BodyMuted>left</UIText.BodyMuted>
            <UIText.BodyMuted aria-hidden="true">•</UIText.BodyMuted>
            <UIText.BodyStrong truncate>{billsLabel}</UIText.BodyStrong>
          </div>
          <ChevronRight size={18} className="text-muted-foreground shrink-0" />
        </button>
      </CardBody>
    </Card>
  );
};

export default TodaySummaryCard;
