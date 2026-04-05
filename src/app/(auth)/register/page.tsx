"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Stethoscope,
  Lock,
  Mail,
  User,
  ShieldCheck,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

const RegisterPage = () => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin" as "admin" | "user",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      }).unwrap();

      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  const roleOptions = [
    {
      value: "admin",
      label: "Admin",
      description: "Full access to all features",
      icon: ShieldCheck,
    },
    {
      value: "user",
      label: "User",
      description: "Read-only access",
      icon: User,
    },
  ];

  const selectedRole = roleOptions.find((r) => r.value === form.role);

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
            <p className="text-blue-300 text-sm mt-1">Create your account</p>
          </div>
        </div>

        {/* Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-white">
              Create an account
            </CardTitle>
            <CardDescription className="text-blue-200">
              Fill in your details to get started
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-blue-100 text-sm">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300/60 focus:border-blue-400 focus:ring-blue-400/30"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-blue-100 text-sm">
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

              {/* Role Dropdown */}
              <div className="space-y-1.5">
                <Label className="text-blue-100 text-sm">Account Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, role: v as "admin" | "user" }))
                  }
                >
                  <SelectTrigger className="bg-white/10 !w-[100%] border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/30 h-10">
                    <div className="flex items-center gap-2">
                      {selectedRole && (
                        <selectedRole.icon className="h-4 w-4 text-blue-300 shrink-0" />
                      )}
                      <SelectValue />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="bg-slate-900  !w-[100%] border-slate-700">
                    {roleOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-white focus:bg-blue-600/30 w-full focus:text-white cursor-pointer"
                      >
                        <div className="flex items-center gap-3 py-0.5">
                          <div className="bg-blue-500/20 rounded-lg p-1.5">
                            <opt.icon className="h-3.5 w-3.5 text-blue-300" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{opt.label}</p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-blue-100 text-sm">
                  Password
                </Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
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

                {/* Password strength indicator */}
                {form.password && (
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          form.password.length >= i * 3
                            ? form.password.length >= 10
                              ? "bg-emerald-400"
                              : form.password.length >= 7
                                ? "bg-amber-400"
                                : "bg-red-400"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-blue-100 text-sm"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className={`pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300/60 focus:border-blue-400 focus:ring-blue-400/30 transition-colors ${
                      form.confirmPassword &&
                      form.password !== form.confirmPassword
                        ? "border-red-400/50 focus:border-red-400"
                        : form.confirmPassword &&
                            form.password === form.confirmPassword
                          ? "border-emerald-400/50 focus:border-emerald-400"
                          : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {form.confirmPassword &&
                  form.password !== form.confirmPassword && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <span>✕</span> Passwords do not match
                    </p>
                  )}
                {form.confirmPassword &&
                  form.password === form.confirmPassword && (
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <span>✓</span> Passwords match
                    </p>
                  )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold h-11 transition-all duration-200 shadow-lg shadow-blue-500/30 mt-2"
                disabled={
                  isLoading ||
                  (!!form.confirmPassword &&
                    form.password !== form.confirmPassword)
                }
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
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </Button>

              {/* Divider + Login link */}
              <div className="relative mt-1 mb-6">
                <div className="mx-auto border-t w-[80%] border-white/10" />

                <div className="relative flex justify-center text-xs">
                  <span className="bg-transparent px-3 text-blue-300/60">
                    Already have an account?
                  </span>
                </div>

                <div className="mx-auto border-t w-[80%] border-white/10" />
              </div>

              <Link href="/login" className="block">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-white/20 bg-white/5 text-blue-200 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all h-10"
                >
                  Sign in instead
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

export default RegisterPage;
