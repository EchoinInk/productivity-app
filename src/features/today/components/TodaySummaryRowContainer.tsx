import { TodaySummaryRowView } from "./TodaySummaryRowView";
import { useTodaySummaryRow } from "../hooks/useTodaySummaryRow";

interface TodaySummaryRowProps {
  remaining: number;
  billsDueCount: number;
}

export const TodaySummaryRow = ({
  remaining,
  billsDueCount,
}: TodaySummaryRowProps) => {
  const rowData = useTodaySummaryRow({ remaining, billsDueCount });

  return <TodaySummaryRowView {...rowData} />;
};
