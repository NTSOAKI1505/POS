import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Customer from "./components/customer";
import Sales from  "./components/sales";
import Reporting from "./components/reporting";
import Stockmanagement from "./components/stock-management";
import Productmanagement from "./components/product-management";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/sales" element={<Sales />} />
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
