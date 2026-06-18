"use client";

import Link from "next/link";
import { Button, Card, Input } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const dataForm = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      email: dataForm.email,
      password: dataForm.password,
    });
    console.log(data, error);
    redirect('/')
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3B82F6]/10 via-white to-[#8B5CF6]/10 px-4 py-10">
      <Card className="w-full max-w-md rounded-2xl border border-gray-100 shadow-xl">
        <div className="p-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#333333]">
              Welcome Back 👋
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue to{" "}
              <span className="font-semibold text-[#3B82F6]">Giglance</span>
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#333333]">
                Email Address
              </label>

              <Input
                name="email"
                className={"py-2 px-4 border border-gray-400 rounded-full "}
                type="email"
                placeholder="Enter your email"
                variant="bordered"
                radius="lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#333333]">
                Password
              </label>

              <div className="relative">
                <Input
                  name="password"
                  className={
                    "py-2 px-4 border border-gray-400 rounded-full w-full"
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your email"
                  variant="bordered"
                  radius="lg"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#3B82F6]"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-[#3B82F6]" />
                Remember me
              </label>

              <Link
                href="/forgot-password"
                className="text-[#3B82F6] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r p-2 rounded-full from-[#3B82F6] to-[#8B5CF6] font-semibold text-white shadow-md"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-400">OR</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}

          <div className="space-y-3">
            <Button className="w-full border-gray-300 bg-white border border-purple-600 text-blue-600">
              <FcGoogle /> Continue with Google
            </Button>
          </div>

          {/* Register */}

          <p className="mt-8 text-center text-sm text-gray-500">
            Dont have an account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-[#8B5CF6] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
