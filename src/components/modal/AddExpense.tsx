const AddExpense = ({ open, onClose, onSave }: any) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  if (!open) return null;

  return (
    <div className="modal">
      <AppCard className="space-y-4">
        <h2>Add Expense</h2>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} className="input" />

        <input
          type="number"
          placeholder="$ Amount"
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />

        <button onClick={() => onSave({ name, amount })}>Save</button>
      </AppCard>
    </div>
  );
};
