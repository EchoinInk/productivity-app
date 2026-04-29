import { useNavigate } from "react-router-dom";
import { TodaySummaryRowView } from "./TodaySummaryRowView";

interface TodaySummaryRowProps {
  remaining: number;
  billsDueCount: number;
}

export const TodaySummaryRow = ({
  remaining,
  billsDueCount,
}: TodaySummaryRowProps) => {
  const navigate = useNavigate();

  const billsLabel =
    billsDueCount === 0
      ? "No bills due"
      : `${billsDueCount} ${billsDueCount === 1 ? "bill" : "bills"} due`;

  const handleClick = () => {
    navigate("/budget");
  };

  return (
    <TodaySummaryRowView
      remaining={remaining}
      billsLabel={billsLabel}
      onClick={handleClick}
    />
  );
};

export default TodaySummaryRow;
