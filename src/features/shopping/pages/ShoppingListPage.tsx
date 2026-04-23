import { useState } from "react";
import { Plus } from "lucide-react";

import AppCard from "@/components/AppCard";
import ActionButton from "@/components/ActionButton";
import TabBar from "@/components/TabBar";
import PageHeader from "@/components/PageHeader";
import AddShoppingItem from "@/components/modal/AddShoppingItem";
import PageShell from "@/app/layout/PageShell";
import EmptyState from "@/components/ui/EmptyState";

import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { ShoppingRow } from "@/features/shopping/components/ShoppingRow";
import type { ShoppingCategory } from "@/features/shopping/types";
import { useShoppingList } from "@/features/shopping/hooks/useShoppingList";

const tabs: ShoppingCategory[] = ["Groceries", "Household"];

const ShoppingListPage = () => {
  const addShoppingItem = useShoppingStore((s) => s.addShoppingItem);

  const [activeTab, setActiveTab] =
    useState<ShoppingCategory>("Groceries");
  const [open, setOpen] = useState(false);

  const { items, toggleItem } = useShoppingList(activeTab);

  return (
    <PageShell>
      <PageHeader title="Shopping List" />

      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <AppCard>
        {items.length === 0 ? (
          <EmptyState
            title={`No ${activeTab.toLowerCase()} items`}
            description={`Add your first ${activeTab.toLowerCase()} item`}
          />
        ) : (
          items.map((item) => (
            <ShoppingRow
              key={item.id}
              id={item.id}
              name={item.name}
              done={item.done}
              onToggle={toggleItem}
            />
          ))
        )}
      </AppCard>

      <ActionButton fullWidth onClick={() => setOpen(true)}>
        <Plus size={16} /> Add Item
      </ActionButton>

      <AddShoppingItem
        open={open}
        onClose={() => setOpen(false)}
        onSave={(item) => addShoppingItem(item)}
        category={activeTab}
      />
    </PageShell>
  );
};

export default ShoppingListPage;