"use client";

import { useState } from "react";

/**
 * ComplaintForm
 * Simple client-side form used by HR to submit employee complaints.
 *
 * Notes for the team:
 * - Keep state variables grouped near their inputs for readability.
 * - Add validation rules or move to a form library if validation grows.
 */
export default function ComplaintForm() {
  // Controlled inputs for the form fields. Each has a setter used by the JSX below.
  const [employee, setEmployee] = useState(""); // Employee full name
  const [department, setDepartment] = useState("HR"); // Department select
  const [date, setDate] = useState(""); // Incident date
  const [severity, setSeverity] = useState("Low"); // Severity level
  const [description, setDescription] = useState(""); // Long text description
  const [fileName, setFileName] = useState<string | null>(null); // Attached file name (UI only)
  const [submitting, setSubmitting] = useState(false); // UX flag to disable button

  /**
   * handleFile
   * Basic file input handler that records the selected file's name.
   * For real uploads replace this with FormData and an API call.
   */
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    setFileName(f ? f.name : null);
  };

  /**
   * handleSubmit
   * Prevents default submit, toggles `submitting` and simulates a network call.
   * Replace the simulated delay with a `fetch`/`axios` call to the backend.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Minimal payload matching the backend controller expectations.
      const payload = { employee, department, date, severity, description };

      // Backend is intentionally not implemented in this branch.
      // Simulate a successful submission so the UI remains usable for the front-end
      // team and the next implementer can wire an API endpoint later.
      // TODO: replace this simulated POST with a real API call when backend is ready.
      await new Promise((r) => setTimeout(r, 600));

      // Reset UX state and show confirmation (local demo behavior)
      setEmployee('');
      setDepartment('HR');
      setDate('');
      setSeverity('Low');
      setDescription('');
      setFileName(null);

      alert('Complaint recorded locally (frontend demo). Backend integration pending.');
    } catch (err: any) {
      console.error('Submit error', err);
      alert('Failed to submit complaint: ' + (err.message || 'unknown'));
    } finally {
      setSubmitting(false);
    }
  };

  // Render the complaint form. Keep markup semantic and accessible where practical.
  return (
    <form className="bg-white p-6 rounded-lg shadow-soft" onSubmit={handleSubmit}>
      {/* Form heading */}
      <h3 className="text-lg font-semibold mb-4">Submit Employee Complaint</h3>

      {/* Grid wrapper for inputs */}
      <div className="grid grid-cols-1 gap-3">
        {/* Employee name (required) */}
        <input
          className="input"
          placeholder="Employee Name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          required
        />

        {/* Department selector */}
        <select
          className="input"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option>HR</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>Sales</option>
          <option>Finance</option>
        </select>

        {/* Date + severity in one row */}
        <div className="flex gap-3">
          <input
            className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            className="input w-40"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Description textarea (required) */}
        <textarea
          className="input h-28"
          placeholder="Describe the complaint"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* File attachment UI - note: not uploaded to server in this demo */}
        <label className="flex items-center gap-3 text-sm text-gray-600">
          <input type="file" onChange={handleFile} />
          <span>{fileName ?? "Attach evidence (optional)"}</span>
        </label>

        {/* Submit button - disabled while submitting to prevent duplicate posts */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-secondary text-white px-4 py-2 rounded-lg disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Complaint"}
          </button>
        </div>
      </div>
    </form>
  );
}
