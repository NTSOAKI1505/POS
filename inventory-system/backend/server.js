const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Helper: Read data.json
const readData = () => JSON.parse(fs.readFileSync("./data.json"));

// Helper: Write data.json
const writeData = (data) =>
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));

// GET all data
app.get("/api/data", (req, res) => {
  const data = readData();
  res.json(data);
});

// POST new sale
app.post("/api/sales", (req, res) => {
  const data = readData();
  const sale = req.body;

  // Update product stock
  data.products = data.products.map((p) =>
    p.name === sale.product
      ? { ...p, quantity: p.quantity - sale.quantity }
      : p
  );

  // Add sale
  data.sales.push(sale);

  writeData(data);
  res.json({ success: true, data });
});

// POST new product
app.post("/api/products", (req, res) => {
  const data = readData();
  const product = req.body;
  data.products.push(product);
  writeData(data);
  res.json({ success: true, data });
});

// POST new customer
app.post("/api/customers", (req, res) => {
  const data = readData();
  const customer = req.body;
  data.customers.push(customer);
  writeData(data);
  res.json({ success: true, data });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
