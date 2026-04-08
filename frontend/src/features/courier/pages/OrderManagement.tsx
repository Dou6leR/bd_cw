import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  CheckCircle,
} from "lucide-react";

export default function OrderManagement() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState<
    "to-pickup" | "arrived-pickup" | "picked-up" | "arrived-delivery" | "delivered"
  >("to-pickup");

  // Mock order data
  const order = {
    id: id || "DLV-4829",
    price: 185,
    sender: {
      name: "Олександр П.",
      phone: "+380501234567",
      address: "вул. Хрещатик, 22, Київ",
    },
    recipient: {
      name: "Марія К.",
      phone: "+380509876543",
      address: "вул. Шевченка, 45, Київ",
    },
    package: {
      type: "Package",
      weight: "2.5 kg",
      size: "Medium",
      notes: "Fragile items - handle with care",
    },
  };

  const handleStatusUpdate = () => {
    if (status === "to-pickup") {
      setStatus("arrived-pickup");
    } else if (status === "arrived-pickup") {
      setStatus("picked-up");
    } else if (status === "picked-up") {
      setStatus("arrived-delivery");
    } else if (status === "arrived-delivery") {
      setStatus("delivered");
      setTimeout(() => {
        alert("Delivery completed successfully!");
        navigate("/courier");
      }, 500);
    }
  };

  const getStatusInfo = () => {
    switch (status) {
      case "to-pickup":
        return {
          label: "En Route to Pickup",
          color: "yellow",
          buttonText: "Arrived at Pickup",
        };
      case "arrived-pickup":
        return {
          label: "Arrived at Pickup",
          color: "yellow",
          buttonText: "Order Picked Up",
        };
      case "picked-up":
        return {
          label: "Order Picked Up",
          color: "blue",
          buttonText: "Arrived at Destination",
        };
      case "arrived-delivery":
        return {
          label: "Arrived at Destination",
          color: "blue",
          buttonText: "Order Delivered",
        };
      case "delivered":
        return {
          label: "Delivered Successfully",
          color: "green",
          buttonText: "Complete",
        };
      default:
        return {
          label: "Unknown",
          color: "gray",
          buttonText: "Update Status",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate("/courier")} className="p-1">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-gray-900">Order Details</h1>
            <p className="text-sm text-gray-500">{order.id}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Badge */}
        <div
          className={`rounded-xl p-4 flex items-center gap-3 ${
            statusInfo.color === "yellow"
              ? "bg-yellow-50 border border-yellow-200"
              : statusInfo.color === "blue"
              ? "bg-blue-50 border border-blue-200"
              : statusInfo.color === "green"
              ? "bg-green-50 border border-green-200"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <CheckCircle
            className={`w-6 h-6 ${
              statusInfo.color === "yellow"
                ? "text-yellow-600"
                : statusInfo.color === "blue"
                ? "text-blue-600"
                : statusInfo.color === "green"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          />
          <div>
            <p
              className={`text-sm font-semibold ${
                statusInfo.color === "yellow"
                  ? "text-yellow-700"
                  : statusInfo.color === "blue"
                  ? "text-blue-700"
                  : statusInfo.color === "green"
                  ? "text-green-700"
                  : "text-gray-700"
              }`}
            >
              {statusInfo.label}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {status === "to-pickup" || status === "arrived-pickup"
                ? "Next: Pick up from sender"
                : status === "picked-up" || status === "arrived-delivery"
                ? "Next: Deliver to recipient"
                : "Order complete"}
            </p>
          </div>
        </div>

        {/* Status Timeline - Full */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-gray-900 font-semibold mb-4">Status Timeline</h2>

          <div className="relative">
            {/* En Route to Pickup */}
            <div className="flex gap-3 mb-6">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    status === "to-pickup"
                      ? "bg-blue-500 border-2 border-blue-600"
                      : status === "arrived-pickup" ||
                        status === "picked-up" ||
                        status === "arrived-delivery" ||
                        status === "delivered"
                      ? "bg-green-100"
                      : "bg-gray-200"
                  }`}
                >
                  {status === "arrived-pickup" ||
                  status === "picked-up" ||
                  status === "arrived-delivery" ||
                  status === "delivered" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : status === "to-pickup" ? (
                    <Clock className="w-5 h-5 text-white" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className={`w-0.5 h-16 my-1 ${
                  status === "arrived-pickup" ||
                  status === "picked-up" ||
                  status === "arrived-delivery" ||
                  status === "delivered"
                    ? "bg-green-400"
                    : "bg-gray-200"
                }`}></div>
              </div>

              <div className="flex-1 pt-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  En Route to Pickup
                </h3>
                <p className="text-xs text-gray-500">
                  {status === "to-pickup"
                    ? "Current status - On the way"
                    : "Completed"}
                </p>
              </div>
            </div>

            {/* At Pickup Point */}
            <div className="flex gap-3 mb-6">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    status === "arrived-pickup"
                      ? "bg-yellow-500 border-2 border-yellow-600"
                      : status === "picked-up" ||
                        status === "arrived-delivery" ||
                        status === "delivered"
                      ? "bg-green-100"
                      : "bg-gray-200"
                  }`}
                >
                  {status === "picked-up" ||
                  status === "arrived-delivery" ||
                  status === "delivered" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : status === "arrived-pickup" ? (
                    <MapPin className="w-5 h-5 text-white" />
                  ) : (
                    <MapPin className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className={`w-0.5 h-16 my-1 ${
                  status === "picked-up" ||
                  status === "arrived-delivery" ||
                  status === "delivered"
                    ? "bg-green-400"
                    : "bg-gray-200"
                }`}></div>
              </div>

              <div className="flex-1 pt-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  At Pickup Point
                </h3>
                <p className="text-sm text-gray-600 mb-2">{order.sender.address}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Scheduled: Today at 13:30</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {order.sender.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">{order.sender.name}</span>
                  </div>
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Call</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Picked Up */}
            <div className="flex gap-3 mb-6">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    status === "picked-up"
                      ? "bg-blue-500 border-2 border-blue-600"
                      : status === "arrived-delivery" || status === "delivered"
                      ? "bg-green-100"
                      : "bg-gray-200"
                  }`}
                >
                  {status === "arrived-delivery" || status === "delivered" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : status === "picked-up" ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className={`w-0.5 h-16 my-1 ${
                  status === "arrived-delivery" || status === "delivered"
                    ? "bg-green-400"
                    : "bg-gray-200"
                }`}></div>
              </div>

              <div className="flex-1 pt-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Package Picked Up
                </h3>
                <p className="text-xs text-gray-500">
                  {status === "picked-up"
                    ? "Current status - In transit"
                    : status === "arrived-delivery" || status === "delivered"
                    ? "Completed"
                    : "Pending"}
                </p>
              </div>
            </div>

            {/* At Delivery Point */}
            <div className="flex gap-3 mb-6">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    status === "arrived-delivery"
                      ? "bg-yellow-500 border-2 border-yellow-600"
                      : status === "delivered"
                      ? "bg-green-100"
                      : "bg-gray-200"
                  }`}
                >
                  {status === "delivered" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : status === "arrived-delivery" ? (
                    <MapPin className="w-5 h-5 text-white" />
                  ) : (
                    <MapPin className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className={`w-0.5 h-16 my-1 ${
                  status === "delivered" ? "bg-green-400" : "bg-gray-200"
                }`}></div>
              </div>

              <div className="flex-1 pt-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  At Delivery Point
                </h3>
                <p className="text-sm text-gray-600 mb-2">{order.recipient.address}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Scheduled: Today at 14:45</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {order.recipient.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">{order.recipient.name}</span>
                  </div>
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Call</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Delivered */}
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    status === "delivered"
                      ? "bg-green-500 border-2 border-green-600"
                      : "bg-gray-200"
                  }`}
                >
                  <CheckCircle
                    className={`w-5 h-5 ${
                      status === "delivered" ? "text-white" : "text-gray-400"
                    }`}
                  />
                </div>
              </div>

              <div className="flex-1 pt-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Order Delivered
                </h3>
                <p className="text-xs text-gray-500">
                  {status === "delivered" ? "Completed successfully" : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-gray-900 font-semibold mb-4">Package Details</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Type</span>
              <span className="text-sm text-gray-900 font-medium">{order.package.type}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Weight</span>
              <span className="text-sm text-gray-900 font-medium">{order.package.weight}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Size</span>
              <span className="text-sm text-gray-900 font-medium">{order.package.size}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">Delivery Fee</span>
              <span className="text-lg text-gray-900 font-semibold">₴{order.price}</span>
            </div>
          </div>

          {order.package.notes && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Special Instructions</p>
              <p className="text-sm text-gray-900">{order.package.notes}</p>
            </div>
          )}
        </div>

        {/* Update Status Button */}
        {status !== "delivered" && (
          <button
            onClick={handleStatusUpdate}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <CheckCircle className="w-5 h-5" />
            {statusInfo.buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
