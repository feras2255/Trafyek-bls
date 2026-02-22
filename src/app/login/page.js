"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "حدث خطأ ما");
        setLoading(false);
        return;
      }

      // تسجيل الدخول ناجح
      router.push("/dashboard");
    } catch (err) {
      setError("حدث خطأ في الاتصال بالخادم");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-background">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-card p-6 mx-4 border border-border rounded-lg shadow-lg pb-10"
      >
        <h2 className="text-2xl md:text-4xl text-primary font-bold mb-8">
          تسجيل الدخول
        </h2>

        <div className="pb-4 space-y-4">
          <Input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white py-2 px-4 w-full rounded cursor-pointer hover:bg-secondarytext transition duration-300 disabled:opacity-50"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>

        {error && (
          <p className="text-sm md:text-base mt-2 text-red-500">{error}</p>
        )}
      </form>
    </div>
  );
}
