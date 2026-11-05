"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, Mail, LockKeyhole } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const INPUT =
  "h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[#0d4d33] focus:ring-2 focus:ring-[#0d4d33]/15";
const LABEL = "mb-2 block text-sm font-semibold text-slate-600";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      toast.error("Invalid email or password");
      return;
    }
    toast.success("Welcome back to BookNook!");
    router.push("/");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <main className="flex items-center justify-center bg-[#f4f7f2] px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-black/[0.05] bg-white shadow-[0_30px_60px_-30px_rgba(13,77,51,0.35)] md:min-h-[620px] md:grid-cols-[0.9fr_1.1fr]">
        {/* Left Side */}
        <section className="relative flex min-h-[220px] flex-col justify-end overflow-hidden bg-[#0d4d33] bg-cover bg-center p-7 sm:p-10 md:min-h-full md:justify-center md:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80')",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#082d20] via-[#082d20]/75 to-[#082d20]/30 md:bg-gradient-to-r"
          />

          <div className="relative z-10 max-w-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
              <BookOpen className="h-3.5 w-3.5" /> BookNook Library
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Welcome Back!
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/80 sm:text-base">
              Sign in to continue your reading journey — your shelf is waiting.
            </p>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex items-center justify-center px-5 py-9 sm:px-10 sm:py-12 md:px-12 lg:px-16">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-7 text-center">
              <div className="mb-3 flex items-center justify-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0d4d33] text-white shadow-sm shadow-[#0d4d33]/25">
                  <BookOpen size={20} strokeWidth={2.2} />
                </span>
                <span className="font-display text-lg font-bold text-[#0d4d33]">
                  BookNook
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Login
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter your details to access your account.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className={LABEL}>
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={INPUT}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-600">
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#0d4d33] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className={INPUT.replace("pr-4", "pr-12")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0d4d33]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#0d4d33] text-sm font-semibold text-white shadow-md shadow-[#0d4d33]/25 transition-all hover:bg-[#0a3d28] active:scale-[0.99]"
              >
                Login
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium text-slate-400">
                or continue with
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              <svg width="19" height="19" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  fill="#FFC107"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4 6v5h6.5c3.8-3.5 6.1-8.6 6.1-14.7Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.5-5c-1.8 1.2-4.1 1.9-7 1.9-5.3 0-9.8-3.6-11.4-8.4H6v5.1C9.4 39.5 16.2 44 24 44Z"
                />
                <path
                  fill="#4A90E2"
                  d="M12.6 27.7a12 12 0 0 1 0-7.4v-5.1H6a20 20 0 0 0 0 17.6l6.6-5.1Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4 16.2 4 9.4 8.5 6 15.2l6.6 5.1c1.6-4.8 6.1-8.2 11.4-8.2Z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Register */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-[#0d4d33] hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
