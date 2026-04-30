// components/layout/Sidebar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  Briefcase,
  Building2,
  MessageSquareWarning,
  Settings,
  LogOut,
} from "lucide-react";
import Logout from "../button/Logout";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Staff Management", href: "/staff", icon: Users },
  { name: "HR Actions", href: "/hr-actions", icon: Briefcase },
  { name: "Salary Schedule", href: "/salary", icon: FileText },
  { name: "Branches", href: "/branches", icon: Building2 },
  { name: "Complaints", href: "/complaints", icon: MessageSquareWarning },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-brand-navy h-full flex flex-col border-r border-gray-200 dark:border-gray-800 shadow-sm">
      {/* Brand Logo */}

      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center shadow-lg shadow-brand-teal/20">
            <span className="font-bold">H</span>
          </div>
          <span className="text-xl font-bold tracking-tight font-display">
            HR<span className="text-brand-teal">System</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-brand-teal  shadow-md"
                  : "hover:bg-white/5 hover:"
              }`}
            >
              <item.icon
                size={20}
                className={`${isActive ? "" : "text-slate-400 group-hover:text-brand-teal"}`}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <Logout />
      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-all">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-teal to-blue-400 border border-white/20" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold  truncate">Madam Chioma</p>
            <p className="text-xs text-slate-500 truncate">HR Director</p>
          </div>
          <Settings size={16} className="text-slate-500" />
        </div>
      </div>
    </aside>
  );
}
