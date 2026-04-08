import { Star, Package, Clock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";

export default function CourierProfile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  // Mock courier data
  const courier = {
    name: "Андрій Шевченко",
    rating: 4.9,
    totalReviews: 187,
    totalDeliveries: 412,
    memberSince: "Червень 2024",
    onTimeRate: "96.2%",
  };

  const reviews = [
    {
      id: 1,
      customer: "Марія К.",
      rating: 5,
      date: "2026-04-04",
      comment: "Дуже професійний кур'єр! Приїхав вчасно, акуратно поводився з посилкою. Рекомендую!",
    },
    {
      id: 2,
      customer: "Олександр П.",
      rating: 5,
      date: "2026-04-03",
      comment: "Швидка доставка, привітний та ввічливий. Дякую за якісну роботу!",
    },
    {
      id: 3,
      customer: "Тетяна Л.",
      rating: 5,
      date: "2026-04-02",
      comment: "Завжди вчасно, завжди на зв'язку. Один з найкращих кур'єрів!",
    },
    {
      id: 4,
      customer: "Ігор В.",
      rating: 4,
      date: "2026-04-01",
      comment: "Все добре, посилку доставив швидко. Один раз була невелика затримка, але попередив заздалегідь.",
    },
    {
      id: 5,
      customer: "Наталія С.",
      rating: 5,
      date: "2026-03-31",
      comment: "Професіонал своєї справи! Посилку отримала в ідеальному стані.",
    },
    {
      id: 6,
      customer: "Дмитро К.",
      rating: 5,
      date: "2026-03-30",
      comment: "Чудовий сервіс! Кур'єр зателефонував заздалегідь та підлаштувався під мій графік.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-gray-900">Courier Profile</h1>
        <p className="text-sm text-gray-500">Performance and reviews</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile card - Minimalist */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <h2 className="text-gray-900 mb-1">{courier.name}</h2>
          <p className="text-sm text-gray-500">Member since {courier.memberSince}</p>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <h2 className="text-gray-900 mb-4">Statistics</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                </div>
                <p className="text-sm text-gray-700">Average Rating</p>
              </div>
              <p className="text-xl text-gray-900 font-semibold">{courier.rating}</p>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-700">Total Deliveries</p>
              </div>
              <p className="text-xl text-gray-900 font-semibold">{courier.totalDeliveries}</p>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-700">On-time Delivery</p>
              </div>
              <p className="text-xl text-gray-900 font-semibold">{courier.onTimeRate}</p>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <h2 className="text-gray-900 mb-4">Customer Reviews</h2>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-900 font-medium">{review.customer}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString("uk-UA", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-white border-2 border-red-200 text-red-600 rounded-lg p-4 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors font-medium mt-6"
        >
          <LogOut className="w-5 h-5" />
          Вийти
        </button>
      </div>
    </div>
  );
}
