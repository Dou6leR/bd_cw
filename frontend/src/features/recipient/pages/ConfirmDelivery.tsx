import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  Clock,
  Check,
  Edit,
  Phone,
  User,
} from "lucide-react";

export default function ConfirmDelivery() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleAccept = () => {
    alert("Delivery accepted! The courier will be notified.");
    navigate("/");
  };

  const handleChangeTime = () => {
    alert("Time/Location modification feature coming soon!");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate("/")}>
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">
          Delivery Proposal
        </h1>
      </div>

      {/* Notification-style card */}
      <div className="bg-blue-600 text-white rounded-lg p-5 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Oleksandr Petrov</h2>
            <p className="text-blue-100 text-sm">
              has initiated a delivery to you
            </p>
          </div>
        </div>
      </div>

      {/* Package Summary */}
      <div className="bg-gray-50 rounded-lg p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Package Details</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📦</span>
            <div>
              <div className="text-sm font-medium text-gray-900">
                Package Type
              </div>
              <div className="text-xs text-gray-600">Standard parcel</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
            <div>
              <div className="text-xs text-gray-500 mb-1">Weight</div>
              <div className="text-sm font-medium text-gray-900">2.5 kg</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Dimensions</div>
              <div className="text-sm font-medium text-gray-900">
                30×20×15 cm
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-600" />
          Calculated Timeline
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 mb-1">
                Pickup Point
              </div>
              <div className="text-sm text-gray-600 mb-1">
                123 Main Street, Kyiv
              </div>
              <div className="text-xs font-medium text-green-600">
                Today at 13:30
              </div>
            </div>
          </div>

          {/* Connection line */}
          <div className="ml-4 h-8 w-0.5 bg-gray-200"></div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 mb-1">
                Your Location
              </div>
              <div className="text-sm text-gray-600 mb-1">
                456 Oak Avenue, Kyiv
              </div>
              <div className="text-xs font-medium text-blue-600">
                Arrival: 14:45
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Map Placeholder */}
      <div className="bg-gray-100 rounded-lg h-48 mb-6 flex items-center justify-center border border-gray-200 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100"></div>
        <div className="relative z-10 flex flex-col items-center gap-3">
          <MapPin className="w-12 h-12 text-gray-400" />
          <div className="text-sm text-gray-500 font-medium">Route Preview</div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Pickup</span>
            </div>
            <div className="h-px w-12 bg-gray-400"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-gray-600" />
          <div className="flex-1">
            <div className="text-xs text-gray-500">Sender Contact</div>
            <div className="text-sm font-medium text-gray-900">
              +380 XX XXX XX XX
            </div>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Call
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAccept}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Check className="w-5 h-5" />
          Accept Delivery
        </button>

        <button
          onClick={handleChangeTime}
          className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Edit className="w-5 h-5" />
          Change Time / Location
        </button>
      </div>
    </div>
  );
}
