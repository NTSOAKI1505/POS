import { useState, useEffect } from "react";
import "./sales.css";
import { FaPlus } from "react-icons/fa";

function Sales() {
  const [data, setData] = useState(null);
  const [newSale, setNewSale] = useState({
    product: "",
    quantity: 1,
    date: "",
  });
  const [sales, setSales] = useState([]);

  // Load products and sales
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        const savedSales =
          JSON.parse(localStorage.getItem("sales")) || json.sales || [];
        setData(json);
        setSales(savedSales);
      })
      .catch((err) => console.error("Error loading data.json:", err));
  }, []);

  if (!data) return <p>Loading...</p>;

  const handleChange = (e) => {
    setNewSale({ ...newSale, [e.target.name]: e.target.value });
  };

  const handleAddSale = (e) => {
    e.preventDefault();
    if (!newSale.product) {
      alert("Please select a product.");
      return;
    }

    const product = data.products.find((p) => p.name === newSale.product);

    if (newSale.quantity > product.quantity) {
      alert("Not enough stock!");
      return;
    }

    const saleEntry = {
      ...newSale,
      id: sales.length + 1,
      date: newSale.date || new Date().toISOString().split("T")[0],
      quantity: Number(newSale.quantity),
      price: product ? product.price : 0,
    };

    const updatedSales = [...sales, saleEntry];
    setSales(updatedSales);
    localStorage.setItem("sales", JSON.stringify(updatedSales));

    const updatedProducts = data.products.map((p) =>
      p.name === saleEntry.product
        ? { ...p, quantity: p.quantity - saleEntry.quantity }
        : p
    );
    setData({ ...data, products: updatedProducts });

    setNewSale({ product: "", quantity: 1, date: "" });
  };

  return (
    <div className="sales-page">
      <h1>Sales </h1>

      {/* Add Sale Form */}
      <form className="add-sale-form" onSubmit={handleAddSale}>
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

        {newSale.product && (
          <p>
            Price per unit:{" "}
            {data.products.find((p) => p.name === newSale.product)?.price} M
          </p>
        )}

        <input
          type="number"
          name="quantity"
          value={newSale.quantity}
          onChange={handleChange}
          min="1"
          max={
            data.products.find((p) => p.name === newSale.product)?.quantity || 1
          }
        />

        <input
          type="date"
          name="date"
          value={newSale.date}
          onChange={handleChange}
        />

        <button type="submit" className="add-sale-btn">
          <FaPlus /> Add Sale
        </button>
      </form>

      {/* Sales Table */}
      <table>
        <thead>
          <tr>
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
                <td>{s.product}</td>
                <td>{s.quantity}</td>
                <td>{s.price} M</td>
                <td>{s.quantity * s.price} M</td>
                <td>{s.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
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
