import { useState } from "react";
import { Plus } from "lucide-react";

import { Card } from "@/components/ui/Card";
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
      <div className="space-y-4">
        <PageHeader title="Shopping List" />

        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <Card>
          {items.length === 0 ? (
            <EmptyState
              title={`No ${activeTab.toLowerCase()} items`}
              description={`Add your first ${activeTab.toLowerCase()} item`}
              className="py-6"
            />
          ) : (
            <div className="space-y-1">
              {items.map((item) => (
                <ShoppingRow
                  key={item.id}
                  item={item}
                  onToggle={toggleItem}
                />
              ))}
            </div>
          )}
        </Card>

        <ActionButton fullWidth onClick={() => setOpen(true)}>
          <Plus size={16} /> Add Item
        </ActionButton>
      </div>

      {/* MODAL OUTSIDE */}
      <AddShoppingItem
        open={open}
        onClose={() => setOpen(false)}
        onSave={addShoppingItem}
        category={activeTab}
      />
    </PageShell>
  );
};

export default ShoppingListPage;