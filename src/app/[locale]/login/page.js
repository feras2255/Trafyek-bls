"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Input from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function SigninPage() {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     if (user) {
  //       router.replace("/dashboard");
  //     } else {
  //       setCheckingAuth(false);
  //     }
  //   };
  //   checkUser();
  // }, [router]);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession(); // استخدام getSession أدق هنا
      if (session) {
        router.replace("/dashboard");
      } else {
        setCheckingAuth(false);
      }
    };
    checkUser();
  }, [router]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        console.log("Supabase Error Details:", signInError);
        setError(signInError.message || "حدث خطأ ما");
        setLoading(false);
        return;
      }

      router.replace("/dashboard");
    } catch (err) {
      setError("حدث خطأ في الاتصال بالخادم");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex h-screen justify-center items-center bg-background">
        <p>جارٍ التحقق...</p>
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
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-secondary text-maintext py-2 px-4 w-full rounded cursor-pointer hover:bg-secondarytext transition duration-300 disabled:opacity-50"
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
