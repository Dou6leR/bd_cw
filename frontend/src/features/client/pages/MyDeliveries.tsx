import { Link } from "react-router-dom";
import { Plus, Package, Clock, CheckCircle, ArrowRight, Truck, Shield } from "lucide-react";

export default function MyDeliveries() {
  const deliveries = [
    {
      id: "1001",
      status: "in-transit",
      type: "Package",
      from: "123 Main Street",
      to: "456 Oak Avenue",
      eta: "14:45",
      recipient: "Maria K.",
    },
    {
      id: "1002",
      status: "waiting",
      type: "Document",
      from: "789 Elm Road",
      to: "321 Pine Street",
      eta: "Pending acceptance",
      recipient: "Ivan S.",
    },
    {
      id: "1003",
      status: "completed",
      type: "Food",
      from: "555 Park Ave",
      to: "888 Beach Blvd",
      eta: "Delivered",
      recipient: "Anna P.",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Deliveries</h1>
        <Link
          to="/client/create"
          className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6 text-white" />
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-600">3</div>
          <div className="text-xs text-gray-600 mt-1">Active</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">12</div>
          <div className="text-xs text-gray-600 mt-1">Completed</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-600">15</div>
          <div className="text-xs text-gray-600 mt-1">Total</div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase">
          Recent Deliveries
        </h2>

        {deliveries.map((delivery) => (
          <Link
            key={delivery.id}
            to={
              delivery.status === "waiting"
                ? `/confirm/${delivery.id}`
                : `/courier/${delivery.id}`
            }
            className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  delivery.status === "completed"
                    ? "bg-green-100"
                    : delivery.status === "waiting"
                    ? "bg-yellow-100"
                    : "bg-blue-100"
                }`}
              >
                {delivery.status === "completed" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : delivery.status === "waiting" ? (
                  <Clock className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Package className="w-5 h-5 text-blue-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {delivery.type} • #{delivery.id}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      To: {delivery.recipient}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>

                <div className="space-y-1 mb-2">
                  <div className="text-xs text-gray-600 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    {delivery.from}
                  </div>
                  <div className="text-xs text-gray-600 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    {delivery.to}
                  </div>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
                    delivery.status === "completed"
                      ? "bg-green-50 text-green-700"
                      : delivery.status === "waiting"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {delivery.status === "completed" && "✓ "}
                  {delivery.status === "waiting" && "⏱ "}
                  {delivery.status === "in-transit" && "🚗 "}
                  {delivery.eta}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Courier mode link */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Режим кур'єра</h3>
            <p className="text-blue-100 text-xs">Керуйте активними доставками</p>
          </div>
        </div>
        <Link
          to="/courier"
          className="block w-full py-3 bg-white text-blue-600 rounded-xl text-center font-medium hover:bg-blue-50 transition-colors"
        >
          Відкрити кур'єрський інтерфейс
        </Link>
      </div>

      {/* Admin mode link */}
      <div className="mt-4 p-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Адмін-панель</h3>
            <p className="text-gray-300 text-xs">Керування всією системою</p>
          </div>
        </div>
        <Link
          to="/admin"
          className="block w-full py-3 bg-white text-gray-800 rounded-xl text-center font-medium hover:bg-gray-100 transition-colors"
        >
          Відкрити адмін-панель
        </Link>
      </div>

      {/* Empty state for demo */}
      <div className="mt-8 text-center">
        <Link
          to="/client/create"
          className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
        >
          <Plus className="w-4 h-4" />
          Create New Delivery
        </Link>
      </div>
    </div>
  );
}
