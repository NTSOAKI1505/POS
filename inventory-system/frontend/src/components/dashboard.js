import { useState, useEffect } from "react";
import "./dashboard.css";

// Import product images
import coke from "./assets/coke.jpg";
import yogurt from "./assets/yogurt.jpg";
import noodles from "./assets/noodles.jpg";
import coffee from "./assets/coffee.jpg";
import energydrink from "./assets/energy-drink.jpg";
import Wings from "./assets/wings.jpg";
import Zimbasnacks from "./assets/zimbasnacks.jpg";
import Chips from "./assets/chips.jpg";

function Dashboard() {
  const [products, setProducts] = useState([]);

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));

    if (savedProducts && savedProducts.length > 0) {
      setProducts(savedProducts.map(p => ({
        ...p,
        image: getImage(p.name)
      })));
    } else {
      // default products if localStorage empty
      const defaultProducts = [
        { id: 1, name: "Coke", price: 26, quantity: 30, image: coke },
        { id: 2, name: "Yogurt", price: 10, quantity: 25, image: yogurt },
        { id: 3, name: "Chinese Food", price: 50, quantity: 20, image: noodles },
        { id: 4, name: "Coffee", price: 12, quantity: 40, image: coffee },
        { id: 5, name: "Energy Drinks", price: 25, quantity: 35, image: energydrink },
        { id: 6, name: "Wings", price: 45, quantity: 18, image: Wings },
        { id: 7, name: "Zimbasnacks", price: 22, quantity: 24, image: Zimbasnacks },
        { id: 8, name: "Chips", price: 25, quantity: 10, image: Chips },
      ];
      setProducts(defaultProducts);
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
  }, []);

  // Re-load products whenever localStorage changes (sales made)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedProducts = JSON.parse(localStorage.getItem("products"));
      if (savedProducts) {
        setProducts(savedProducts.map(p => ({
          ...p,
          image: getImage(p.name)
        })));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Utility to map product name to image
  const getImage = (name) => {
    switch (name) {
      case "Coke": return coke;
      case "Yogurt": return yogurt;
      case "Chinese Food": return noodles;
      case "Coffee": return coffee;
      case "Energy Drinks": return energydrink;
      case "Wings": return Wings;
      case "Zimbasnacks": return Zimbasnacks;
      case "Chips": return Chips;
      default: return coke;
    }
  };

  // Metrics
  const totalProducts = products.length;
  const totalProductsSold = products.reduce((sum, p) => p.initialQty ? p.initialQty - p.quantity : 0, 0);
  const totalSalesAmount = products.reduce((sum, p) => p.initialQty ? sum + (p.initialQty - p.quantity) * p.price : 0, 0);

  return (
    <div className="dashboard-page">
      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Products</h2>
          <p>{totalProducts}</p>
        </div>
        <div className="card">
          <h2>Total Sales Amount</h2>
          <p>M {totalSalesAmount}</p>
        </div>
        <div className="card">
          <h2>Total Products Sold</h2>
          <p>{totalProductsSold}</p>
        </div>
      </div>

      {/* Product List */}
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: M {product.price}</p>
            <p>Stock: {product.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
