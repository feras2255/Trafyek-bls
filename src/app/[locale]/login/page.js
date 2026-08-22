"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { supabase } from "@/lib/supabaseClient";
import Input from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

export default function SigninPage() {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let active = true;

    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!active) return;

      if (session) router.replace("/dashboard");
      else setCheckingAuth(false);
    };

    checkUser();
    return () => {
      active = false;
    };
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError(
          signInError.message === "Invalid login credentials"
            ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
            : signInError.message,
        );
        setLoading(false);
        return;
      }

      router.replace("/dashboard");
    } catch (err) {
      console.error(err);
      setError("حدث خطأ في الاتصال بالخادم");
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex h-screen justify-center items-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen justify-center items-center bg-background">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-card p-6 mx-4 border border-border rounded-lg shadow-lg pb-10"
      >
        <h2 className="text-2xl md:text-4xl text-secondary font-bold mb-8">
          تسجيل الدخول
        </h2>

        <div className="pb-4 space-y-4">
          <Input
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          aria-label="دخول"
          disabled={loading}
          className="bg-secondary text-maintext py-2 px-4 w-full rounded cursor-pointer hover:bg-secondarytext transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>

        {error && (
          <p role="alert" className="text-sm md:text-base mt-2 text-red-500">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
