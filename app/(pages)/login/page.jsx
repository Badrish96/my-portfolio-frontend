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

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { ...formData, rememberMe });
      // Handle signin logic here
    }
  };

  const handleGoogleSignin = () => {
    console.log("Google signin clicked");
    // Handle Google OAuth here
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-[var(--primary)] to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              Sign In
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
          <motion.button
            type="button"
            onClick={handleGoogleSignin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-white dark:bg-[var(--bg)]/50 border border-[var(--primary)]/30 rounded-xl font-semibold text-[var(--fg)] hover:bg-[var(--primary)]/5 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </motion.button>

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