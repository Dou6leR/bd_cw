import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Package, MapPin, Phone, Clock } from "lucide-react";

type OrderStatus = "accepted" | "at-pickup" | "in-transit" | "delivered";

export default function OrderExecution() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("accepted");

  // Mock order data
  const order = {
    id: id || "DLV-4829",
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
      weight: "2.5 kg",
      type: "Package",
      instructions: "Fragile - Handle with care",
    },
    payment: 185,
  };

  // Status flow configuration
  const statusFlow = [
    { key: "accepted", label: "Order Accepted", icon: CheckCircle },
    { key: "at-pickup", label: "At Pickup Point", icon: MapPin },
    { key: "in-transit", label: "In Transit", icon: Package },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  // Get current status index
  const currentIndex = statusFlow.findIndex((s) => s.key === currentStatus);

  // Action button configuration based on status
  const getActionButton = () => {
    switch (currentStatus) {
      case "accepted":
        return {
          text: "Confirm Pickup",
          action: () => setCurrentStatus("at-pickup"),
        };
      case "at-pickup":
        return {
          text: "Start Delivery",
          action: () => setCurrentStatus("in-transit"),
        };
      case "in-transit":
        return {
          text: "Confirm Delivery",
          action: () => {
            setCurrentStatus("delivered");
            setTimeout(() => {
              alert("Delivery completed successfully!");
              navigate("/courier");
            }, 1000);
          },
        };
      case "delivered":
        return {
          text: "Completed",
          action: () => navigate("/courier"),
        };
      default:
        return { text: "Next Step", action: () => {} };
    }
  };

  const actionButton = getActionButton();

  // Check if status is completed, current, or pending
  const getStatusStyle = (index: number) => {
    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "current";
    return "pending";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/courier")} className="p-1">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-gray-900">Order Progress</h1>
            <p className="text-sm text-gray-500">{order.id}</p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        {/* Vertical Status Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-4">
          <h2 className="text-gray-900 font-semibold mb-5">Delivery Status</h2>

          <div className="space-y-1">
            {statusFlow.map((status, index) => {
              const StatusIcon = status.icon;
              const style = getStatusStyle(index);

              return (
                <div key={status.key} className="relative">
                  {/* Connecting line */}
                  {index < statusFlow.length - 1 && (
                    <div
                      className={`absolute left-[19px] top-10 w-0.5 h-12 ${
                        style === "completed" ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}

                  {/* Status item */}
                  <div className="flex items-start gap-4 pb-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        style === "completed"
                          ? "bg-blue-600"
                          : style === "current"
                          ? "bg-blue-100 border-2 border-blue-600"
                          : "bg-gray-100 border-2 border-gray-200"
                      }`}
                    >
                      {style === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <StatusIcon
                          className={`w-5 h-5 ${
                            style === "current" ? "text-blue-600" : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex-1 pt-2">
                      <p
                        className={`text-sm font-medium ${
                          style === "current"
                            ? "text-gray-900"
                            : style === "completed"
                            ? "text-gray-700"
                            : "text-gray-500"
                        }`}
                      >
                        {status.label}
                      </p>
                      {style === "current" && (
                        <span className="inline-block mt-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          Current Status
                        </span>
                      )}
                      {style === "completed" && (
                        <span className="inline-block mt-1 text-xs text-green-600">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-4">
          <h2 className="text-gray-900 font-semibold mb-4">Package Details</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Weight</span>
              <span className="text-sm text-gray-900 font-medium">{order.package.weight}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Type</span>
              <span className="text-sm text-gray-900 font-medium">{order.package.type}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">Delivery Fee</span>
              <span className="text-lg text-gray-900 font-semibold">₴{order.payment}</span>
            </div>
          </div>

          {/* Special instructions */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start gap-2">
              <Package className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-yellow-900 font-medium mb-1">Special Instructions</p>
                <p className="text-sm text-yellow-800">{order.package.instructions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-gray-900 font-semibold mb-4">Contact Information</h2>

          {/* Sender */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <p className="text-xs text-gray-500 uppercase font-medium">Pickup Location</p>
            </div>
            <p className="text-sm text-gray-900 font-medium mb-1">{order.sender.name}</p>
            <p className="text-sm text-gray-600 mb-2">{order.sender.address}</p>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">{order.sender.phone}</span>
            </button>
          </div>

          {/* Recipient */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-gray-500 uppercase font-medium">Delivery Location</p>
            </div>
            <p className="text-sm text-gray-900 font-medium mb-1">{order.recipient.name}</p>
            <p className="text-sm text-gray-600 mb-2">{order.recipient.address}</p>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">{order.recipient.phone}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-[390px] mx-auto">
          <button
            onClick={actionButton.action}
            disabled={currentStatus === "delivered"}
            className={`w-full py-5 rounded-2xl font-bold text-lg shadow-lg transition-all ${
              currentStatus === "delivered"
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:scale-98"
            }`}
          >
            {actionButton.text}
          </button>
        </div>
      </div>
    </div>
  );
}
