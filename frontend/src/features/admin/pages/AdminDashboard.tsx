import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Package, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";

type OrderStatus = "active" | "completed" | "cancelled";
type PaymentStatus = "paid" | "refunded" | "processing";

interface Order {
  id: string;
  customer: string;
  courier: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  date: string;
  from: string;
  to: string;
}

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Mock orders data
  const allOrders: Order[] = [
    {
      id: "DLV-4829",
      customer: "Марія К.",
      courier: "Андрій Ш.",
      status: "active",
      paymentStatus: "paid",
      amount: 185,
      date: "2026-04-05",
      from: "Хрещатик, 22",
      to: "Шевченка, 45",
    },
    {
      id: "DLV-4828",
      customer: "Олександр П.",
      courier: "Тетяна М.",
      status: "active",
      paymentStatus: "paid",
      amount: 220,
      date: "2026-04-05",
      from: "Перемоги, 12",
      to: "Лесі Українки, 28",
    },
    {
      id: "DLV-4827",
      customer: "Іван С.",
      courier: "Дмитро К.",
      status: "completed",
      paymentStatus: "paid",
      amount: 150,
      date: "2026-04-04",
      from: "Велика Васильківська, 72",
      to: "Саксаганського, 41",
    },
    {
      id: "DLV-4826",
      customer: "Наталія Л.",
      courier: "Андрій Ш.",
      status: "completed",
      paymentStatus: "paid",
      amount: 195,
      date: "2026-04-04",
      from: "Хмельницького, 58",
      to: "Антоновича, 72",
    },
    {
      id: "DLV-4825",
      customer: "Петро В.",
      courier: "Тетяна М.",
      status: "cancelled",
      paymentStatus: "refunded",
      amount: 175,
      date: "2026-04-03",
      from: "Пушкінська, 31",
      to: "Басейна, 23",
    },
  ];

  // Filter orders based on search and status
  const filteredOrders = allOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.courier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPaymentColor = (status: PaymentStatus) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "refunded":
        return "bg-red-100 text-red-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCancelOrder = (order: Order) => {
    if (confirm(`Are you sure you want to cancel order ${order.id}?`)) {
      alert(`Order ${order.id} has been cancelled.`);
      setSelectedOrder(null);
    }
  };

  const handleRefundPayment = (order: Order) => {
    if (confirm(`Are you sure you want to refund ₴${order.amount} for order ${order.id}?`)) {
      alert(`Refund of ₴${order.amount} processed for order ${order.id}.`);
      setSelectedOrder(null);
    }
  };

  const stats = {
    active: allOrders.filter((o) => o.status === "active").length,
    completed: allOrders.filter((o) => o.status === "completed").length,
    cancelled: allOrders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-gray-900">Order Management</h1>
        <p className="text-sm text-gray-500">System Administrator</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-gray-500">Active</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-xs text-gray-500">Done</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <XCircle className="w-4 h-4 text-red-600" />
              <p className="text-xs text-gray-500">Cancel</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Customer, or Courier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex gap-2 flex-1">
              {(["all", "active", "completed", "cancelled"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4"
            >
              {/* Order header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-gray-900 font-semibold mb-1">{order.id}</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getPaymentColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">₴{order.amount}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
              </div>

              {/* Order details */}
              <div className="space-y-2 mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Customer:</span>
                  <span className="text-gray-900 font-medium">{order.customer}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Courier:</span>
                  <span className="text-gray-900 font-medium">{order.courier}</span>
                </div>
              </div>

              {/* Route */}
              <div className="space-y-2 mb-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">From</p>
                    <p className="text-sm text-gray-900">{order.from}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">To</p>
                    <p className="text-sm text-gray-900">{order.to}</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Manage
                </button>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Management Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Manage Order</h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="text-sm font-semibold text-gray-900">{selectedOrder.id}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Customer</span>
                <span className="text-sm font-medium text-gray-900">{selectedOrder.customer}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Amount</span>
                <span className="text-base font-bold text-gray-900">₴{selectedOrder.amount}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-500">Payment Status</span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${getPaymentColor(
                    selectedOrder.paymentStatus
                  )}`}
                >
                  {selectedOrder.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Control buttons */}
            <div className="space-y-3">
              {selectedOrder.status === "active" && (
                <>
                  <button
                    onClick={() => handleCancelOrder(selectedOrder)}
                    className="w-full py-3 bg-white border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Cancel Order
                  </button>

                  {selectedOrder.paymentStatus === "paid" && (
                    <button
                      onClick={() => handleRefundPayment(selectedOrder)}
                      className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <DollarSign className="w-5 h-5" />
                      Refund Payment
                    </button>
                  )}
                </>
              )}

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
