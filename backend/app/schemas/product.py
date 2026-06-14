# product schemas
from pydantic import BaseModel, Field

class ProductCreate(BaseModel):
    name: str
    sku: str
    price: float = Field(gt=0)
    stock_quantity: int = Field(ge=0)

class ProductUpdate(ProductCreate):
    pass

class ProductResponse(ProductCreate):
    id: int

    model_config = {
        "from_attributes": True
    }