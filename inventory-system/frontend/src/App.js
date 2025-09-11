import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Customer from "./components/customer";
import Sales from  "./components/sales";
import Reporting from "./components/reporting";
import Stockmanagement from "./components/stock-management";
import Productmanagement from "./components/product-management";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";

const API_URL = "http://localhost:5000";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products", err);
        // fallback default
        setProducts([
          { id: 1, name: "Coke", price: 26, cost: 20, quantity: 30 },
          { id: 2, name: "Yogurt", price: 10, cost: 6, quantity: 25 },
          { id: 3, name: "Chinese Food", price: 50, cost: 30, quantity: 20 },
          { id: 4, name: "Coffee", price: 12, cost: 7, quantity: 40 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard products={products} loading={loading} />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/sales" element={<Sales products={products} setProducts={setProducts} />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/stock-management" element={<Stockmanagement />} />
              <Route path="/product-management" element={<Productmanagement />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
