import React, { useState } from "react";
import { FaPlus } from "react-icons/fa"; // Import plus icon
import "./stock-management.css";

function StockManagement() {
  const [products, setProducts] = useState([
    { id: 1, name: "Coca Cola", quantity: 100 },
    { id: 2, name: "Bread", quantity: 50 },
  ]);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("add"); // add or deduct
  const [transactions, setTransactions] = useState([]);

  const handleUpdateStock = () => {
    if (!selectedProduct || !amount) return;

    const updatedProducts = products.map((p) => {
      if (p.id === parseInt(selectedProduct)) {
        return {
          ...p,
          quantity:
            type === "add"
              ? p.quantity + parseInt(amount)
              : p.quantity - parseInt(amount),
        };
      }
      return p;
    });

    setProducts(updatedProducts);

    // Save transaction
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        product: products.find((p) => p.id === parseInt(selectedProduct)).name,
        type,
        amount: parseInt(amount),
        date: new Date().toLocaleString(),
      },
    ]);

    // Reset form
    setSelectedProduct("");
    setAmount("");
    setType("add");
  };

  return (
    <div className="stock-page">
      <h1>Stock Management</h1>

      {/* Stock Update Form */}
      <div className="stock-form">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">-- Select Product --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter quantity"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="add">➕ Add Stock</option>
          <option value="deduct">➖ Deduct Stock</option>
        </select>

        {/* Updated button with icon */}
        <button onClick={handleUpdateStock} className="add-stock-btn">
          <FaPlus /> {type === "add" ? "" : "Update Stock"}
        </button>
      </div>

      {/* Products Table */}
      <h3>Current Stock</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity in Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Transactions Table */}
      <h3>Stock Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.product}</td>
              <td>{t.type === "add" ? "Added" : "Deducted"}</td>
              <td>{t.amount}</td>
              <td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockManagement;
