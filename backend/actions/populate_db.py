"""Populate the database with random but valid data for development.

Usage:
    uv run python -m actions.populate_db [--users 50] [--orders 120]
        [--addresses 30] [--transports 10] [--seed 42] [--wipe]

Default credentials for every generated user: password "password123",
emails like user1@example.com, user2@example.com, ...
"""

import argparse
import asyncio
import random
from datetime import datetime, timedelta, timezone

from sqlalchemy import delete, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from core.auth.password import hash_password
from core.helpers.db_helper import db_helper
from core.models import (
    Address,
    Admin,
    Client,
    Courier,
    Order,
    OrderStatus,
    Payment,
    PaymentMethod,
    Review,
    Transport,
    TransportType,
    User,
)

# ---------- reference data ----------

FIRST_NAMES = [
    "Олександр", "Андрій", "Іван", "Дмитро", "Сергій", "Богдан", "Максим",
    "Артем", "Володимир", "Назар", "Олена", "Марія", "Анна", "Софія",
    "Катерина", "Юлія", "Вікторія", "Тетяна", "Наталія", "Ірина",
]
LAST_NAMES = [
    "Шевченко", "Коваленко", "Бондаренко", "Ткаченко", "Кравченко", "Олійник",
    "Мельник", "Поліщук", "Романенко", "Гончар", "Лисенко", "Марченко",
    "Савченко", "Павленко", "Руденко", "Дяченко", "Литвин", "Захарченко",
    "Власенко", "Сидоренко",
]
CITIES = ["Київ", "Львів", "Одеса", "Харків", "Дніпро", "Запоріжжя",
          "Вінниця", "Полтава", "Чернівці", "Тернопіль"]
STREETS = ["вул. Шевченка", "вул. Франка", "вул. Грушевського",
           "вул. Лесі Українки", "просп. Свободи", "вул. Бандери",
           "вул. Героїв Майдану", "просп. Перемоги", "вул. Сагайдачного",
           "вул. Зелена"]
INSTRUCTIONS = [
    "Не дзвонити, написати в месенджер.",
    "Обережно, крихке.",
    "Залишити у консьєржа.",
    "Не залишати під дверима.",
    "Зателефонувати за 30 хвилин до прибуття.",
]
COMMENTS = [
    "Швидко і чітко, дякую!",
    "Все було вчасно, рекомендую.",
    "Кур'єр запізнився, але загалом нормально.",
    "Посилка пошкоджена, неприємно.",
    "Чудовий сервіс, скористаюся ще.",
    "Без скарг.",
]

# (max_weight, max_volume, models)
TRANSPORT_SPECS: dict[TransportType, tuple[float, float, list[str]]] = {
    TransportType.BIKE: (15, 0.2, ["Trek FX", "Giant Escape"]),
    TransportType.SCOOTER: (50, 0.5, ["Yamaha NMAX", "Vespa Primavera"]),
    TransportType.CAR: (500, 2.5, ["Renault Logan", "Skoda Octavia", "Toyota Corolla"]),
    TransportType.VAN: (1500, 10.0, ["Mercedes Sprinter", "Ford Transit"]),
    TransportType.TRUCK: (10000, 60.0, ["MAN TGL", "Volvo FL", "DAF LF"]),
}


# ---------- helpers ----------

def _rand_full_name() -> str:
    return f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}"


def _rand_coords() -> str:
    lat = round(random.uniform(46.0, 51.0), 6)
    lon = round(random.uniform(22.0, 40.0), 6)
    return f"{lat},{lon}"


def _weighted_choice(choices: list[tuple[object, float]]):
    population, weights = zip(*choices)
    return random.choices(population, weights=weights, k=1)[0]


# ---------- generators ----------

async def _wipe(session: AsyncSession) -> None:
    # Order matters: children before parents.
    for model in (Review, Payment, Order, Admin, Courier, Client, User, Transport, Address):
        await session.execute(delete(model))
    await session.commit()
    print("Wiped existing data")


async def _next_user_index(session: AsyncSession) -> int:
    max_id = await session.scalar(select(func.max(User.id)))
    return (max_id or 0) + 1


def _make_users(start_index: int, count: int, password_hash_value: str) -> list[User]:
    users: list[User] = []
    for i in range(count):
        n = start_index + i
        users.append(
            User(
                full_name=_rand_full_name(),
                phone=f"+38050{n:07d}",
                email=f"user{n}@example.com",
                password_hash=password_hash_value,
            )
        )
    return users


