// useData.js
import { useState } from "react";

// This hook returns products and sales data
export default function useData() {
  // Example products array
  const [products] = useState([
    { name: "Chips", price: 15, cost: 10, quantity: 50 },
    { name: "Coke", price: 20, cost: 12, quantity: 30 },
    { name: "Wings", price: 50, cost: 30, quantity: 20 },
    // add more products as needed
  ]);

  // Example sales array
  const [sales] = useState([
    { product: "Chips", quantity: 10, price: 15, profit: 50 },
    { product: "Coke", quantity: 5, price: 20, profit: 40 },
    { product: "Wings", quantity: 3, price: 50, profit: 60 },
    // add more sales records as needed
  ]);

  return { products, sales };
}
