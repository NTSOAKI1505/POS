import { useState, useEffect } from "react";
import "./sales.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import { getProducts, getSales, addSale, deleteSale, deductStock } from "./Api";

function Sales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({
    product: "",
    quantity: 1,
    date: "",
  });

  // Load products and sales on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productsRes = await getProducts();
      const salesRes = await getSales();
      setProducts(productsRes.data);
      setSales(salesRes.data);
    } catch (err) {
      console.error("Error loading data:", err);
      // fallback to localStorage
      const savedProducts = JSON.parse(localStorage.getItem("products"));
      const savedSales = JSON.parse(localStorage.getItem("sales"));

      const defaultProducts = [
        { id: 1, name: "Coke", price: 26, cost: 20, quantity: 30 },
        { id: 2, name: "Yogurt", price: 10, cost: 6, quantity: 25 },
        { id: 3, name: "Chinese Food", price: 50, cost: 30, quantity: 20 },
        { id: 4, name: "Coffee", price: 12, cost: 7, quantity: 40 },
        { id: 5, name: "Energy Drinks", price: 25, cost: 15, quantity: 35 },
        { id: 6, name: "Wings", price: 45, cost: 25, quantity: 18 },
        { id: 7, name: "Zimbasnacks", price: 22, cost: 12, quantity: 24 },
        { id: 8, name: "Chips", price: 25, cost: 14, quantity: 10 },
      ];

      setProducts(savedProducts?.length > 0 ? savedProducts : defaultProducts);
      setSales(savedSales || []);
    }
  };

  // Save products & sales whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  // Handle input change
  const handleChange = (e) => {
    setNewSale({ ...newSale, [e.target.name]: e.target.value });
  };

  // Add a new sale
  const handleAddSale = async (e) => {
    e.preventDefault();

    if (!newSale.product) {
      alert("Please select a product.");
      return;
    }

    const product = products.find((p) => p.name === newSale.product);
    if (!product) return;

    if (newSale.quantity > product.quantity) {
      alert("Not enough stock!");
      return;
    }

    const saleEntry = {
      id: sales.length + 1,
      product: product.name,
      quantity: Number(newSale.quantity),
      price: product.price,
      cost: product.cost,
      profit: (product.price - product.cost) * Number(newSale.quantity),
      date: newSale.date || new Date().toISOString().split("T")[0],
    };

    // Update sales & stock
    const updatedSales = [...sales, saleEntry];
    const updatedProducts = products.map((p) =>
      p.name === saleEntry.product
        ? { ...p, quantity: p.quantity - saleEntry.quantity }
        : p
    );

    setSales(updatedSales);
    setProducts(updatedProducts);

    // Update localStorage so Dashboard sees stock changes
    localStorage.setItem("sales", JSON.stringify(updatedSales));
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Reset form
    setNewSale({ product: "", quantity: 1, date: "" });

    // Update API
    try {
      await addSale(saleEntry);
      await deductStock(product.id, Number(newSale.quantity));
    } catch (err) {
      console.error("API save failed:", err);
    }
  };

  // Delete a sale
  const handleDeleteSale = async (id) => {
    if (window.confirm("Delete this sale?")) {
      const saleToDelete = sales.find((s) => s.id === id);
      if (!saleToDelete) return;

      // Restore product quantity
      const updatedProducts = products.map((p) =>
        p.name === saleToDelete.product
          ? { ...p, quantity: p.quantity + saleToDelete.quantity }
          : p
      );

      const updatedSales = sales.filter((s) => s.id !== id);

      setSales(updatedSales);
      setProducts(updatedProducts);

      localStorage.setItem("sales", JSON.stringify(updatedSales));
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      try {
        await deleteSale(id);
      } catch (err) {
        console.error("API delete failed:", err);
      }
    }
  };

  // Clear all sales
  const handleClearSales = () => {
    if (window.confirm("Are you sure you want to clear all sales?")) {
      setSales([]);
      localStorage.removeItem("sales");
    }
  };

  return (
    <div className="sales-page">
      <h1>Sales</h1>

      {/* Add Sale Form */}
      <form className="add-sale-form" onSubmit={handleAddSale}>
        <select
          name="product"
          value={newSale.product}
          onChange={handleChange}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name} (Stock: {p.quantity})
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          value={newSale.quantity}
          onChange={handleChange}
          min="1"
          max={products.find((p) => p.name === newSale.product)?.quantity || 1}
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
      <h2>Sales Records</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price/unit</th>
            <th>Total</th>
            <th>Profit</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((s) => (
              <tr key={s.id}>
                <td>{s.product}</td>
                <td>{s.quantity}</td>
                <td>M {s.price}</td>
                <td>M {s.price * s.quantity}</td>
                <td style={{ color: "green" }}>M {s.profit}</td>
                <td>{s.date}</td>
                <td>
                  <button onClick={() => handleDeleteSale(s.id)}>
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No sales recorded
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Clear Sales Button */}
      {sales.length > 0 && (
        <button onClick={handleClearSales} className="clear-sales-btn">
          <FaTrash /> Clear All Sales
        </button>
      )}
    </div>
  );
}

export default Sales;
