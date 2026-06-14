from fastapi import FastAPI

from app.routers.product_router import router as product_router
from app.routers.customer_router import router as customer_router
from app.routers.order_router import router as order_router
from app.routers.dashboard_router import router as dashboard_router

from app.database import Base, engine

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order
from app.models.order_item import OrderItem

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventory Management API")

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {"status": "running"}