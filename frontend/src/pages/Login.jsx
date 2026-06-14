import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      window.location.href = "/";
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-logo">
          📦
        </div>

        <h1 className="auth-title">
          IMS
        </h1>

        <p className="auth-subtitle">
          Inventory Management System
        </p>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "25px",
          }}
        >
          Welcome Back 👋
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username or Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>

        <div className="auth-link">
          <Link to="/signup">
            Create New Account
          </Link>
        </div>

        <p className="auth-footer">
          © 2026 Inventory Management System
        </p>

      </div>
    </div>
  );
}

export default Login;