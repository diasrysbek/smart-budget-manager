import { useState } from "react";

export default function MainContent() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleAdd = () => {
    const value = parseFloat(amount);

    if (isNaN(value) || value <= 0) return;

    if (type === "income") {
      setBalance(balance + value);
    } else {
      setBalance(balance - value);
    }

    setAmount("");
  };

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

        <div className="form">
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
      </section>
    </main>
  );
}