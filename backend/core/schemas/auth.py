from pydantic import BaseModel, EmailStr, Field

from core.schemas.user import UserOut


class _RegisterBase(BaseModel):
    full_name: str = Field(min_length=1, max_length=255)
    phone: str = Field(min_length=3, max_length=32)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class ClientRegisterIn(_RegisterBase):
    pass


class CourierRegisterIn(_RegisterBase):
    transport_id: int | None = None


class AddCourierRoleIn(BaseModel):
    transport_id: int | None = None


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut
