"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import LeaveManagement from '@/components/hr/LeaveManagement';
import ReassignRole from '@/components/hr/ReassignRole';

export default function HRActionsPage() {
  const [activeTab, setActiveTab] = useState('Reassign Role');
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="flex items-center justify-between">

      <Link href="/staff" className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition mb-8 inline-flex">
        <ArrowLeft size={18} /> Back to Staff Directory
      </Link>
    <div className="relative w-96" >
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all"
          placeholder="choose a staff..."
          />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 border border-gray-200 rounded bg-white text-[10px] font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
          </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* LEFT COLUMN: Profile Summary & History Timeline */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-brand-primary text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-md">
              AB
            </div>
            <h2 className="text-xl font-bold text-slate-800">Aisha Bello</h2>
            <p className="text-brand-accent font-medium">F & B Manager</p>
            <p className="text-slate-500 text-sm mt-1">Lagos - Ikoyi Branch</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-sm">
              <span className="text-slate-500">Employee ID</span>
              <span className="font-semibold text-slate-800">EMP-2041</span>
            </div>
          </div>

          {/* History Timeline */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-brand-primary" /> Activity Timeline
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {/* Timeline Item */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-brand-accent bg-white text-slate-500 z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow" />
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl bg-slate-50 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-800 text-sm">Promoted</span>
                    <span className="text-xs text-slate-500">Oct 2024</span>
                  </div>
                  <p className="text-xs text-slate-500">Promoted from F&B to Branch Head.</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Execution Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-1">
            {/* Tabs */}
            {/* <div className="flex border-b border-slate-100 p-3 gap-2 overflow-x-auto">
              {['Reassign Role', 'Update Status', 'Leave Management', 'Disciplinary'].map((tab, idx) => (
                <button 
                  key={tab}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    idx === 0 ? 'bg-brand-primary text-white' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div> */}
            <div className="flex border-b border-slate-100 p-3 gap-2 overflow-x-auto">
              {['Reassign Role', 'Update Status', 'Leave Management', 'Disciplinary'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab 
                      ? 'bg-brand-primary text-slate-100 bg-slate-500' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Form Area (Example: Reassign Role) */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="p-6"
            >
              {/* Assaign Role */}
              {activeTab === 'Reassign Role' && (
                <ReassignRole />
              )}
              {/* Leave Management */}
              {activeTab === 'Leave Management' && (
                <LeaveManagement />
              )}
              {/* Update Status */}
              {activeTab === 'Update Status' && (
                <div className="text-sm text-slate-500">Update Status content coming...</div>
              )}
              {/* Displinary */}
              {activeTab === 'Disciplinary' && (
                <div className="text-sm text-slate-500">Disciplinary actions coming...</div>
              )}
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}


