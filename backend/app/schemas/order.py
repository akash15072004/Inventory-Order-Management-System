# order schemas
from pydantic import BaseModel, Field

class OrderItemRequest(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)

class OrderCreate(BaseModel):
    customer_id: int
    items: list[OrderItemRequest]

class OrderResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: float

    model_config = {
        "from_attributes": True
    }