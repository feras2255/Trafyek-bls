"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("البريد الإلكتروني او كلمة المرور غير صحيحة");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-background">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-card p-6 mx-4 rounded-lg shadow-lg pb-10"
      >
        <h2 className="text-2xl md:text-4xl text-primary font-bold mb-8">
          تسجيل الدخول
        </h2>
        <div className="pb-4">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full  rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4  w-full rounded cursor-pointer hover:bg-primary/80 transition duration-300"
        >
          دخول
        </button>
        {error && (
          <p className="text-sm md:text-base mt-2 text-red-500">{error}</p>
        )}
      </form>
    </div>
  );
}
