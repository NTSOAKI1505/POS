import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa"; // Import icons
import "./customer.css";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contact: "",
    email: "",
  });

  // Load customers from localStorage or JSON
  useEffect(() => {
    const savedCustomers = JSON.parse(localStorage.getItem("customers"));
    if (savedCustomers && savedCustomers.length > 0) {
      setCustomers(savedCustomers);
    } else {
      fetch("/data.json")
        .then((res) => res.json())
        .then((data) => setCustomers(data.customers))
        .catch((err) => console.error("Failed to load customers:", err));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustomer.name) return;

    const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    setCustomers([
      ...customers,
      { ...newCustomer, id, dateJoined: new Date().toISOString().split("T")[0] },
    ]);
    setNewCustomer({ name: "", contact: "", email: "" });
  };

  const handleDelete = (index) => {
    setCustomers(customers.filter((_, i) => i !== index));
  };

  return (
    <div className="customer-page">
      <h1>Customer</h1>

      {/* Add Customer Form */}
      <form className="add-customer-form" onSubmit={handleAddCustomer}>
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={newCustomer.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={newCustomer.contact}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={newCustomer.email}
          onChange={handleChange}
        />
        <button type="submit" className="icon-button">
          <FaPlus /> Add
        </button>
      </form>

      {/* Customer List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Joined</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((c, i) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.contact}</td>
                <td>{c.email}</td>
                <td>{c.dateJoined}</td>
                <td>
                  <button
                    onClick={() => handleDelete(i)}
                    className="icon-button delete-button"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Customer;
