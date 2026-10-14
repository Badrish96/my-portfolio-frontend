"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import GoogleAuthButton from "../../../components/auth/GoogleAuthButton";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "developer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    { value: "developer", label: "Developer" },
    { value: "recruiter", label: "Recruiter" },
    { value: "student", label: "Student" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Enter your name (at least 2 characters)";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can only contain letters and common punctuation";
    }

    if (!/^[a-zA-Z0-9_-]{3,15}$/.test(formData.username.trim())) {
      newErrors.username = "Use 3-15 letters, numbers, underscores, or hyphens";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = "Use 8+ characters with uppercase, lowercase, a number, and a special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const finishSignup = (data) => {
    window.localStorage.setItem("authToken", data.token);
    window.localStorage.setItem("authUser", JSON.stringify(data.user));
    window.location.href = "/dashboard";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setServerError("");
    setIsLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to create account.");
      finishSignup(data);
    } catch (error) {
      setServerError(error.message || "Unable to reach the authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async (credential) => {
    setServerError("");
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential, userType: formData.userType }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Google sign-up failed.");
      finishSignup(data);
    } catch (error) {
      setServerError(error.message || "Unable to reach the authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInClick = () => {
    // Navigate to sign in page
    window.location.href = "/login";
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
            Create <span className="text-[var(--primary)]">Account</span>
          </h1>
          <p className="text-[var(--fg)] opacity-70">
            Join our developer community today
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-2xl p-8">
          <div className="space-y-5">
            {serverError && <p role="alert" className="text-sm text-red-500">{serverError}</p>}
            <div>
              <label className="block text-sm font-semibold text-[var(--fg)] mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg)]/50 border border-[var(--primary)]/30 rounded-xl text-[var(--fg)] focus:outline-none focus:border-[var(--primary)]"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--fg)] mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg)]/50 border border-[var(--primary)]/30 rounded-xl text-[var(--fg)] focus:outline-none focus:border-[var(--primary)]"
                placeholder="Choose a username"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
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

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[var(--fg)] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--fg)] opacity-50" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 bg-[var(--bg)]/50 border rounded-xl text-[var(--fg)] placeholder:text-[var(--fg)]/50 focus:outline-none focus:border-[var(--primary)] transition-all ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[var(--primary)]/30"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--fg)] opacity-50 hover:opacity-100 transition-opacity"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-[var(--fg)] mb-2">
                User Type
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--fg)] opacity-50" />
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-[var(--bg)]/50 border border-[var(--primary)]/30 rounded-xl text-[var(--fg)] focus:outline-none focus:border-[var(--primary)] transition-all appearance-none cursor-pointer"
                >
                  {userTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-[var(--fg)] opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sign Up Button */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-[var(--primary)] to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
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

          {/* Google Sign Up Button */}
          <GoogleAuthButton onCredential={handleGoogleSignup} onError={setServerError} text="signup_with" />

          {/* Sign In Link */}
          <p className="text-center text-sm text-[var(--fg)] opacity-70 mt-6">
            Already have an account?{" "}
            <button
              onClick={handleSignInClick}
              className="text-[var(--primary)] font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-[var(--fg)] opacity-60 mt-6">
          By signing up, you agree to our{" "}
          <button className="text-[var(--primary)] hover:underline">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-[var(--primary)] hover:underline">
            Privacy Policy
          </button>
        </p>
      </motion.div>
    </div>
  );
}