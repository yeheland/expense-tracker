function ExpenseSummary({ expenses }) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalCash = expenses
    .filter((expense) => expense.method === 'cash')
    .reduce((sum, expense) => sum + expense.amount, 0);
  const totalCredit = expenses
    .filter((expense) => expense.method === 'credit')
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div>
      <h3>Total: ${total.toFixed(2)}</h3>
      <p>Total Cash: ${totalCash.toFixed(2)}</p>
      <p>Total Credit Card: ${totalCredit.toFixed(2)}</p>
    </div>
  );
}

export default ExpenseSummary;
