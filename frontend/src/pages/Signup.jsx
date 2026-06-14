import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await api.post(
        "/auth/signup",
        form
      );

      alert(
        "Account Created Successfully"
      );

      navigate("/login");
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Signup Failed"
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
          Create Your Account 🚀
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username:
                  e.target.value,
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
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
                password:
                  e.target.value,
              })
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="auth-link">
          <Link to="/login">
            Already have an account?
          </Link>
        </div>

        <p className="auth-footer">
          © 2026 Inventory Management System
        </p>

      </div>
    </div>
  );
}

export default Signup;