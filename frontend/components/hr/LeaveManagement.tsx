"use client";

import React, { useState } from "react";
import { CalendarDays, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

interface LeaveRecord {
  startDate: string;
  endDate: string;
}

export default function LeaveManagement() {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    status: "Pending",
    notes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Example existing leaves (replace with API data later)
  const existingLeaves: LeaveRecord[] = [
    { startDate: "2026-05-10", endDate: "2026-05-15" },
    { startDate: "2026-06-01", endDate: "2026-06-05" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  //Check date overlap
  const hasConflict = (start: string, end: string) => {
    return existingLeaves.some((leave) => {
      return (
        new Date(start) <= new Date(leave.endDate) &&
        new Date(end) >= new Date(leave.startDate)
      );
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.leaveType) newErrors.leaveType = "Leave type is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = "End date must be after start date";
      }

      if (hasConflict(formData.startDate, formData.endDate)) {
        newErrors.startDate = "This leave overlaps with an existing leave";
        newErrors.endDate = "This leave overlaps with an existing leave";
      }
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Valid Leave Submitted:", formData);

    // Reset after success
    setFormData({
      leaveType: "",
      startDate: "",
      endDate: "",
      status: "Pending",
      notes: "",
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <CalendarDays size={20} /> Leave Management
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Leave Type */}
        <div>
          <label className="text-sm font-medium">Leave Type</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-brand-accent"
          >
            <option value="">Select leave type...</option>
            <option>Annual Leave</option>
            <option>Sick Leave</option>
            <option>Maternity Leave</option>
            <option>Casual Leave</option>
          </select>
          {errors.leaveType && (
            <p className="text-red-500 text-xs mt-1">{errors.leaveType}</p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-brand-accent"
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-brand-accent"
            />
            {errors.endDate && (
              <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium">Approval Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-brand-accent"
          >
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium">HR Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-brand-accent"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() =>
              setFormData({
                leaveType: "",
                startDate: "",
                endDate: "",
                status: "Pending",
                notes: "",
              })
            }
            className="px-5 py-2.5 bg-slate-100 rounded-xl cursor-pointer hover:opacity-80"
          >
            Reset
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-500 text-white rounded-xl flex items-center cursor-pointer gap-2 hover:opacity-80"
          >
            <UserCircle size={18} />
            Submit Leave
          </button>
        </div>
      </form>
    </motion.div>
  );
}