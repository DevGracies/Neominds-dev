// components/layout/TopNav.tsx
"use client";
import { useAuth } from '@/context/AuthContext';
import { Search, Bell, HelpCircle, Moon } from 'lucide-react';
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const {user} = useAuth();

  console.log(user);
  const getInitials = (name: string = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(user?.name)

  return (
    <header className="h-20 border-b border-gray-200  backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      {/* Search Bar - Global Search focus */}
      <div className="relative w-96">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
          placeholder="Search staff, documents, or actions..."
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 border border-gray-200 rounded bg-white text-[10px] font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-5">
        <button className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-full transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <button className="p-2 text-gray-400 hover:text-brand-navy hover:bg-gray-100 rounded-full transition-all">
          <HelpCircle size={20} />
        </button>

   <div className='text-white border-white border p-2 rounded-full'>{user && initials}</div>

        <div className="h-6 w-px bg-gray-200 mx-1" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-brand-navy uppercase tracking-wider">Head Office</p>
            <p className="text-[10px] text-brand-teal font-medium">Hr department</p>
          </div>
          <button className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-all">
            <Moon  onClick={toggleTheme} size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}