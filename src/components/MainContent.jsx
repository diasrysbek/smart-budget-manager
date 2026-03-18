import { useState } from "react";

export default function MainContent() {
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Salary", amount: 1000, type: "income" },
    { id: 2, title: "Groceries", amount: 150, type: "expense" },
    { id: 3, title: "Freelance", amount: 400, type: "income" },
    { id: 4, title: "Netflix", amount: 20, type: "expense" },
  ]);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

 
  const handleAdd = () => {
    const value = parseFloat(amount);

    if (!title || isNaN(value) || value <= 0) {
      alert("Fill all fields correctly!");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title,
      amount: value,
      type,
    };

    setTransactions([...transactions, newTransaction]);

    setTitle("");
    setAmount("");
  };

  
  const handleDelete = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  
  const filteredTransactions = transactions.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

 
  const balance = transactions.reduce((total, item) => {
    return item.type === "income"
      ? total + item.amount
      : total - item.amount;
  }, 0);

  return (
    <main className="main">
      <section className="hero">
        <h2>Take Control of Your Money</h2>
        <p>
          Track your income and expenses in one place.
          Simple. Clean. Effective.
        </p>
      </section>

      <section className="balance-card">
        <h3>Current Balance</h3>
        <p className="balance-amount">${balance.toFixed(2)}</p>

        {/* FORM */}
        <div className="form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button onClick={handleAdd}>Add</button>
        </div>

        {/* FILTER */}
        <div className="filter">
          <button
            className={`all ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`income ${filter === "income" ? "active" : ""}`}
            onClick={() => setFilter("income")}
          >
            Income
          </button>

          <button
            className={`expense ${filter === "expense" ? "active" : ""}`}
            onClick={() => setFilter("expense")}
          >
            Expense
          </button>
        </div>

        {/* LIST */}
        <div className="transaction-list">
          {filteredTransactions.length === 0 ? (
            <p>No transactions found</p>
          ) : (
            filteredTransactions.map((item) => (
              <div
                key={item.id}
                className={`transaction-item ${item.type}`}
              >
                <span>
                  {item.title} - ${item.amount} ({item.type})
                </span>
                <button onClick={() => handleDelete(item.id)}>❌</button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}