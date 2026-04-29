"use client";

import { useState } from "react";

type ComplaintFormProps = {
  onSubmit: (data: any) => void;
};

export default function ComplaintForm({ onSubmit }: ComplaintFormProps) {

  const [employee, setEmployee] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComplaint = {
      employee,
      role,
      text,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    // send data to parent
    onSubmit(newComplaint);

    // reset form
    setEmployee("");
    
    setText("");

    setRole("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-soft">

      <h2 className="text-xl font-semibold mb-4">
        Submit Complaint
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

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
          placeholder="Write text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-secondary text-black px-6 py-2 rounded-lg"
        >
          Submit Complaint
        </button>

      </form>

    </div>
  );
}