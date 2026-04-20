const AddBill = ({ open, onClose, onSave }: any) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  if (!open) return null;

  return (
    <div className="modal">
      <AppCard className="space-y-4">
        <h2>Add Bill</h2>

        <input placeholder="Bill name" onChange={(e) => setName(e.target.value)} className="input" />

        <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} className="input" />

        <input type="date" onChange={(e) => setDate(e.target.value)} className="input" />

        <button onClick={() => onSave({ name, amount, date })}>Save</button>
      </AppCard>
    </div>
  );
};
