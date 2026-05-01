import { useNavigate } from "react-router-dom";

interface UseTodaySummaryRowProps {
  remaining: number;
  billsDueCount: number;
}

export const useTodaySummaryRow = ({
  remaining,
  billsDueCount,
}: UseTodaySummaryRowProps) => {
  const navigate = useNavigate();

  const billsLabel =
    billsDueCount === 0
      ? "No bills due"
      : `${billsDueCount} ${billsDueCount === 1 ? "bill" : "bills"} due`;

  const handleClick = () => {
    navigate("/budget");
  };

  return {
    remaining,
    billsLabel,
    onClick: handleClick,
  };
};
