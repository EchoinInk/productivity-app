import { Text } from "@/components/ui/Text";
import { SummaryCardView, type SummaryCardViewModel } from "../SummaryCard/SummaryCard.view";

export interface TodaySummaryViewModel {
  cards: SummaryCardViewModel[];
}

export const TodaySummaryView = ({ model }: { model: TodaySummaryViewModel }) => {
  const { cards } = model;

  return (
    <div className="flex flex-col gap-6">
      <Text className="text-lg font-semibold text-foreground">Today's Summary</Text>
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <SummaryCardView key={index} model={card} />
        ))}
      </div>
    </div>
  );
};
