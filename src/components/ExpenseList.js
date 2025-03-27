function ExpenseList({ expenses, onDelete, onEditClick }) {
  return (
    <ul>
      {expenses.map((expense, index) => (
        <li key={index}>
          {expense.type} - ${expense.amount} ({expense.method})
          <button onClick={() => onDelete(index)}>Delete</button>
          <button onClick={() => onEditClick(index)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
