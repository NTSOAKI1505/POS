import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  return (
    <DataContext.Provider value={{ products, setProducts, sales, setSales }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
