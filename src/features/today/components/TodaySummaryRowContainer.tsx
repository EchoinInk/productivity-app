import { TodaySummaryRowView } from "./TodaySummaryRowView";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface TodaySummaryRowProps {
  remaining: number;
  billsDueCount: number;
}

export const TodaySummaryRow = ({
  remaining,
  billsDueCount,
}: TodaySummaryRowProps) => {
  const navigate = useNavigate();
  
  const rowData = useMemo(() => {
    const billsLabel = billsDueCount === 0 
      ? "No bills due"
      : billsDueCount === 1 
      ? "1 bill due"
      : `${billsDueCount} bills due`;
    
    return {
      remaining,
      billsLabel,
      onClick: () => navigate("/budget"),
    };
  }, [remaining, billsDueCount, navigate]);

  return <TodaySummaryRowView {...rowData} />;
};
