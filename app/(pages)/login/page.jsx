"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "../../../components/auth/GoogleAuthButton";
import { useLoading } from "../../../components/ui/LoadingProvider";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveSession = (data, persistent = rememberMe) => {
    const storage = persistent ? window.localStorage : window.sessionStorage;
    storage.setItem("authToken", data.token);
    storage.setItem("authUser", JSON.stringify(data.user));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setServerError("");
    setIsLoading(true);
    startLoading();
    try {
      const response = await fetch(`${API_BASE}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to sign in.");
      saveSession(data);
      router.push("/dashboard");
    } catch (error) {
      setServerError(error.message || "Unable to reach the authentication server.");
    } finally {
      setIsLoading(false);
      stopLoading();
    }
  };

  const handleGoogleSignin = async (credential) => {
    setServerError("");
    setIsLoading(true);
    startLoading();
    try {
      const response = await fetch(`${API_BASE}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential, userType: "developer" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Google sign-in failed.");
      saveSession(data, true);
      router.push("/dashboard");
    } catch (error) {
      setServerError(error.message || "Unable to reach the authentication server.");
    } finally {
      setIsLoading(false);
      stopLoading();
    }
  };

  const handleSignUpClick = () => {
    // Navigate to sign up page
    router.push("/signup");
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    router.push("/forgotPassword");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors duration-200 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--fg)] mb-2">
            Welcome <span className="text-[var(--primary)]">Back</span>
          </h1>
          <p className="text-[var(--fg)] opacity-70">
            Sign in to continue to your account
          </p>
        </div>

        {/* Sign In Card */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-2xl p-8">
          <div className="space-y-5">
            {serverError && <p role="alert" className="text-sm text-red-500">{serverError}</p>}
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-[var(--fg)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--fg)] opacity-50" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-[var(--bg)]/50 border rounded-xl text-[var(--fg)] placeholder:text-[var(--fg)]/50 focus:outline-none focus:border-[var(--primary)] transition-all ${
                    errors.email
                      ? "border-red-500"
                      : "border-[var(--primary)]/30"
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[var(--fg)] mb-2">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--fg)] opacity-50" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 bg-[var(--bg)]/50 border rounded-xl text-[var(--fg)] placeholder:text-[var(--fg)]/50 focus:outline-none focus:border-[var(--primary)] transition-all ${
                    errors.password
                      ? "border-red-500"
                      : "border-[var(--primary)]/30"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--fg)] opacity-50 hover:opacity-100 transition-opacity"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[var(--primary)]/30 text-[var(--primary)] focus:ring-[var(--primary)] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-[var(--fg)] opacity-70">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[var(--primary)] hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-[var(--primary)] to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </motion.button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[var(--primary)]/20"></div>
            <span className="text-sm text-[var(--fg)] opacity-60">
              or continue with
            </span>
            <div className="flex-1 h-px bg-[var(--primary)]/20"></div>
          </div>

          {/* Google Sign In Button */}
          <GoogleAuthButton onCredential={handleGoogleSignin} onError={setServerError} text="signin_with" />

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[var(--fg)] opacity-70 mt-6">
            Don't have an account?{" "}
            <button
              onClick={handleSignUpClick}
              className="text-[var(--primary)] font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--fg)] opacity-60">
            Protected by industry-standard encryption
          </p>
        </div>
      </motion.div>
    </div>
  );
}
