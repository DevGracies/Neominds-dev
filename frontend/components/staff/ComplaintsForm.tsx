"use client";

import { useState } from "react";
import { submitComplaint } from "./ComplaintTable";

type ComplaintFormProps = {
  onSubmit: (data: any) => void;
};

export default function ComplaintForm({ onSubmit }: ComplaintFormProps) {

  const [employee, setEmployee] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newComplaint = {
      employee,
      role,
      text,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    try {
      setLoading(true);

      const savedComplaint = await submitComplaint(newComplaint);

      // send ONLY once
      onSubmit(savedComplaint);

      // reset form
      setEmployee("");
      setRole("");
      setText("");

    } catch (error) {
      console.error("Error submitting complaint:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-soft text-black">

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="input"
          placeholder="Employee Name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          required
        />

        <input
          className="input"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <textarea
          className="input h-32"
          placeholder="Write complaint..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <div className="flex justify-center">

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>

        </div>

      </form>

    </div>
  );
}