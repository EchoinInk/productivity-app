import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import TabBar from "@/components/TabBar";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";

interface ShopItem {
  id: number;
  label: string;
  done: boolean;
  category: string;
}

const initialItems: ShopItem[] = [
  { id: 1, label: "Milk", done: false, category: "Groceries" },
  { id: 2, label: "Eggs", done: true, category: "Groceries" },
  { id: 3, label: "Bread", done: false, category: "Groceries" },
  { id: 4, label: "Chicken breast", done: false, category: "Groceries" },
  { id: 5, label: "Dish soap", done: false, category: "Household" },
  { id: 6, label: "Paper towels", done: true, category: "Household" },
];

const tabs = ["Groceries", "Household"];

const ShoppingList = () => {
  const [activeTab, setActiveTab] = useState("Groceries");
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));

  const filtered = items.filter((i) => i.category === activeTab);

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <PageHeader title="Shopping List" />
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <AppCard>
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground py-4 text-center">No items yet</p>
        )}
        {filtered.map((item) => (
          <ListItem
            key={item.id}
            label={item.label}
            checked={item.done}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </AppCard>

      <ActionButton fullWidth>
        <Plus size={16} /> Add Item
      </ActionButton>
    </div>
  );
};

export default ShoppingList;
