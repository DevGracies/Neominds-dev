"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  Mail, 
  Loader2, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!data.success) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        throw new Error(data.message || "Login Failed");
      }

      login(data.token);
      setSuccess(true);

      setTimeout(() => router.push('/dashboard'), 800);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 font-sans overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className={`overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-transform duration-300 ${shake ? 'animate-shake' : ''}`}>

          {/* Loading Progress Bar */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gray-100/10 overflow-hidden rounded-t-2xl transition-opacity duration-300 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
            <div className="h-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 animate-progress-bar" />
          </div>

          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600/90 to-blue-800/90 p-8 text-center text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="mx-auto mb-4 w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <ShieldCheck size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">HR Portal</h2>
              <p className="mt-2 text-blue-100 opacity-90">Sign in to manage your team</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-300 backdrop-blur-sm animate-fade-in">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500/20 p-4 text-sm text-green-300 backdrop-blur-sm animate-fade-in">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>Authentication successful! Redirecting...</span>
                </div>
              )}

              {/* Email Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300 peer-focus:text-blue-400 transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="block w-full rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm py-3 pl-10 pr-3 text-white placeholder-gray-300 focus:border-blue-400 focus:bg-white/20 focus:ring-0 outline-none transition-all duration-300"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300 transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm py-3 pl-10 pr-10 text-white placeholder-gray-300 focus:border-blue-400 focus:bg-white/20 focus:ring-0 outline-none transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-gray-500/30 bg-white/5 text-blue-600 focus:ring-blue-500/30 transition-colors"
                  />
                  <span className="text-gray-200 group-hover:text-white transition-colors">Remember me</span>
                </label>
                <button 
                  type="button" 
                  className="text-blue-300 hover:text-blue-200 transition-colors font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="group relative flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3.5 text-sm font-bold text-white hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Authenticating...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="mr-2" size={20} />
                    Success!
                  </>
                ) : (
                  <>
                    Login to Dashboard
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Test Credentials */}
            <div className="mt-6 rounded-xl bg-blue-500/10 border border-blue-500/20 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-blue-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-300 mb-2">Quick Login (Admin)</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400 text-xs">Admin Access:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('hr@neominds.com');
                        setPassword('hrneominds123');
                      }}
                      className="text-blue-300 hover:text-blue-200 font-mono bg-white/5 px-3 py-1.5 rounded hover:bg-white/10 transition-colors text-[11px]"
                    >
                      hr@neominds.com
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Security Badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-300">
              <ShieldCheck size={14} className="text-green-400" />
              <span>End-to-end encrypted connection</span>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-xs text-gray-400">
              <p>&copy; 2026 Neominds Departmental Project</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes progress-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-bar {
          animation: progress-bar 1.5s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
