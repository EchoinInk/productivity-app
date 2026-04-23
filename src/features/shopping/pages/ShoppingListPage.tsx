import { useState, useMemo } from "react";
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

const tabs: ShoppingCategory[] = ["Groceries", "Household"];

const ShoppingListPage = () => {
  const items = useShoppingStore((s) => s.shoppingItems);
  const addShoppingItem = useShoppingStore((s) => s.addShoppingItem);
  const toggleShoppingItem = useShoppingStore((s) => s.toggleShoppingItem);

  const [activeTab, setActiveTab] = useState<ShoppingCategory>("Groceries");
  const [open, setOpen] = useState(false);

  const filteredItems = useMemo(
    () => items.filter((item) => item.category === activeTab),
    [items, activeTab]
  );

  return (
    <PageShell>
      <PageHeader title="Shopping List" />

      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <AppCard>
        {filteredItems.length === 0 ? (
          <EmptyState
            title={`No ${activeTab.toLowerCase()} items`}
            description={`Add your first ${activeTab.toLowerCase()} item`}
          />
        ) : (
          filteredItems.map((item) => (
            <ShoppingRow
              key={item.id}
              id={item.id}
              name={item.name}
              done={item.done}
              onToggle={toggleShoppingItem}
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