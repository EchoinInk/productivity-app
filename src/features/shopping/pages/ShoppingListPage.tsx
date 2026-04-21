import { useState } from "react";
import { Plus } from "lucide-react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import TabBar from "@/components/TabBar";
import PageHeader from "@/components/PageHeader";
import AddShoppingItem from "@/components/modal/AddShoppingItem";
import PageShell from "@/app/layout/PageShell";
import { useAppStore } from "@/store/useAppStore";

const tabs = ["Groceries", "Household"];

const ShoppingListPage = () => {
  const items = useAppStore((s) => s.shoppingItems);
  const addShoppingItem = useAppStore((s) => s.addShoppingItem);
  const toggleShoppingItem = useAppStore((s) => s.toggleShoppingItem);
  const [activeTab, setActiveTab] = useState("Groceries");
  const [open, setOpen] = useState(false);

  return (
    <PageShell>
      <PageHeader title="Shopping List" />
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <AppCard>
        {items.length === 0 ? <p className="text-sm text-muted-foreground py-4 text-center">No items yet</p> : items.map((item) => <ListItem key={item.id} label={item.name} checked={item.done} onToggle={() => toggleShoppingItem(item.id)} />)}
      </AppCard>
      <ActionButton fullWidth onClick={() => setOpen(true)}><Plus size={16} /> Add Item</ActionButton>
      <AddShoppingItem open={open} onClose={() => setOpen(false)} onSave={(item) => addShoppingItem(item)} />
    </PageShell>
  );
};

export default ShoppingListPage;
