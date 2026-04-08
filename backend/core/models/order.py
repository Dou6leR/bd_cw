from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, Enum, ForeignKey, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base
from .enums import OrderStatus
from .mixins import IntIdPkMixin

if TYPE_CHECKING:
    from .address import Address
    from .client import Client
    from .courier import Courier
    from .payment import Payment
    from .review import Review


class Order(IntIdPkMixin, Base):
    __tablename__ = "orders"

    status: Mapped[OrderStatus] = mapped_column(
        Enum(
            OrderStatus,
            name="order_status",
            values_callable=lambda e: [m.value for m in e],
        ),
        default=OrderStatus.PENDING,
        server_default=OrderStatus.PENDING.value,
        nullable=False,
    )
    weight: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    volume: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    scheduled_pickup_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    scheduled_delivery_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    special_instructions: Mapped[str | None] = mapped_column(String(1000), nullable=True)

    sender_id: Mapped[int] = mapped_column(
        ForeignKey("clients.user_id", ondelete="RESTRICT"),
        nullable=False,
    )
    recipient_id: Mapped[int] = mapped_column(
        ForeignKey("clients.user_id", ondelete="RESTRICT"),
        nullable=False,
    )
    courier_id: Mapped[int | None] = mapped_column(
        ForeignKey("couriers.user_id", ondelete="SET NULL"),
        nullable=True,
    )
    pickup_address_id: Mapped[int] = mapped_column(
        ForeignKey("addresses.id", ondelete="RESTRICT"),
        nullable=False,
    )
    delivery_address_id: Mapped[int] = mapped_column(
        ForeignKey("addresses.id", ondelete="RESTRICT"),
        nullable=False,
    )

    sender: Mapped["Client"] = relationship(
        back_populates="sent_orders",
        foreign_keys=[sender_id],
    )
    recipient: Mapped["Client"] = relationship(
        back_populates="received_orders",
        foreign_keys=[recipient_id],
    )
    courier: Mapped["Courier | None"] = relationship(back_populates="orders")
    pickup_address: Mapped["Address"] = relationship(foreign_keys=[pickup_address_id])
    delivery_address: Mapped["Address"] = relationship(foreign_keys=[delivery_address_id])

    payment: Mapped["Payment | None"] = relationship(
        back_populates="order",
        uselist=False,
        cascade="all, delete-orphan",
    )
    review: Mapped["Review | None"] = relationship(
        back_populates="order",
        uselist=False,
        cascade="all, delete-orphan",
    )
