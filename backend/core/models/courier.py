from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .order import Order
    from .transport import Transport
    from .user import User


class Courier(Base):
    __tablename__ = "couriers"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        primary_key=True,
    )
    transport_id: Mapped[int | None] = mapped_column(
        ForeignKey("transports.id", ondelete="SET NULL"),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(default=True, server_default="true")
    rating_avg: Mapped[float] = mapped_column(
        Numeric(3, 2),
        default=0,
        server_default="0",
        nullable=False,
    )

    user: Mapped["User"] = relationship()
    transport: Mapped["Transport | None"] = relationship(back_populates="couriers")
    orders: Mapped[list["Order"]] = relationship(back_populates="courier")
