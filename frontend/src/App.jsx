import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css";

function ProtectedRoute({
  children,
}) {
  const user =
    localStorage.getItem("user");

  return user ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

function App() {
 const [user, setUser] =
  useState(() => {
    const userData =
      localStorage.getItem("user");

    try {
      return userData
        ? JSON.parse(userData)
        : null;
    } catch {
      localStorage.removeItem(
        "user"
      );
      return null;
    }
  });
  const [theme, setTheme] =
    useState(
      localStorage.getItem(
        "theme"
      ) || "dark"
    );

  const [collapsed, setCollapsed] =
    useState(false);

  useEffect(() => {
    document.body.className =
      theme;

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  const logout = () => {
  localStorage.removeItem(
    "user"
  );

  setUser(null);

  window.location.href =
    "/login";
};

  return (
    <BrowserRouter>
      <div className="app">
        {user && (
          <div
            className={
              collapsed
                ? "sidebar collapsed"
                : "sidebar"
            }
          >
            <button
              className="toggle-btn"
              onClick={() =>
                setCollapsed(
                  !collapsed
                )
              }
            >
              {collapsed
                ? "➡️"
                : "⬅️"}
            </button>

            {!collapsed && (
              <>
                <h2>
                  📦 IMS
                </h2>

                <div className="profile-box">
                  <h3>
                    👤{" "}
                    {user.username}
                  </h3>

                  <p>
                    User ID:{" "}
                    {user.user_id}
                  </p>

                  <p>
                    Role: Admin
                  </p>
                </div>
              </>
            )}

            <Link to="/">
              {collapsed
                ? "📊"
                : "📊 Dashboard"}
            </Link>

            <Link to="/products">
              {collapsed
                ? "📦"
                : "📦 Products"}
            </Link>

            <Link to="/customers">
              {collapsed
                ? "👥"
                : "👥 Customers"}
            </Link>

            <Link to="/orders">
              {collapsed
                ? "🛒"
                : "🛒 Orders"}
            </Link>

            {!collapsed && (
              <select
                value={theme}
                onChange={(e) =>
                  setTheme(
                    e.target.value
                  )
                }
              >
                <option value="dark">
                  🌙 Dark
                </option>

                <option value="light">
                  ☀️ Light
                </option>

                <option value="purple">
                  🟣 Purple
                </option>

                <option value="green">
                  🟢 Green
                </option>

                <option value="ocean">
                  🌊 Ocean
                </option>

                <option value="cyber">
                  ⚡ Cyber
                </option>
              </select>
            )}

            <button
              onClick={logout}
              className="logout-btn"
            >
              {collapsed
                ? "🚪"
                : "Logout"}
            </button>
          </div>
        )}

        <main
          className={
            user
              ? collapsed
                ? "main-content collapsed"
                : "main-content"
              : "content"
          }
        >
          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path="/customers"
              element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;