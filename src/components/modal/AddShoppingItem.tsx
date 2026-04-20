const AddShoppingItem = ({ open, onClose, onSave }: any) => {
  const [name, setName] = useState("");

  if (!open) return null;

  return (
    <div className="modal">
      <AppCard className="space-y-4">
        <h2>Add Item</h2>

        <input
          placeholder="Item name"
          onChange={(e) => setName(e.target.value)}
          className="input"
        />

        <button onClick={() => onSave({ name })}>Add</button>
      </AppCard>
    </div>
  );
};
