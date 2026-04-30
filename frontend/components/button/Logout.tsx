"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, AlertCircle } from "lucide-react";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
        { method: "POST", credentials: "include" }
      );
      
      const data = await res.json();
      console.log("Response", data);

      if (!data.success) {
        throw new Error(data.message || "Logout failed");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {error && (
        <div className="absolute -top-10 left-0 right-0 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-300 animate-fade-in">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
      
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="group flex items-center gap-3 w-full max-w-[200px] px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-600/20 hover:shadow-red-600/40 overflow-hidden"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>Logging out...</span>
          </>
        ) : (
          <>
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
            <span>Logout</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Logout;
