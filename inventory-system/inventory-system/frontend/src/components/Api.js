import axios from "axios";

const API_URL = "http://localhost:5000"; // ✅ your json-server URL

// ------------------ PRODUCTS ------------------ //
export const getProducts = () => axios.get(`${API_URL}/products`);
export const addProduct = (product) => axios.post(`${API_URL}/products`, product);
export const updateProduct = (id, updatedProduct) =>
  axios.put(`${API_URL}/products/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);

// Deduct stock when sale happens
export const deductStock = async (id, qty) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  const product = res.data;
  if (!product) throw new Error("Product not found");

  const updatedProduct = {
    ...product,
    quantity: product.quantity - qty,
  };

  return axios.put(`${API_URL}/products/${id}`, updatedProduct);
};

// ------------------ SALES ------------------ //
export const getSales = () => axios.get(`${API_URL}/sales`);
export const addSale = (sale) => axios.post(`${API_URL}/sales`, sale);
export const deleteSale = (id) => axios.delete(`${API_URL}/sales/${id}`);

// ------------------ STOCK MANAGEMENT ------------------ //
export const restockProduct = async (id, qty) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  const product = res.data;
  if (!product) throw new Error("Product not found");

  const updatedProduct = {
    ...product,
    quantity: product.quantity + qty,
  };

  return axios.put(`${API_URL}/products/${id}`, updatedProduct);
};
