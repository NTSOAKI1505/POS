import "./reporting.css";
// Use default import since useData.js uses export default
import useData from "./useData";

function Reports() {
  const { products, sales } = useData();

  // Calculate capital used (total cost of all products in stock)
  const totalCapital = products.reduce(
    (sum, product) => sum + product.cost * product.quantity,
    0
  );

  // Calculate sales summary per product
  const productSummary = products.map((product) => {
    const soldItems = sales.filter((s) => s.product === product.name);
    const totalSold = soldItems.reduce((sum, s) => sum + s.quantity, 0);
    const totalRevenue = soldItems.reduce((sum, s) => sum + s.price * s.quantity, 0);
    const totalProfit = soldItems.reduce((sum, s) => sum + s.profit, 0);

    return {
      name: product.name,
      price: product.price,
      cost: product.cost,
      quantity: product.quantity,
      sold: totalSold,
      revenue: totalRevenue,
      profit: totalProfit,
    };
  });

  return (
    <div className="reports-page">
      <h1>Reports</h1>

      <h2>Product Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price/unit</th>
            <th>Cost/unit</th>
            <th>Sold Qty</th>
            <th>Profit</th>
            <th>Remaining Stock</th>
          </tr>
        </thead>
        <tbody>
          {productSummary.map((p) => (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>M {p.price}</td>
              <td>M {p.cost}</td>
              <td>{p.sold}</td>
              <td style={{ color: "green" }}>M {p.profit}</td>
              <td>{p.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total Capital Used</h2>
      <p>M {totalCapital}</p>
    </div>
  );
}

export default Reports;
