import { TrendingUp, Package, DollarSign, Users } from "lucide-react";

export default function Reports() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-gray-900">Reports & Analytics</h1>
        <p className="text-sm text-gray-500">Business insights</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-white" />
              <p className="text-sm text-blue-100">Revenue</p>
            </div>
            <p className="text-2xl font-bold text-white">₴48,500</p>
            <p className="text-xs text-blue-100 mt-1">This month</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-gray-600" />
              <p className="text-sm text-gray-500">Deliveries</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">328</p>
            <p className="text-xs text-green-600 mt-1">+12% vs last</p>
          </div>
        </div>

        {/* Performance overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-gray-900 font-semibold mb-4">Performance Overview</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Completion Rate</p>
                  <p className="text-xs text-gray-500">Successful deliveries</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">97.8%</p>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Active Couriers</p>
                  <p className="text-xs text-gray-500">Currently online</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">12</p>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Package className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Avg Delivery Time</p>
                  <p className="text-xs text-gray-500">From pickup to delivery</p>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-900">42 min</p>
            </div>
          </div>
        </div>

        {/* Daily statistics */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <h2 className="text-gray-900 font-semibold mb-4">This Week</h2>

          <div className="space-y-3">
            {[
              { day: "Monday", deliveries: 45, revenue: 6750 },
              { day: "Tuesday", deliveries: 52, revenue: 7800 },
              { day: "Wednesday", deliveries: 48, revenue: 7200 },
              { day: "Thursday", deliveries: 55, revenue: 8250 },
              { day: "Friday", deliveries: 61, revenue: 9150 },
              { day: "Saturday", deliveries: 38, revenue: 5700 },
              { day: "Sunday", deliveries: 29, revenue: 4350 },
            ].map((item) => (
              <div key={item.day} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">{item.day}</p>
                  <p className="text-xs text-gray-500">{item.deliveries} deliveries</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900 font-semibold">₴{item.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
