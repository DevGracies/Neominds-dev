
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Plus, Users, UserCheck, UserX, Briefcase } from 'lucide-react';

const mockStaff = [
  { id: '1', name: 'Aisha Bello', role: 'House keeping Manager', branch: 'Lagos - Ikoyi', status: 'Active', email: 'a.bello@company.com', Salary: '70,000' },
  { id: '2', name: 'Chinedu Eze', role: 'HOP', branch: 'Abuja - Wuse', status: 'On Leave', email: 'c.eze@company.com', Salary: '90,000' },
  { id: '3', name: 'Zainab Usman', role: 'IT staff', branch: 'Port Harcourt', status: 'On Query', email: 'z.usman@company.com', Salary: '80,000' },
];

export default function StaffPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary">Staff Directory</h1>
          <p className="text-slate-500 mt-1">Manage and monitor your workforce</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-brand-primary rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition">
            <Download size={18} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-accent text-white rounded-xl shadow-soft hover:bg-teal-500 transition">
            <Plus size={18} /> Add Staff
          </button>
        </div>
      </div>

      {/* Mini Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', count: 248, icon: Users, color: 'text-brand-primary' },
          { label: 'Active', count: 215, icon: UserCheck, color: 'text-status-active' },
          { label: 'On Leave', count: 28, icon: Briefcase, color: 'text-status-leave' },
          { label: 'On Query', count: 5, icon: UserX, color: 'text-status-query' },
        ].map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.1 }}
            key={stat.label} 
            className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 flex items-center justify-between"
          >
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.count}</h3>
            </div>
            <div className={`p-3 bg-slate-50 rounded-xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="flex gap-4 bg-white p-4 rounded-2xl shadow-soft border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, role, or email..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-brand-accent outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-xl hover:bg-slate-100 transition">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-medium">Staff Member</th>
              <th className="px-6 py-4 font-medium">Job Title</th>
              <th className="px-6 py-4 font-medium">Branch</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Salary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockStaff.map((staff) => (
              <tr key={staff.id} className="hover:bg-slate-50 transition group cursor-pointer">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{staff.name}</p>
                    <p className="text-xs text-slate-500">{staff.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{staff.role}</td>
                <td className="px-6 py-4 text-slate-600">{staff.branch}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    staff.status === 'Active' ? 'bg-status-active/10 text-status-active' :
                    staff.status === 'On Leave' ? 'bg-status-leave/10 text-status-leave' :
                    'bg-status-query/10 text-status-query'
                  }`}>
                    {staff.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {staff.Salary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}