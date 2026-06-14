# 📦 Inventory & Order Management System

A full-stack Inventory & Order Management System built using React, FastAPI, PostgreSQL, Docker, Railway, and Vercel.

## 🚀 Live Demo

### Frontend
https://inventory-order-management-system-gold.vercel.app

### Backend API
https://inventory-order-management-system-production-458d.up.railway.app

### API Documentation
https://inventory-order-management-system-production-458d.up.railway.app/docs

---

## 📋 Features

### Authentication
- User Signup
- User Login
- Session Management

### Product Management
- Add Products
- Update Products
- Delete Products
- Inventory Tracking

### Customer Management
- Add Customers
- Update Customers
- Delete Customers

### Order Management
- Create Orders
- Delete Orders
- Automatic Stock Update
- Order Total Calculation

### Dashboard
- Total Products
- Total Customers
- Total Orders
- Low Stock Alerts
- Recent Orders
- Analytics Charts

### Reports
- Export Orders to CSV
- Generate PDF Invoice

### UI Features
- Responsive Design
- Dark Theme
- Multiple Theme Options
- Professional Dashboard

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Recharts
- jsPDF
- File Saver

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

### Database
- PostgreSQL
- SQLite (Fallback)

### DevOps
- Docker
- Docker Compose
- Railway
- Vercel
- GitHub

---

## 📂 Project Structure

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
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   │
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/akash15072004/Inventory-Order-Management-System.git

cd Inventory-Order-Management-System
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🐳 Docker Setup

### Build and Run

```bash
docker compose up --build
```

### Stop Containers

```bash
docker compose down
```

---

## 📡 API Endpoints

### Authentication

```http
POST /auth/signup
POST /auth/login
```

### Products

```http
GET    /products
POST   /products
PUT    /products/{id}
DELETE /products/{id}
```

### Customers

```http
GET    /customers
POST   /customers
PUT    /customers/{id}
DELETE /customers/{id}
```

### Orders

```http
GET    /orders
POST   /orders
DELETE /orders/{id}
```

### Dashboard

```http
GET /dashboard
```

---

## 🎯 Future Improvements

- JWT Authentication
- Role-Based Access Control
- Email Notifications
- Sales Analytics
- Inventory Alerts
- Order Status Tracking
- Cloud Database Integration

---

## 👨‍💻 Author

**Akash Chaudhary**

B.Tech Information Technology

GitHub:
https://github.com/akash15072004

---

## 📄 License

This project is developed for educational and assessment purposes.