def _make_addresses(count: int) -> list[Address]:
    addrs: list[Address] = []
    for _ in range(count):
        addrs.append(
            Address(
                city=random.choice(CITIES),
                street=random.choice(STREETS),
                building=str(random.randint(1, 250)),
                apartment=str(random.randint(1, 300)) if random.random() < 0.5 else None,
                coordinates=_rand_coords() if random.random() < 0.5 else None,
            )
        )
    return addrs


def _make_transports(count: int) -> list[Transport]:
    transports: list[Transport] = []
    types = list(TransportType)
    # Guarantee every type appears at least once.
    queue = list(types)
    while len(queue) < count:
        queue.append(random.choice(types))
    random.shuffle(queue)
    for ttype in queue[:count]:
        max_w, max_v, models = TRANSPORT_SPECS[ttype]
        transports.append(
            Transport(
                model=random.choice(models),
                type=ttype,
                max_weight=round(max_w * random.uniform(0.6, 1.0), 2),
                max_volume=round(max_v * random.uniform(0.6, 1.0), 2),
            )
        )
    return transports


def _assign_roles(
    users: list[User], transports: list[Transport]
) -> tuple[list[Client], list[Courier], list[Admin]]:
    clients: list[Client] = []
    couriers: list[Courier] = []
    admins: list[Admin] = []

    # Guarantee minimums
    forced = {
        0: ("client",),
        1: ("client",),
        2: ("courier",),
        3: ("admin",),
    }

    for idx, user in enumerate(users):
        roles: set[str] = set()
        if idx in forced:
            roles.update(forced[idx])
        else:
            r = random.random()
            if r < 0.70:
                roles.add("client")
            elif r < 0.85:
                roles.add("courier")
            elif r < 0.95:
                roles.update({"client", "courier"})
            else:
                roles.add("admin")
                if random.random() < 0.5:
                    roles.add("client")

        if "client" in roles:
            clients.append(Client(user_id=user.id))
        if "courier" in roles:
            transport = random.choice(transports) if transports and random.random() < 0.9 else None
            couriers.append(
                Courier(
                    user_id=user.id,
                    transport_id=transport.id if transport else None,
                    is_active=random.random() < 0.85,
                    rating_avg=round(random.uniform(3.0, 5.0), 2),
                )
            )
        if "admin" in roles:
            admins.append(Admin(user_id=user.id))

    return clients, couriers, admins


def _make_orders(
    count: int,
    clients: list[Client],
    couriers: list[Courier],
    addresses: list[Address],
    transport_by_id: dict[int, Transport],
) -> list[Order]:
    if len(clients) < 2:
        raise SystemExit("Need at least 2 clients to create orders")
    if not addresses:
        raise SystemExit("Need at least 1 address to create orders")

    active_couriers = [c for c in couriers if c.is_active]
    status_choices: list[tuple[OrderStatus, float]] = [
        (OrderStatus.DELIVERED, 0.40),
        (OrderStatus.IN_TRANSIT, 0.15),
        (OrderStatus.PICKED_UP, 0.10),
        (OrderStatus.ASSIGNED, 0.10),
        (OrderStatus.PENDING, 0.15),
        (OrderStatus.CANCELLED, 0.10),
    ]
    needs_courier = {
        OrderStatus.ASSIGNED,
        OrderStatus.PICKED_UP,
        OrderStatus.IN_TRANSIT,
        OrderStatus.DELIVERED,
    }
    now = datetime.now(timezone.utc)

    orders: list[Order] = []
    for _ in range(count):
        sender, recipient = random.sample(clients, 2)
        pickup_addr = random.choice(addresses)
        delivery_addr = random.choice(addresses)

        status = _weighted_choice(status_choices)

        if status in needs_courier and active_couriers:
            courier = random.choice(active_couriers)
        elif status not in needs_courier and active_couriers and random.random() < 0.3:
            courier = random.choice(active_couriers)
        else:
            courier = None

        if courier and courier.transport_id is not None:
            transport = transport_by_id[courier.transport_id]
            max_w = float(transport.max_weight)
            max_v = float(transport.max_volume)
        else:
            max_w, max_v = 50.0, 5.0

        weight = round(random.uniform(0.1, max(max_w, 0.2)), 2)
        volume = round(random.uniform(0.01, max(max_v, 0.02)), 2)

        pickup_offset_hours = random.uniform(-30 * 24, 14 * 24)
        pickup = now + timedelta(hours=pickup_offset_hours)
        delivery = pickup + timedelta(hours=random.uniform(1, 72))

        orders.append(
            Order(
                status=status,
                weight=weight,
                volume=volume,
                scheduled_pickup_time=pickup,
                scheduled_delivery_time=delivery,
                special_instructions=(
                    random.choice(INSTRUCTIONS) if random.random() < 0.4 else None
                ),
                sender_id=sender.user_id,
                recipient_id=recipient.user_id,
                courier_id=courier.user_id if courier else None,
                pickup_address_id=pickup_addr.id,
                delivery_address_id=delivery_addr.id,
            )
        )
    return orders


