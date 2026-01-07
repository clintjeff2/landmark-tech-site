"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/mgt/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (userCredential.user) {
        // Store auth token in localStorage for additional verification
        localStorage.setItem("adminAuth", "true");
        // Redirect to dashboard
        router.push("/mgt/dashboard");
      }
    } catch (err: any) {
      setIsLoading(false);

      // Handle specific Firebase errors
      const errorCode = err?.code;
      let errorMessage = "Authentication failed";

      if (errorCode === "auth/user-not-found") {
        errorMessage = "No account found with this email address";
      } else if (errorCode === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (errorCode === "auth/invalid-credential") {
        errorMessage = "Invalid email or password";
      } else if (errorCode === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (errorCode === "auth/too-many-requests") {
        errorMessage = "Too many failed login attempts. Please try again later";
      } else if (errorCode === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your connection";
      }

      setError(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full gradient-signature opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-md w-full mx-4 relative z-10">
        <div className="p-8 rounded-2xl bg-card border border-border shadow-2xl space-y-8">
          {/* Logo & Title */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl gradient-signature">
              <Lock size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Admin Login
              </h1>
              <p className="text-muted-foreground mt-2">
                Access the management dashboard
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm flex gap-3">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full pl-12 pr-12 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Info Message */}
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 text-sm">
            <p className="font-semibold mb-2">Firebase Authentication</p>
            <p>Sign in with your Firebase-registered email and password.</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
