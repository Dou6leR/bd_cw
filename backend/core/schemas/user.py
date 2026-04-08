from pydantic import BaseModel, ConfigDict, EmailStr

from core.enums import UserRole


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    phone: str
    email: EmailStr
    roles: list[UserRole]
