import { Link } from "react-router-dom";
import { Phone, ChevronRight, Clock, MapPin } from "lucide-react";

export default function CourierDashboard() {
  // Mock active orders
  const activeOrders = [
    {
      id: "DLV-4829",
      status: "To Pickup",
      statusColor: "yellow",
      time: "5 min",
      distance: "3.2 km",
      sender: { name: "Олександр П.", phone: "+380501234567" },
      recipient: { name: "Марія К.", phone: "+380509876543" },
      pickup: "вул. Хрещатик, 22",
      delivery: "вул. Шевченка, 45",
    },
    {
      id: "DLV-4830",
      status: "In Transit",
      statusColor: "blue",
      time: "12 min",
      distance: "7.8 km",
      sender: { name: "Ігор В.", phone: "+380671234567" },
      recipient: { name: "Наталія С.", phone: "+380679876543" },
      pickup: "вул. Лесі Українки, 5",
      delivery: "пр. Перемоги, 120",
    },
    {
      id: "DLV-4831",
      status: "To Pickup",
      statusColor: "yellow",
      time: "18 min",
      distance: "5.5 km",
      sender: { name: "Дмитро К.", phone: "+380931234567" },
      recipient: { name: "Тетяна Л.", phone: "+380939876543" },
      pickup: "вул. Грушевського, 8",
      delivery: "вул. Богдана Хмельницького, 67",
    },
  ];

  const getStatusColor = (color: string) => {
    if (color === "yellow") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (color === "blue") return "bg-blue-50 text-blue-700 border-blue-200";
    if (color === "green") return "bg-green-50 text-green-700 border-green-200";
    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-gray-900">Active Orders</h1>
        <p className="text-sm text-gray-500">{activeOrders.length} deliveries in progress</p>
      </div>

      {/* Map View */}
      <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 via-blue-50 to-green-50">
        {/* Map placeholder with markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Simulated map markers */}
          <div className="relative w-full h-full">
            {/* Marker A */}
            <div className="absolute top-16 left-12 w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>

            {/* Marker B */}
            <div className="absolute top-32 right-16 w-10 h-10 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">B</span>
            </div>

            {/* Marker C */}
            <div className="absolute bottom-20 left-20 w-10 h-10 bg-yellow-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">C</span>
            </div>

            {/* Current location indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
              <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-75"></div>
            </div>

            {/* Route lines (simplified) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="20%"
                y1="30%"
                x2="50%"
                y2="50%"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.5"
              />
              <line
                x1="50%"
                y1="50%"
                x2="80%"
                y2="45%"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>

        {/* Map overlay info */}
        <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md">
          <p className="text-xs text-gray-500">Current Location</p>
          <p className="text-sm text-gray-900 font-medium">Kyiv City Center</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {activeOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4"
          >
            {/* Order header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-gray-900 font-semibold">{order.id}</h3>
                <span
                  className={`inline-block text-xs font-medium px-2 py-1 rounded-full border mt-1 ${getStatusColor(
                    order.statusColor
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-900 font-medium">
                  <Clock className="w-4 h-4 text-gray-500" />
                  {order.time}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{order.distance}</p>
              </div>
            </div>

            {/* Route info */}
            <div className="space-y-2 mb-3 pb-3 border-b border-gray-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Pickup</p>
                  <p className="text-sm text-gray-900">{order.pickup}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Delivery</p>
                  <p className="text-sm text-gray-900">{order.delivery}</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Sender</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors">
                <Phone className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Recipient</span>
              </button>
              <Link
                to={`/courier/execution/${order.id}`}
                className="flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
              >
                <span className="text-sm font-medium text-white">Execute</span>
                <ChevronRight className="w-4 h-4 text-white ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
