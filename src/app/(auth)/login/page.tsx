"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Stethoscope, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch } from "@/redux/store";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();

      console.log("res", res);

      dispatch(
        setUser({
          user: res.data.user,
          accessToken: res.data.accessToken,
        }),
      );
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-2xl p-4 backdrop-blur-sm">
            <Stethoscope className="h-10 w-10 text-blue-300" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Doctor Tracker</h1>
            <p className="text-blue-300 text-sm mt-1">Secure Admin Portal</p>
          </div>
        </div>

        {/* Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-white">
              Sign in to your account
            </CardTitle>
            <CardDescription className="text-blue-200">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-100">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300/60 focus:border-blue-400 focus:ring-blue-400/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-100">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300/60 focus:border-blue-400 focus:ring-blue-400/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold h-11 transition-all duration-200 shadow-lg shadow-blue-500/30"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>

              <div className="relative mt-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-transparent px-3 text-blue-300/60">
                    Don&apos;t have an account?
                  </span>
                </div>
              </div>

              <Link href="/register" className="block mt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-white/20 bg-white/5 text-blue-200 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all h-10"
                >
                  Create an account
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-blue-300/60 text-xs">
          © 2025 Doctor Tracker. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
