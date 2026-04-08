import { useState } from "react";
import { MapPin, Package, Clock, Search } from "lucide-react";

export default function Track() {
  const [trackingId, setTrackingId] = useState("");

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Track Delivery</h1>

      {/* Search Input */}
      <div className="mb-8">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Enter Tracking Number
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g., 1001"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Live Tracking Demo */}
      <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Package #1001</h3>
            <p className="text-sm text-gray-600">In Transit</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-100 rounded-lg h-48 mb-4 flex items-center justify-center border border-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50"></div>
          <div className="relative z-10 text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2 animate-pulse" />
            <div className="text-sm text-gray-600 font-medium">
              Live Location
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                Picked Up
              </div>
              <div className="text-xs text-gray-500">13:30 - Completed</div>
            </div>
          </div>

          <div className="ml-4 h-8 w-0.5 bg-blue-600"></div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                In Transit
              </div>
              <div className="text-xs text-blue-600 font-medium">
                ETA: 14:45 (8 min away)
              </div>
            </div>
          </div>

          <div className="ml-4 h-8 w-0.5 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-500">Delivered</div>
              <div className="text-xs text-gray-400">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Courier Info */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Courier Information
        </h4>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-600">DK</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">
              Dmytro Kovalenko
            </div>
            <div className="text-xs text-gray-500">⭐ 4.9 • 234 deliveries</div>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Call
          </button>
        </div>
      </div>
    </div>
  );
}
