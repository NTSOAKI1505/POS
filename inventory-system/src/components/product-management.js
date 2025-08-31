import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./product-management.css";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const categories = ["Beverage", "Bakery", "Snacks", "Dairy", "Produce"];

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        if (json.products) setProducts(json.products);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category) return;

    const updatedProduct = {
      ...newProduct,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
    };

    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = updatedProduct;
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      setProducts([...products, updatedProduct]);
    }

    setNewProduct({ name: "", description: "", category: "", price: "", quantity: "" });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewProduct(products[index]);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="product-management">
      <h1>Product Management</h1>

      {/* Add/Edit Product Form */}
      <form className="add-product-form" onSubmit={handleAddOrUpdateProduct}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Initial Quantity"
          value={newProduct.quantity}
          onChange={handleChange}
        />
        <button type="submit" className="add-btn">
          {editingIndex !== null ? "Update" : <FaPlus />}
        </button>
      </form>

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price (M)</th>
            <th>Initial Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.quantity}</td>
                <td className="action-buttons">
                  <button onClick={() => handleEdit(i)} className="edit-btn">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(i)} className="delete-btn">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
