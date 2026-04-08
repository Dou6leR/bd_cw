import { Calendar, DollarSign } from "lucide-react";

export default function DeliveryHistory() {
  // Mock delivery history data
  const deliveries = [
    { id: "DLV-4828", date: "2026-04-05", price: 185 },
    { id: "DLV-4827", date: "2026-04-05", price: 220 },
    { id: "DLV-4826", date: "2026-04-04", price: 150 },
    { id: "DLV-4825", date: "2026-04-04", price: 195 },
    { id: "DLV-4824", date: "2026-04-04", price: 175 },
    { id: "DLV-4823", date: "2026-04-03", price: 200 },
    { id: "DLV-4822", date: "2026-04-03", price: 160 },
    { id: "DLV-4821", date: "2026-04-02", price: 185 },
    { id: "DLV-4820", date: "2026-04-02", price: 210 },
    { id: "DLV-4819", date: "2026-04-02", price: 145 },
    { id: "DLV-4818", date: "2026-04-01", price: 190 },
    { id: "DLV-4817", date: "2026-04-01", price: 225 },
    { id: "DLV-4816", date: "2026-03-31", price: 170 },
    { id: "DLV-4815", date: "2026-03-31", price: 195 },
    { id: "DLV-4814", date: "2026-03-30", price: 155 },
    { id: "DLV-4813", date: "2026-03-30", price: 180 },
    { id: "DLV-4812", date: "2026-03-29", price: 205 },
    { id: "DLV-4811", date: "2026-03-29", price: 165 },
    { id: "DLV-4810", date: "2026-03-28", price: 175 },
    { id: "DLV-4809", date: "2026-03-28", price: 190 },
  ];

  // Calculate totals
  const totalEarnings = deliveries.reduce((sum, d) => sum + d.price, 0);
  const totalDeliveries = deliveries.length;

  // Format date to Ukrainian locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-gray-900">History</h1>
        <p className="text-sm text-gray-500">Last 30 days</p>
      </div>

      {/* Summary cards */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-white" />
              <p className="text-sm text-blue-100">Total Earned</p>
            </div>
            <p className="text-2xl font-bold text-white">₴{totalEarnings.toLocaleString()}</p>
            <p className="text-xs text-blue-100 mt-1">This month</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <p className="text-sm text-gray-500">Completed</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalDeliveries}</p>
            <p className="text-xs text-gray-500 mt-1">Deliveries</p>
          </div>
        </div>

        {/* Deliveries list */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-gray-900 font-semibold">Completed Deliveries</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {deliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{delivery.id}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatDate(delivery.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-semibold text-gray-900">
                      ₴{delivery.price}
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">✓ Paid</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
