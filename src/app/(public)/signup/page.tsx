"use client";

import { useState } from "react";
import Link from "next/link";
import { Form } from "@heroui/react";
import {
  BookOpen,
  Eye,
  EyeOff,
  User,
  Mail,
  LockKeyhole,
  Check,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

function Requirement({
  valid,
  children,
}: {
  valid: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        valid ? "text-emerald-600" : "text-slate-400"
      }`}
    >
      <Check size={14} strokeWidth={3} />
      <span>{children}</span>
    </div>
  );
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password validation
  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      image,
    };
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      image: formData.image,
    });
    if (error) {
      toast.error(error?.message as string);
      return;
    }
    toast.success(`${data?.user.email} You are Successfully Sign Up`);
  };

  const hendleGoogleSignup = async() => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f5ef] p-4 sm:p-6">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-xl md:min-h-[650px] md:grid-cols-[0.9fr_1.1fr]">
        {/* Left Side */}
        <section
          className="relative flex min-h-[250px] flex-col justify-center overflow-hidden bg-cover bg-center p-8 sm:p-12 md:min-h-full"
          style={{
            backgroundImage:
              "url('/images/booknook-register-illustration.png')",
          }}
        >
          <div className="absolute inset-0 bg-emerald-950/25" />

          <div className="relative z-10 mx-auto mt-auto max-w-sm text-center text-white md:mt-0">
            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">
              Join
              <br />
              BookNook
            </h1>

            <p className="mt-4 text-sm leading-6 text-white/90 sm:text-base">
              Create your account and start
              <br className="hidden sm:block" />
              your reading journey.
            </p>
          </div>
        </section>

        {/* Right Side */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-12 md:px-14 lg:px-16">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-7 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <BookOpen
                  size={27}
                  strokeWidth={2.5}
                  className="text-emerald-800"
                />

                <span className="text-xl font-bold text-emerald-900">
                  BookNook
                </span>
              </div>

              <h2 className="font-serif text-3xl font-bold text-emerald-950">
                Sign Up
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Create your account to get started.
              </p>
            </div>

            {/* Sign Up Form */}
            <Form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-semibold text-slate-600"
                >
                  Name
                </label>

                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold text-slate-600"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-semibold text-slate-600"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-11 text-sm text-slate-700 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-800"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="mt-2 space-y-1.5">
                  <Requirement valid={hasLength}>
                    At least 8 characters long
                  </Requirement>

                  <Requirement valid={hasUppercase}>
                    Must contain an uppercase letter
                  </Requirement>

                  <Requirement valid={hasNumber}>
                    Must contain a number
                  </Requirement>
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={!hasLength || !hasUppercase || !hasNumber}
                className="h-11 w-full rounded-lg bg-emerald-800 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Sign Up
              </button>
            </Form>

            {/* Divider */}
            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs font-medium text-slate-400">
                or continue with
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={hendleGoogleSignup}
              className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
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

            {/* Login Link */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-emerald-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
