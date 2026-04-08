import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { authApi } from "./api";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Role = "client" | "courier";

export function RegisterPage() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("client");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {
        full_name: fullName,
        email,
        phone: phone || undefined,
        password,
      };
      const res =
        role === "client"
          ? await authApi.registerClient(payload)
          : await authApi.registerCourier(payload);
      setToken(res.access_token);
      navigate("/", { replace: true });
    } catch {
      setError("Не вдалося зареєструватись");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-[390px] bg-white min-h-screen flex flex-col shadow-lg">
        <div className="flex flex-col items-center pt-12 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 font-semibold text-xl">Реєстрація</h1>
          <p className="text-sm text-gray-500 mt-1">Створи новий акаунт</p>
        </div>

        <div className="px-6 mb-4">
          <Tabs value={role} onValueChange={(v) => setRole(v as Role)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client">Клієнт</TabsTrigger>
              <TabsTrigger value="courier">Кур'єр</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <form onSubmit={onSubmit} className="px-6 space-y-4 flex-1">
          <div>
            <Label htmlFor="full_name">Ім'я</Label>
            <Input
              id="full_name"
              required
              className="mt-1.5"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
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
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              className="mt-1.5"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
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
            {loading ? "Створення…" : "Створити акаунт"}
          </Button>
        </form>

        <div className="px-6 py-6 text-center">
          <p className="text-sm text-gray-500">
            Вже маєш акаунт?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Увійти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
