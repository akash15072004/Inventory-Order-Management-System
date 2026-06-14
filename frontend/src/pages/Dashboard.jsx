import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function Dashboard() {
  const [data, setData] =
    useState(null);

  useEffect(() => {
    api
      .get("/dashboard/")
      .then((res) =>
        setData(res.data)
      )
      .catch(console.error);
  }, []);

  if (!data)
    return <h2>Loading...</h2>;

  const chartData = [
    {
      name: "Products",
      value: data.total_products,
    },
    {
      name: "Customers",
      value: data.total_customers,
    },
    {
      name: "Orders",
      value: data.total_orders,
    },
    {
      name: "Revenue",
      value: data.total_revenue,
    },
  ];

  return (
    <>
      <h1 className="page-title">
        Dashboard
      </h1>

      {/* CARDS */}

      <div className="card-container">
        <div className="card">
          <h2>
            {data.total_products}
          </h2>

          <p>
            Total Products
          </p>
        </div>

        <div className="card">
          <h2>
            {
              data.total_customers
            }
          </h2>

          <p>
            Total Customers
          </p>
        </div>

        <div className="card">
          <h2>
            {data.total_orders}
          </h2>

          <p>
            Total Orders
          </p>
        </div>

        <div className="card revenue-card">
          <h2>
            ₹
            {
              data.total_revenue
            }
          </h2>

          <p>
            Total Revenue
          </p>
        </div>
      </div>

      {/* ANALYTICS */}

      <div className="table-container">
        <h2
          style={{
            marginBottom:
              "20px",
            color: "#f59e0b",
          }}
        >
          📊 Business Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={280}
        >
          <BarChart
            data={chartData}
          >
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[
                10,
                10,
                0,
                0,
              ]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <br />

      {/* LOW STOCK */}

      <div className="table-container">
        <h2
          style={{
            marginBottom:
              "20px",
            color: "#ef4444",
          }}
        >
          ⚠️ Low Stock Products
        </h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data
              .low_stock_products
              .length > 0 ? (
              data.low_stock_products.map(
                (
                  item
                ) => (
                  <tr
                    key={
                      item.id
                    }
                  >
                    <td>
                      {
                        item.id
                      }
                    </td>

                    <td>
                      {
                        item.name
                      }
                    </td>

                    <td>
                      {
                        item.stock_quantity
                      }
                    </td>

                    <td>
                      🔴 Low
                      Stock
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign:
                      "center",
                  }}
                >
                  No Low
                  Stock
                  Products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <br />

      {/* RECENT ORDERS */}

      <div className="table-container">
        <h2
          style={{
            marginBottom:
              "20px",
            color: "#2563eb",
          }}
        >
          📦 Recent Orders
        </h2>

        <table>
          <thead>
            <tr>
              <th>
                Order ID
              </th>

              <th>
                Customer ID
              </th>

              <th>
                Total Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {data.recent_orders &&
            data.recent_orders
              .length > 0 ? (
              data.recent_orders.map(
                (
                  order
                ) => (
                  <tr
                    key={
                      order.id
                    }
                  >
                    <td>
                      {
                        order.id
                      }
                    </td>

                    <td>
                      {
                        order.customer_id
                      }
                    </td>

                    <td>
                      ₹
                      {
                        order.total_amount
                      }
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign:
                      "center",
                  }}
                >
                  No Orders
                  Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;