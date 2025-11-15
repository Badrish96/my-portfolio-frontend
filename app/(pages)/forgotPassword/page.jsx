"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState("email"); // email, otp, reset, success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  const otpRefs = useRef([]);

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Email is invalid" });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendTimer(60);
      console.log("OTP sent to:", email);
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrors({});

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    
    const lastFilledIndex = Math.min(pastedData.length, 6) - 1;
    otpRefs.current[lastFilledIndex]?.focus();
  };

  const handleOtpVerify = () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setErrors({ otp: "Please enter the complete 6-digit code" });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("reset");
      console.log("OTP verified:", otpValue);
    }, 1500);
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;

    setOtp(["", "", "", "", "", ""]);
    setResendTimer(60);
    console.log("OTP resent to:", email);
  };

  const handlePasswordReset = () => {
    setErrors({});

    if (!password) {
      setErrors({ password: "Password is required" });
      return;
    }
    if (password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters" });
      return;
    }
    if (!confirmPassword) {
      setErrors({ confirmPassword: "Please confirm your password" });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      console.log("Password reset successfully");
    }, 1500);
  };

  const handleBackToSignIn = () => {
    router.push("/login");
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp(["", "", "", "", "", ""]);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors duration-200 flex items-center justify-center px-4 py-12">
      <AnimatePresence mode="wait">
        {step === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {/* Back Button */}
            <button
              onClick={handleBackToSignIn}
              className="flex items-center gap-2 text-[var(--fg)] opacity-70 hover:opacity-100 mb-6 transition-opacity"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">Back to Sign In</span>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[var(--fg)] mb-2">
                Forgot <span className="text-[var(--primary)]">Password?</span>
              </h1>
              <p className="text-[var(--fg)] opacity-70">
                Enter your email and we'll send you a verification code
              </p>
            </div>

            {/* Email Input */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-2xl p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[var(--fg)] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--fg)] opacity-50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit(e)}
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

                <motion.button
                  type="button"
                  onClick={handleEmailSubmit}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-[var(--primary)] to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Verification Code"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "otp" && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {/* Back Button */}
            <button
              onClick={handleBackToEmail}
              className="flex items-center gap-2 text-[var(--fg)] opacity-70 hover:opacity-100 mb-6 transition-opacity"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="text-sm font-semibold">Back</span>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[var(--fg)] mb-2">
                Verify <span className="text-[var(--primary)]">Code</span>
              </h1>
              <p className="text-[var(--fg)] opacity-70">
                Enter the 6-digit code sent to
              </p>
              <p className="text-[var(--primary)] font-semibold mt-1">
                {email}
              </p>
            </div>

            {/* OTP Verification */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-2xl p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[var(--fg)] mb-4 text-center">
                    Verification Code
                  </label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        className={`w-12 h-14 text-center text-2xl font-bold bg-[var(--bg)]/50 border rounded-xl text-[var(--fg)] focus:outline-none focus:border-[var(--primary)] transition-all ${
                          errors.otp
                            ? "border-red-500"
                            : "border-[var(--primary)]/30"
                        }`}
                      />
                    ))}
                  </div>
                  {errors.otp && (
                    <p className="text-red-500 text-xs mt-2 text-center">
                      {errors.otp}
                    </p>
                  )}
                </div>

                <motion.button
                  type="button"
                  onClick={handleOtpVerify}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-[var(--primary)] to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </motion.button>

                <div className="text-center">
                  <p className="text-sm text-[var(--fg)] opacity-70">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendTimer > 0}
                      className="text-[var(--primary)] font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resendTimer > 0
                        ? `Resend in ${resendTimer}s`
                        : "Resend Code"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === "reset" && (
          <motion.div
            key="reset"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[var(--fg)] mb-2">
                Reset <span className="text-[var(--primary)]">Password</span>
              </h1>
              <p className="text-[var(--fg)] opacity-70">
                Create a new password for your account
              </p>
            </div>

            {/* Password Reset */}
            <div className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-2xl p-8">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[var(--fg)] mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--fg)] opacity-50" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--fg)] mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--fg)] opacity-50" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handlePasswordReset()}
                      className={`w-full pl-12 pr-12 py-3 bg-[var(--bg)]/50 border rounded-xl text-[var(--fg)] placeholder:text-[var(--fg)]/50 focus:outline-none focus:border-[var(--primary)] transition-all ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-[var(--primary)]/30"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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

                <div className="bg-[var(--bg)]/30 border border-[var(--primary)]/20 rounded-xl p-4">
                  <p className="text-xs text-[var(--fg)] opacity-70">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-[var(--primary)] to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-2xl p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <CheckCircleIcon className="w-12 h-12 text-green-500" />
              </motion.div>

              <h1 className="text-3xl font-bold text-[var(--fg)] mb-2">
                Password <span className="text-[var(--primary)]">Reset!</span>
              </h1>
              <p className="text-[var(--fg)] opacity-70 mb-8">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </p>

              <motion.button
                onClick={handleBackToSignIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-[var(--primary)] to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
              >
                Back to Sign In
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Additional Info */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
        <p className="text-sm text-[var(--fg)] opacity-60">
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
}