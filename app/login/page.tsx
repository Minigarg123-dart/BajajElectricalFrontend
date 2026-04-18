"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save the authentication data including Role and Permissions
        localStorage.setItem("authToken", data.token);
        if (data.role) localStorage.setItem("userRole", data.role);
        if (data.permissions) localStorage.setItem("userPermissions", JSON.stringify(data.permissions));

        router.push("/dashboard");
      } else {
        alert(data.errorMessage || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Failed to connect to the authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-[#EBEFF5] overflow-hidden">

      {/* Left Pane - Branding & Typography */}
      <div className="relative hidden md:flex md:w-[45%] lg:w-[40%] flex-col justify-between p-12 overflow-hidden text-white pattern-bg">
        {/* Background gradient/pattern overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#003875] via-[#0052A3] to-[#2A7ADE]" />

        {/* Abstract shapes */}
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] rounded-full bg-black/10 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-lg shadow-black/10">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-base leading-tight tracking-wide">Find My Retailer</p>
            <p className="text-white/70 text-xs tracking-wider uppercase font-medium">Bajaj Electricals</p>
          </div>
        </div>

        <div className="relative z-10 my-auto">
          <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-6">
            Intelligent <br />
            Retailer <br />
            Scoring.
          </h1>
          <p className="text-white/80 text-sm leading-relaxed max-w-sm mb-10">
            Empower your sales and distribution strategy with AI-driven insights,
            environment classification, and precise potential mapping.
          </p>

          <div className="space-y-4">
            {[
              "Automated Environment Classification",
              "Dynamic FMR Scoring Models",
              "Opportunity Type Predictions"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-green-400" />
                <span className="text-xs font-medium text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/40 text-xs">© 2025 Bajaj Electricals. All rights reserved.</p>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative bg-white">

        {/* Mobile Header (Shows only on small screens) */}
        <div className="absolute top-6 left-6 flex md:hidden items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#0052A3] flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-slate leading-tight">Find My Retailer</p>
            <p className="text-slate-light text-[10px]">Bajaj Electricals</p>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate mb-2">Welcome back</h2>
            <p className="text-sm text-slate-light">Enter your credentials to access your dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wide mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={16} className="text-slate-light opacity-60" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@bajajelectricals.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-slate placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-cobalt/20 focus:border-cobalt transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-cobalt hover:underline transition-all">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={16} className="text-slate-light opacity-60" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-slate placeholder:text-slate-light focus:outline-none focus:ring-2 focus:ring-cobalt/20 focus:border-cobalt transition-all"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-cobalt focus:ring-cobalt/30"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-slate-light">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-cobalt hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed group mt-4 relative overflow-hidden"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Sign In</span>
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                </>
              )}
            </button>
          </form>

          {/* Social / Dev login hint */}
          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <p className="text-xs text-slate-light">
              Don't have an account? <a href="#" className="font-semibold text-cobalt hover:underline">Request access</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
