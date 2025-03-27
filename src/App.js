import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import './App.css';
function App() {
  const [expenses, setExpenses] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [filterMonth, setFilterMonth] = useState('');
  const [defaultDate, setDefaultDate] = useState('');

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7); // Get current month in YYYY-MM format
    setFilterMonth(currentMonth); // Set the filter to current month
    setDefaultDate(currentMonth); // Set defaultDate to current month
  }, []);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleEditExpense = (index, updatedExpense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index] = updatedExpense;
    setExpenses(updatedExpenses);
    setExpenseToEdit(null); // Reset edit mode after saving
  };

  const handleEditClick = (index) => {
    setExpenseToEdit({ ...expenses[index], index });
  };

  const filteredExpenses = filterMonth
    ? expenses.filter((expense) => expense.date === filterMonth)
    : expenses;

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm
        onAddExpense={handleAddExpense}
        expenseToEdit={expenseToEdit}
        onEditExpense={handleEditExpense}
        defaultDate={defaultDate} // Pass current month as the default date
      />
      <div>
        <label>Filter by Month:</label>
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        />
      </div>
      <ExpenseSummary expenses={filteredExpenses} />
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={handleDeleteExpense}
        onEditClick={handleEditClick}
      />
    </div>
  );
}

export default App;