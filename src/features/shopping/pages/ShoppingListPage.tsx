import { useState } from "react";
import { Plus } from "lucide-react";

import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import TabBar from "@/components/ui/TabBar";
import Header from "@/components/layout/Header";
import AddShoppingItem from "@/features/shopping/components/AddShoppingItemModal";
import { EmptyState } from "@/components/ui/EmptyState";

import { ShoppingRow } from "@/features/shopping/components/ShoppingRow";
import type { ShoppingCategory } from "@/features/shopping/types/types";
import { useShoppingList, useShopping } from "@/features/shopping/hooks/useShoppingList";

const tabs: ShoppingCategory[] = ["Groceries", "Household"];

const ShoppingListPage = () => {
  const { actions } = useShopping();
  const { addShoppingItem } = actions;

  const [activeTab, setActiveTab] =
    useState<ShoppingCategory>("Groceries");
  const [open, setOpen] = useState(false);

  const { items, toggleItem } = useShoppingList(activeTab);

    return (
    <>
      <div className="space-y-4">
        <Header title="Shopping List" />

        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <Card>
          <CardBody>
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
          </CardBody>
        </Card>

        <div className="space-y-4">
          <Button fullWidth onClick={() => setOpen(true)}>
            <Plus size={16} /> Add Item
          </Button>
        </div>
      </div>

      {/* MODAL OUTSIDE */}
      <AddShoppingItem
        open={open}
        onClose={() => setOpen(false)}
        onSave={addShoppingItem}
        category={activeTab}
      />
    </>
  );
};

export default ShoppingListPage;
