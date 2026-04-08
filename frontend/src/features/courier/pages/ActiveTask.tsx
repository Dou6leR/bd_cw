import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  Package,
  Navigation,
  Truck,
} from "lucide-react";

export default function ActiveTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState<"assigned" | "picked-up" | "delivered">(
    "assigned"
  );

  const handleUpdateStatus = () => {
    if (status === "assigned") {
      setStatus("picked-up");
    } else if (status === "picked-up") {
      setStatus("delivered");
      setTimeout(() => {
        alert("Delivery completed successfully!");
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/")}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Active Task</h1>
        </div>
        <div className="text-sm text-gray-500">#{id}</div>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        {status === "assigned" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-700">
              Assigned - En Route to Pickup
            </span>
          </div>
        )}
        {status === "picked-up" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 inline-flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Package Picked Up - Delivering
            </span>
          </div>
        )}
        {status === "delivered" && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 inline-flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Delivered Successfully
            </span>
          </div>
        )}
      </div>

      {/* Vertical Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-5">
          Delivery Route
        </h3>

        <div className="relative">
          {/* Pickup Point */}
          <div className="flex gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  status === "picked-up" || status === "delivered"
                    ? "bg-green-100"
                    : "bg-green-500"
                }`}
              >
                {status === "picked-up" || status === "delivered" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <MapPin className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="w-0.5 h-24 bg-gray-200 my-2"></div>
            </div>

            <div className="flex-1 pt-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Pick-up Point</h4>
                {status === "assigned" && (
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    Next Stop
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                123 Main Street, Kyiv
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Scheduled: Today at 13:30</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Oleksandr P.</span>
                <button className="ml-auto text-blue-600 text-sm font-medium hover:underline">
                  Call
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Point */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  status === "delivered"
                    ? "bg-blue-100"
                    : status === "picked-up"
                    ? "bg-blue-500"
                    : "bg-gray-200"
                }`}
              >
                {status === "delivered" ? (
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                ) : (
                  <MapPin
                    className={`w-5 h-5 ${
                      status === "picked-up" ? "text-white" : "text-gray-400"
                    }`}
                  />
                )}
              </div>
            </div>

            <div className="flex-1 pt-2">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Drop-off Point</h4>
                {status === "picked-up" && (
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    Next Stop
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                456 Oak Avenue, Kyiv
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Scheduled: Today at 14:45</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Maria K.</span>
                <button className="ml-auto text-blue-600 text-sm font-medium hover:underline">
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
          Package Details
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-gray-500 mb-1">Type</div>
            <div className="text-sm font-medium text-gray-900">Package 📦</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Weight</div>
            <div className="text-sm font-medium text-gray-900">2.5 kg</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Size</div>
            <div className="text-sm font-medium text-gray-900">Medium</div>
          </div>
        </div>
      </div>

      {/* Navigation Button */}
      <button className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors mb-3">
        <Navigation className="w-5 h-5" />
        Open in Maps
      </button>

      {/* Update Status Button */}
      {status !== "delivered" && (
        <button
          onClick={handleUpdateStatus}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <CheckCircle className="w-5 h-5" />
          {status === "assigned" ? "Mark as Picked Up" : "Mark as Delivered"}
        </button>
      )}

      {/* Link to new courier interface */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold">Новий кур'єрський інтерфейс</h3>
            <p className="text-blue-100 text-xs">З картою та розширеними функціями</p>
          </div>
        </div>
        <Link
          to="/courier"
          className="block w-full py-2.5 bg-white text-blue-600 rounded-lg text-center text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Відкрити новий інтерфейс →
        </Link>
      </div>
    </div>
  );
}
