import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const fetchCustomers = async () => {
    const res = await api.get("/customers/");
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(
          `/customers/${editingId}`,
          form
        );

        alert(
          "Customer Updated Successfully"
        );
      } else {
        await api.post(
          "/customers/",
          form
        );

        alert(
          "Customer Added Successfully"
        );
      }

      setForm({
        full_name: "",
        email: "",
        phone: "",
      });

      setEditingId(null);

      fetchCustomers();
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Error"
      );
    }
  };

  const editCustomer = (customer) => {
    setEditingId(customer.id);

    setForm({
      full_name: customer.full_name,
      email: customer.email,
      phone: customer.phone,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteCustomer = async (id) => {
    if (
      !window.confirm("Delete Customer?")
    )
      return;

    await api.delete(
      `/customers/${id}`
    );

    fetchCustomers();
  };

  return (
    <>
      <h1 className="page-title">
        Customers
      </h1>

      <div className="table-container">
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          {editingId
            ? "Edit Customer"
            : "Add Customer"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <div className="form-button">
            <button type="submit">
              {editingId
                ? "Update Customer"
                : "Add Customer"}
            </button>
          </div>
        </form>
      </div>

      <br />

      <div className="table-container">
        <input
          type="text"
          placeholder="🔍 Search Customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border:
              "1px solid #d1d5db",
          }}
        />

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {customers
              .filter((c) =>
                c.full_name
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
              )
              .map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>

                  <td>
                    {customer.full_name}
                  </td>

                  <td>
                    {customer.email}
                  </td>

                  <td>
                    {customer.phone}
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        editCustomer(
                          customer
                        )
                      }
                    >
                      Edit
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() =>
                        deleteCustomer(
                          customer.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Customers;