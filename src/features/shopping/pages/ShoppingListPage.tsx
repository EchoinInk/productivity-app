import { useState } from "react";
import { Plus } from "lucide-react";

import { Surface } from "@/components/ui/Surface";
import { Button } from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import AddShoppingItem from "@/features/shopping/components/AddShoppingItemModal";
import { Heading, Meta } from "@/components/ui/Text";

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

        {/* Simple Tab Bar */}
        <div className="grid grid-cols-2 gap-2 p-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-11 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/70 text-muted-foreground border border-border hover:bg-card hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Surface className="m-4">
          {items.length === 0 ? (
            <div className="text-center py-8 px-4 space-y-2">
              <Heading className="text-lg font-semibold">
                No {activeTab.toLowerCase()} items
              </Heading>
              <Meta className="text-sm text-gray-500">
                Start by adding your first {activeTab.toLowerCase()} item to build your shopping list
              </Meta>
              <div className="pt-4">
                <Button onClick={() => setOpen(true)} aria-label={`Add ${activeTab.toLowerCase()} item`}>
                  <Plus size={16} /> Add Item
                </Button>
              </div>
            </div>
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
        </Surface>

        <div className="space-y-4">
          <Button fullWidth onClick={() => setOpen(true)} aria-label="Add shopping item">
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
