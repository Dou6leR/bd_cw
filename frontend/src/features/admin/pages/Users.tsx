import { Search, User, Package, Star } from "lucide-react";
import { useState } from "react";

interface UserData {
  id: string;
  name: string;
  role: "customer" | "courier";
  phone: string;
  email: string;
  orders: number;
  rating?: number;
  status: "active" | "inactive";
}

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "customer" | "courier">("all");
  const [users, setUsers] = useState<UserData[]>([
    {
      id: "USR-001",
      name: "Марія К.",
      role: "customer",
      phone: "+380501234567",
      email: "maria.k@example.com",
      orders: 15,
      status: "active",
    },
    {
      id: "CRR-001",
      name: "Андрій Ш.",
      role: "courier",
      phone: "+380509876543",
      email: "andrii.sh@example.com",
      orders: 412,
      rating: 4.9,
      status: "active",
    },
    {
      id: "USR-002",
      name: "Олександр П.",
      role: "customer",
      phone: "+380672345678",
      email: "oleksandr.p@example.com",
      orders: 8,
      status: "active",
    },
    {
      id: "CRR-002",
      name: "Тетяна М.",
      role: "courier",
      phone: "+380503456789",
      email: "tetiana.m@example.com",
      orders: 298,
      rating: 4.8,
      status: "active",
    },
    {
      id: "USR-003",
      name: "Іван С.",
      role: "customer",
      phone: "+380934567890",
      email: "ivan.s@example.com",
      orders: 22,
      status: "active",
    },
  ]);

  const handleToggleStatus = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const stats = {
    customers: users.filter((u) => u.role === "customer").length,
    couriers: users.filter((u) => u.role === "courier").length,
    total: users.length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-gray-900">Users Management</h1>
        <p className="text-sm text-gray-500">Customers and Couriers</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Customers</p>
            <p className="text-2xl font-bold text-blue-600">{stats.customers}</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Couriers</p>
            <p className="text-2xl font-bold text-green-600">{stats.couriers}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            {(["all", "customer", "courier"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                  roleFilter === role
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-4 ${
                user.status === "inactive" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      user.role === "courier" ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    <User
                      className={`w-6 h-6 ${
                        user.role === "courier" ? "text-green-600" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.id}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    user.role === "courier"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Phone:</span>
                  <span className="text-gray-900">{user.phone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Orders:</span>
                  <span className="text-gray-900 font-medium">{user.orders}</span>
                </div>
                {user.rating && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-gray-900 font-medium">{user.rating}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Deactivation Button */}
              <button
                onClick={() => handleToggleStatus(user.id)}
                className={`w-full py-2.5 rounded-xl font-medium transition-colors ${
                  user.status === "active"
                    ? "border-2 border-red-600 text-red-600 hover:bg-red-50"
                    : "border-2 border-green-600 text-green-600 hover:bg-green-50"
                }`}
              >
                {user.status === "active" ? "Deactivate User" : "Activate User"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
