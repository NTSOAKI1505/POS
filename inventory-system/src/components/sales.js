import { useState, useEffect } from "react";
import "./sales.css";
import { FaPlus } from "react-icons/fa";

function Sales() {
  const [data, setData] = useState(null);
  const [newSale, setNewSale] = useState({
    customer: "",
    product: "",
    quantity: 1,
    date: "",
  });
  const [sales, setSales] = useState([]);

  // Load products, customers, and previous sales from JSON
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setSales(json.sales || []);
      })
      .catch((err) => console.error("Error loading data.json:", err));
  }, []);

  if (!data) return <p>Loading...</p>;

  const handleChange = (e) => {
    setNewSale({ ...newSale, [e.target.name]: e.target.value });
  };

  const handleAddSale = (e) => {
    e.preventDefault();
    if (!newSale.customer || !newSale.product) return;

    const product = data.products.find((p) => p.name === newSale.product);
    const saleEntry = {
      ...newSale,
      quantity: Number(newSale.quantity),
      price: product ? product.price : 0,
    };

    // Add sale to state
    setSales([...sales, saleEntry]);

    // Update product stock
    const updatedProducts = data.products.map((p) =>
      p.name === saleEntry.product
        ? { ...p, quantity: p.quantity - saleEntry.quantity }
        : p
    );
    setData({ ...data, products: updatedProducts });

    // Reset form
    setNewSale({ customer: "", product: "", quantity: 1, date: "" });
  };

  return (
    <div className="sales-page">
      <h1>Sales Management</h1>

      {/* Add Sale Form */}
      <form className="add-sale-form" onSubmit={handleAddSale}>
        {/* Customer dropdown */}
        <select
          name="customer"
          value={newSale.customer}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>
          {data.customers.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Product dropdown */}
        <select
          name="product"
          value={newSale.product}
          onChange={handleChange}
          required
        >
          <option value="">Select Product</option>
          {data.products.map((p, i) => (
            <option key={i} value={p.name}>
              {p.name} (Stock: {p.quantity})
            </option>
          ))}
        </select>

        {/* Show product price */}
        {newSale.product && (
          <p>
            Price per unit:{" "}
            {data.products.find((p) => p.name === newSale.product)?.price} M
          </p>
        )}

        {/* Quantity input */}
        <input
          type="number"
          name="quantity"
          value={newSale.quantity}
          onChange={handleChange}
          min="1"
          max={
            data.products.find((p) => p.name === newSale.product)?.quantity ||
            1
          }
        />

        {/* Sale date */}
        <input
          type="date"
          name="date"
          value={newSale.date}
          onChange={handleChange}
        />

        <button type="submit" className="add-sale-btn">
  <FaPlus />
</button>

      </form>

      {/* Sales Table */}
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price/unit</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((s, i) => (
              <tr key={i}>
                <td>{s.customer}</td>
                <td>{s.product}</td>
                <td>{s.quantity}</td>
                <td>{s.price} M</td>
                <td>{s.quantity * s.price} M</td>
                <td>{s.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No sales recorded
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;
