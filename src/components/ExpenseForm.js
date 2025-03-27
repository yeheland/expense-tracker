import { useState, useEffect } from 'react';


function ExpenseForm({ onAddExpense, expenseToEdit, onEditExpense, defaultDate }) {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('cash');
  const [date, setDate] = useState(defaultDate || '');

  useEffect(() => {
    if (expenseToEdit) {
      setType(expenseToEdit.type);
      setAmount(expenseToEdit.amount);
      setMethod(expenseToEdit.method);
      setDate(expenseToEdit.date); // Expense date when editing
    } else {
      setDate(defaultDate); // Set the default date if it's a new expense
    }
  }, [expenseToEdit, defaultDate]); // Re-run whenever expenseToEdit or defaultDate changes

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !amount || !date) return;

    const expense = { type, amount: parseFloat(amount), method, date };

    if (expenseToEdit) {
      onEditExpense(expenseToEdit.index, expense);
    } else {
      onAddExpense(expense);
    }

    setType('');
    setAmount('');
    setMethod('cash');
    setDate(defaultDate || ''); // Reset to current month if it's a new expense
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Expense Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="cash">Cash</option>
          <option value="credit">Credit Card</option>
        </select>
      </div>
      <div>
        <input
          type="month"
          value={date} // This should be in "YYYY-MM" format
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit">{expenseToEdit ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
}

export default ExpenseForm;