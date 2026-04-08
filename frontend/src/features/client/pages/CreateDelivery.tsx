import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Ruler,
  Weight,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

export default function CreateDelivery() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "waiting">("form");
  const [selectedCategory, setSelectedCategory] = useState("document");
  const [recipientPhone, setRecipientPhone] = useState("");

  const categories = [
    { id: "document", label: "Document", icon: "📄" },
    { id: "package", label: "Package", icon: "📦" },
    { id: "food", label: "Food", icon: "🍔" },
    { id: "fragile", label: "Fragile", icon: "🔴" },
  ];

  const handleSendRequest = () => {
    setStep("waiting");
  };

  if (step === "waiting") {
    return (
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setStep("form")}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            Delivery Request
          </h1>
        </div>

        {/* Waiting status card */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Waiting for Recipient
              </h3>
              <p className="text-sm text-gray-600">
                We've sent a delivery proposal to {recipientPhone}
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            You will be notified once they accept or modify the request
          </div>
        </div>

        {/* Dynamic ETA Widget */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">
            Estimated Timeline
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  Courier Pickup
                </div>
                <div className="text-xs text-green-600 font-medium">
                  Arrives in 12 min
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">
                  Estimated Delivery
                </div>
                <div className="text-xs text-blue-600 font-medium">
                  Today at 14:45
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Package Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase mb-3">
            Package Details
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Category:</span>
              <span className="text-gray-900 font-medium">
                {categories.find((c) => c.id === selectedCategory)?.label}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Weight:</span>
              <span className="text-gray-900 font-medium">2.5 kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Dimensions:</span>
              <span className="text-gray-900 font-medium">
                30 × 20 × 15 cm
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate("/")}>
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Create Delivery</h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1 h-1 bg-blue-600 rounded-full"></div>
        <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
        <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Package Category
        </label>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                selectedCategory === category.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs text-gray-700">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Package Details */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Weight className="w-4 h-4 text-gray-500" />
            Weight (kg)
          </label>
          <input
            type="number"
            placeholder="0.0"
            defaultValue="2.5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-gray-500" />
            Dimensions (L × W × H cm)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              placeholder="L"
              defaultValue="30"
              className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="W"
              defaultValue="20"
              className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="H"
              defaultValue="15"
              className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Recipient Information Section */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Recipient Information
        </h3>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-600" />
            Enter Phone Number
          </label>
          <input
            type="tel"
            placeholder="+380 XX XXX XX XX"
            value={recipientPhone}
            onChange={(e) => setRecipientPhone(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
          />
          <p className="text-xs text-gray-600 mt-2">
            We'll send them a delivery confirmation request
          </p>
        </div>
      </div>

      {/* Pickup & Delivery Addresses */}
      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-600" />
            Pickup Address
          </label>
          <input
            type="text"
            placeholder="Enter pickup location"
            defaultValue="123 Main Street, Kyiv"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            Delivery Address
          </label>
          <input
            type="text"
            placeholder="Enter delivery location"
            defaultValue="456 Oak Avenue, Kyiv"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Send Request Button */}
      <button
        onClick={handleSendRequest}
        disabled={!recipientPhone}
        className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
        Send Request to Recipient
      </button>
    </div>
  );
}
