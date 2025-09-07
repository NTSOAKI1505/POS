// src/components/reporting.js
import { useState, useEffect } from "react";
import "./reporting.css";

function Reporting() {
  const [data, setData] = useState({
    products: [],
    sales: [],
  });

  const [totals, setTotals] = useState({
    totalSalesAmount: 0,
    totalProductsSold: 0,
  });

  // Fetch JSON from public folder
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);

        // Calculate totals
        const totalSalesAmount = json.sales.reduce(
          (sum, sale) => sum + sale.price * sale.quantity,
          0
        );
        const totalProductsSold = json.sales.reduce(
          (sum, sale) => sum + sale.quantity,
          0
        );

        setTotals({ totalSalesAmount, totalProductsSold });
      })
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  return (
    <div className="reporting-page">
      <h1>Sales & Inventory Report</h1>

      {/* Summary */}
      <div className="report-summary">
        <p><strong>Total Products Sold:</strong> {totals.totalProductsSold}</p>
        <p><strong>Total Sales Amount:</strong> M {totals.totalSalesAmount}</p>
      </div>

      {/* Sales Table */}
      <h2>Sales Records</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price/unit</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.sales.length > 0 ? (
            data.sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.product}</td>
                <td>{sale.quantity}</td>
                <td>M {sale.price}</td>
                <td>M {sale.price * sale.quantity}</td>
                <td>{sale.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No sales data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Products Table */}
      <h2>Products Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price/unit</th>
            <th>Stock Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.products.length > 0 ? (
            data.products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.category}</td>
                <td>M {p.price}</td>
                <td>{p.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No products data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Reporting;
