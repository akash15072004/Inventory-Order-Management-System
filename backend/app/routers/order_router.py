from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.customer import Customer
from app.models.product import Product
from app.schemas.order import OrderCreate

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post("/")
def create_order(
    payload: OrderCreate,
    db: Session = Depends(get_db)
):
    customer = db.query(Customer).filter(
        Customer.id == payload.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    total_amount = 0

    order = Order(
        customer_id=payload.customer_id,
        total_amount=0
    )

    db.add(order)
    db.flush()

    for item in payload.items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found"
            )

        if product.stock_quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for {product.name}"
            )

        product.stock_quantity -= item.quantity

        subtotal = product.price * item.quantity

        total_amount += subtotal

        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=item.quantity,
            unit_price=product.price
        )

        db.add(order_item)

    order.total_amount = total_amount

    db.commit()
    db.refresh(order)

    return {
        "order_id": order.id,
        "total_amount": total_amount
    }


@router.get("/")
def get_orders(
    db: Session = Depends(get_db)
):
    orders = db.query(Order).all()

    result = []

    for order in orders:

        order_items = []

        for item in order.items:

            product = (
                db.query(Product)
                .filter(
                    Product.id == item.product_id
                )
                .first()
            )

            order_items.append(
                {
                    "product_name":
                        product.name
                        if product
                        else "Unknown",

                    "quantity":
                        item.quantity,

                    "unit_price":
                        item.unit_price,

                    "amount":
                        item.quantity
                        * item.unit_price,
                }
            )

        result.append(
            {
                "id": order.id,

                "customer_id":
                    order.customer_id,

                "total_amount":
                    order.total_amount,

                "items":
                    order_items,
            }
        )

    return result


@router.get("/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order_items = []

    for item in order.items:

        product = (
            db.query(Product)
            .filter(
                Product.id == item.product_id
            )
            .first()
        )

        order_items.append(
            {
                "product_name":
                    product.name
                    if product
                    else "Unknown",

                "quantity":
                    item.quantity,

                "unit_price":
                    item.unit_price,

                "amount":
                    item.quantity
                    * item.unit_price,
            }
        )

    return {
        "id": order.id,
        "customer_id": order.customer_id,
        "total_amount": order.total_amount,
        "items": order_items,
    }


@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted"
    }
