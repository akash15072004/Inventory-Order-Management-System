from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard_summary(
    db: Session = Depends(get_db)
):
    total_products = db.query(Product).count()

    total_customers = db.query(Customer).count()

    total_orders = db.query(Order).count()

    total_revenue = (
        db.query(
            func.sum(Order.total_amount)
        ).scalar()
    )

    if total_revenue is None:
        total_revenue = 0

    low_stock_products = (
        db.query(Product)
        .filter(Product.stock_quantity < 10)
        .all()
    )

    recent_orders = (
        db.query(Order)
        .order_by(Order.id.desc())
        .limit(5)
        .all()
    )

    return {
        "total_products": total_products,

        "total_customers": total_customers,

        "total_orders": total_orders,

        "total_revenue": total_revenue,

        "low_stock_products": [
            {
                "id": p.id,
                "name": p.name,
                "stock_quantity": p.stock_quantity
            }
            for p in low_stock_products
        ],

        "recent_orders": [
            {
                "id": o.id,
                "customer_id": o.customer_id,
                "total_amount": o.total_amount
            }
            for o in recent_orders
        ]
    }