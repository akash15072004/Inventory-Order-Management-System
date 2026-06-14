import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock_quantity: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
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
      const payload = {
        name: form.name,
        sku: form.sku,
        price: Number(form.price),
        stock_quantity: Number(
          form.stock_quantity
        ),
      };

      if (editingId) {
        await api.put(
          `/products/${editingId}`,
          payload
        );

        alert(
          "Product Updated Successfully"
        );
      } else {
        await api.post(
          "/products/",
          payload
        );

        alert(
          "Product Added Successfully"
        );
      }

      setForm({
        name: "",
        sku: "",
        price: "",
        stock_quantity: "",
      });

      setEditingId(null);

      fetchProducts();
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Error"
      );
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock_quantity:
        product.stock_quantity,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete Product?"))
      return;

    try {
      await api.delete(
        `/products/${id}`
      );

      fetchProducts();
    } catch {
      alert(
        "Unable to delete product"
      );
    }
  };

  return (
    <>
      <h1 className="page-title">
        Products
      </h1>

      <div className="table-container">
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          {editingId
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock_quantity"
            placeholder="Stock Quantity"
            value={form.stock_quantity}
            onChange={handleChange}
            required
          />

          <div className="form-button">
            <button type="submit">
              {editingId
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      <br />

      <div className="table-container">
        <input
          type="text"
          placeholder="🔍 Search Product..."
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
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {products
              .filter((p) =>
                p.name
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
              )
              .map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>

                  <td>{p.name}</td>

                  <td>{p.sku}</td>

                  <td>₹{p.price}</td>

                  <td>
                    {p.stock_quantity}
                  </td>

                  <td>
                    {p.stock_quantity <
                    10 ? (
                      <span>
                        🔴 Low Stock
                      </span>
                    ) : (
                      <span>
                        🟢 Available
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        editProduct(p)
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
                        deleteProduct(
                          p.id
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

export default Products;