def _make_payments(orders: list[Order]) -> list[Payment]:
    payments: list[Payment] = []
    methods = list(PaymentMethod)
    for order in orders:
        if order.status == OrderStatus.CANCELLED and random.random() < 0.5:
            continue

        if order.status == OrderStatus.DELIVERED:
            paid_at = order.scheduled_delivery_time - timedelta(
                hours=random.uniform(0, 6)
            )
        elif order.status in (
            OrderStatus.IN_TRANSIT,
            OrderStatus.PICKED_UP,
            OrderStatus.ASSIGNED,
        ):
            paid_at = (
                order.scheduled_pickup_time - timedelta(hours=random.uniform(0, 12))
                if random.random() < 0.5
                else None
            )
        else:
            paid_at = None

        payments.append(
            Payment(
                order_id=order.id,
                amount=round(random.uniform(50, 5000), 2),
                payment_method=random.choice(methods),
                paid_at=paid_at,
            )
        )
    return payments


def _make_reviews(orders: list[Order]) -> list[Review]:
    reviews: list[Review] = []
    rating_choices: list[tuple[int, float]] = [
        (1, 0.05), (2, 0.10), (3, 0.15), (4, 0.30), (5, 0.40),
    ]
    for order in orders:
        if order.status != OrderStatus.DELIVERED:
            continue
        if random.random() > 0.7:
            continue
        reviews.append(
            Review(
                order_id=order.id,
                rating=_weighted_choice(rating_choices),
                comment=random.choice(COMMENTS) if random.random() < 0.7 else None,
            )
        )
    return reviews


# ---------- orchestration ----------

async def populate(
    session: AsyncSession,
    n_users: int,
    n_addresses: int,
    n_transports: int,
    n_orders: int,
) -> None:
    password_hash_value = hash_password("password123")
    start_index = await _next_user_index(session)

    users = _make_users(start_index, n_users, password_hash_value)
    addresses = _make_addresses(n_addresses)
    transports = _make_transports(n_transports)

    session.add_all(users)
    session.add_all(addresses)
    session.add_all(transports)
    await session.flush()  # populate ids

    transport_by_id = {t.id: t for t in transports}

    clients, couriers, admins = _assign_roles(users, transports)
    session.add_all(clients)
    session.add_all(couriers)
    session.add_all(admins)
    await session.flush()

    orders = _make_orders(n_orders, clients, couriers, addresses, transport_by_id)
    session.add_all(orders)
    await session.flush()

    payments = _make_payments(orders)
    reviews = _make_reviews(orders)
    session.add_all(payments)
    session.add_all(reviews)

    await session.commit()

    print(
        "Created: "
        f"{len(users)} users, {len(addresses)} addresses, "
        f"{len(transports)} transports, {len(clients)} clients, "
        f"{len(couriers)} couriers, {len(admins)} admins, "
        f"{len(orders)} orders, {len(payments)} payments, "
        f"{len(reviews)} reviews"
    )
    print(
        f"Login range: user{start_index}@example.com .. "
        f"user{start_index + n_users - 1}@example.com (password: password123)"
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Populate the database with random data")
    parser.add_argument("--users", type=int, default=50)
    parser.add_argument("--addresses", type=int, default=30)
    parser.add_argument("--transports", type=int, default=10)
    parser.add_argument("--orders", type=int, default=120)
    parser.add_argument("--seed", type=int, default=None)
    parser.add_argument("--wipe", action="store_true", help="Delete all existing rows first")
    return parser.parse_args()


async def main() -> None:
    args = parse_args()
    if args.seed is not None:
        random.seed(args.seed)

    try:
        async with db_helper.session_factory() as session:
            if args.wipe:
                await _wipe(session)
            await populate(
                session,
                n_users=args.users,
                n_addresses=args.addresses,
                n_transports=args.transports,
                n_orders=args.orders,
            )
    finally:
        await db_helper.dispose()


if __name__ == "__main__":
    asyncio.run(main())
