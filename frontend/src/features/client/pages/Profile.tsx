import {
  User,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

      {/* User Info Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Oleksandr Petrov</h2>
            <p className="text-blue-100 text-sm">+380 XX XXX XX XX</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
          <div>
            <div className="text-2xl font-bold">15</div>
            <div className="text-blue-100 text-xs">Total Deliveries</div>
          </div>
          <div>
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-blue-100 text-xs">Rating ⭐</div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase">
          Account Settings
        </h3>

        <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-gray-900">
              Phone Number
            </div>
            <div className="text-xs text-gray-500">+380 XX XXX XX XX</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-gray-900">
              Saved Addresses
            </div>
            <div className="text-xs text-gray-500">Manage locations</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-gray-900">Payment Methods</div>
            <div className="text-xs text-gray-500">Cards & wallets</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Preferences */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase">
          Preferences
        </h3>

        <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-gray-900">
              Notifications
            </div>
            <div className="text-xs text-gray-500">Push, email & SMS</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-gray-900">
              Privacy & Security
            </div>
            <div className="text-xs text-gray-500">Data & permissions</div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-white border-2 border-red-200 text-red-600 rounded-lg p-4 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors font-medium"
      >
        <LogOut className="w-5 h-5" />
        Вийти
      </button>

      {/* Version Info */}
      <div className="text-center mt-8 text-xs text-gray-400">
        Version 1.0.0 • Made with ❤️ in Ukraine
      </div>
    </div>
  );
}
