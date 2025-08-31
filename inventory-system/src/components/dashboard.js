import { useState, useEffect } from "react";
import "./dashboard.css";

function Dashboard() {
  const [data, setData] = useState({
    products: [],
    customers: [],
    sales: [],
  });

  const [metrics, setMetrics] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalSalesAmount: 0,
    totalProductsSold: 0,
  });

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);

        const totalCustomers = json.customers.length;
        const totalProducts = json.products.length;
        const totalSalesAmount = json.sales.reduce(
          (sum, sale) => sum + sale.price * sale.quantity,
          0
        );
        const totalProductsSold = json.sales.reduce(
          (sum, sale) => sum + sale.quantity,
          0
        );

        setMetrics({
          totalCustomers,
          totalProducts,
          totalSalesAmount,
          totalProductsSold,
        });
      })
      .catch((err) => console.error("Failed to load data:", err));
  }, []);

  return (
    <div className="dashboard-page">

      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Customers</h2>
          <p>{metrics.totalCustomers}</p>
        </div>
        <div className="card">
          <h2>Total Products</h2>
          <p>{metrics.totalProducts}</p>
        </div>
        <div className="card">
          <h2>Total Sales Amount</h2>
          <p>M {metrics.totalSalesAmount}</p>
        </div>
        <div className="card">
          <h2>Total Products Sold</h2>
          <p>{metrics.totalProductsSold}</p>
        </div>
      </div>

      <h2>Recent Sales</h2>
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
          {data.sales.slice(-5).map((sale) => (
            <tr key={sale.id}>
              <td>{sale.customer}</td>
              <td>{sale.product}</td>
              <td>{sale.quantity}</td>
              <td>M {sale.price}</td>
              <td>M {sale.price * sale.quantity}</td>
              <td>{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
