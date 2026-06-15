# 📦 Inventory & Order Management System

A production-ready full-stack Inventory & Order Management System designed to streamline inventory operations, customer management, and order processing for businesses.

Built with a modern React frontend, FastAPI backend, PostgreSQL/SQLite database support, and containerized deployment using Docker. The application provides real-time inventory tracking, analytics, reporting, authentication, and a professional admin dashboard.

---

# 🚀 Live Demo

## Frontend (Vercel)

https://inventory-order-management-system-gold.vercel.app

## Backend API (Render)

https://inventory-order-management-system1-41dk.onrender.com/

## API Documentation (Swagger)

https://inventory-order-management-system1-41dk.onrender.com/docs

## 🐳 Docker Image

Backend Docker image is available on Docker Hub:

https://hub.docker.com/r/akash2413/inventory-backend

Pull the image:

```bash
docker pull akash2413/inventory-backend:latest
```

Run the container:

```bash
docker run -d -p 8000:8000 akash2413/inventory-backend:latest
```

---

# 📋 Project Overview

The Inventory & Order Management System enables businesses to efficiently manage:

* Product Inventory
* Customer Records
* Order Processing
* Inventory Tracking
* Business Analytics
* Reporting & Exporting

The system automatically updates stock levels when orders are created and provides insights through an analytics dashboard.

---

# ✨ Key Features

## 🔐 Authentication & Authorization

* User Registration
* User Login
* Session Management
* Protected Routes

## 📦 Product Management

* Create Products
* Update Products
* Delete Products
* Inventory Tracking
* Product Search

## 👥 Customer Management

* Create Customers
* Update Customers
* Delete Customers
* Customer Search

## 🛒 Order Management

* Create Orders
* Delete Orders
* Automatic Stock Deduction
* Order Validation
* Order Tracking

## 📊 Analytics Dashboard

* Total Products
* Total Customers
* Total Orders
* Low Stock Alerts
* Recent Orders
* Business Analytics Charts

## 📑 Reporting

* Export Orders to CSV
* Generate PDF Reports
* Download Business Records

## 🎨 User Experience

* Professional Admin Dashboard
* Multiple Theme Support
* Responsive Design
* Mobile Friendly Interface
* Interactive Charts

---

# 🏗️ System Architecture

```text
┌────────────────────────────┐
│       React Frontend       │
│         (Vercel)           │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│      FastAPI Backend       │
│         (Render)           │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│ PostgreSQL / SQLite DB     │
└────────────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Recharts
* jsPDF
* File Saver

## Backend

* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

## Database

* PostgreSQL
* SQLite

## DevOps & Deployment

* Docker
* Docker Compose
* Render
* Vercel
* GitHub

---

# 📂 Project Structure

```text
Inventory-Order-Management-System
│
├── backend
│   ├── app
│   │   ├── models
│   │   ├── routers
│   │   ├── schemas
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone https://github.com/akash15072004/Inventory-Order-Management-System.git

cd Inventory-Order-Management-System
```

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

python -m uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger Docs:

```text
http://localhost:8000/docs
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🐳 Docker Setup

## Build & Run Containers

```bash
docker compose up --build
```

## Stop Containers

```bash
docker compose down
```

---

# 📡 API Endpoints

## Authentication

```http
POST /auth/signup
POST /auth/login
```

## Products

```http
GET    /products
POST   /products
PUT    /products/{id}
DELETE /products/{id}
```

## Customers

```http
GET    /customers
POST   /customers
PUT    /customers/{id}
DELETE /customers/{id}
```

## Orders

```http
GET    /orders
POST   /orders
DELETE /orders/{id}
```

## Dashboard

```http
GET /dashboard
```

---

# 📈 Future Enhancements

* JWT Authentication
* Role-Based Access Control
* Email Notifications
* Sales Analytics
* Inventory Alerts
* Advanced Reporting
* Multi-User Support
* Cloud Database Integration

---

# 👨‍💻 Author

**Akash Chaudhary**

B.Tech Information Technology

GitHub:
https://github.com/akash15072004

---

# 📄 License

This project is developed for educational, learning, and technical assessment purposes.

---

## ✅ Assignment Requirements Covered

* React Frontend
* FastAPI Backend
* PostgreSQL Database Support
* Docker Containerization
* Docker Compose Setup
* Authentication System
* CRUD Operations
* Inventory Tracking
* Analytics Dashboard
* Reporting Features
* Responsive UI
* PDF Invoice Generation
* CSV Export Functionality
* Cloud Deployment (Vercel + Render)
* Production Ready Architecture

