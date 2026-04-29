"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (email === "hr@neominds.com" && password === "admin123") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push('/dashboard');
      } else {
        throw new Error("Invalid HR credentials");
      }
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (!mounted) return null; 

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f7fe] px-4" suppressHydrationWarning>
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="bg-blue-600 p-8 text-center text-white">
          <h2 className="text-3xl font-extrabold">HR Portal</h2>
          <p className="mt-2 opacity-90 text-sm">Sign in to your dashboard</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <div className="rounded bg-red-50 p-2 text-xs text-red-600 border border-red-100 text-center font-medium">{error}</div>}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  required
                  suppressHydrationWarning
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  required
                  suppressHydrationWarning
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

