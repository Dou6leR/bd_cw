import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Package } from "lucide-react";
import { authApi } from "./api";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      setToken(res.access_token);
      navigate("/", { replace: true });
    } catch {
      setError("Невірний email або пароль");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[390px] bg-white min-h-screen flex flex-col shadow-lg">
        <div className="flex flex-col items-center pt-16 pb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 font-semibold text-xl">Вхід</h1>
          <p className="text-sm text-gray-500 mt-1">Увійди в свій акаунт</p>
        </div>

        <form onSubmit={onSubmit} className="px-6 space-y-4 flex-1">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1.5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1.5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-xl"
            disabled={loading}
          >
            {loading ? "Вхід…" : "Увійти"}
          </Button>
        </form>

        <div className="px-6 py-6 text-center">
          <p className="text-sm text-gray-500">
            Немає акаунту?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Зареєструватись
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
