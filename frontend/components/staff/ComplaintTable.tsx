"use client";

import { useState } from "react";

interface Complaint {
  _id: string; 
  employee: string;
  role: string;
  date: string;
  status: string;
  text: string;
}

// fetch complaints
export async function fetchComplaints(): Promise<Complaint[]> {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const res = await fetch(`${API_URL}/complaints`);

  if (!res.ok) {
    throw new Error("Failed to fetch complaints");
  }

  return res.json();
}

// submit complaint
export async function submitComplaint(
  data: Omit<Complaint, "_id">
): Promise<Complaint> {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const res = await fetch(`${API_URL}/complaints`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to submit complaint");
  }

  return res.json();
}

export default function ComplaintTable({
  complaints,
}: {
  complaints: Complaint[];
}) {
  const [selected, setSelected] = useState<Complaint | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden mt-6">
      <table className="w-full border-collapse">

        {/* HEADER */}
        <thead className="bg-gray-50 text-gray-500 text-sm">
          <tr>
            <th className="p-4 text-left">Employee</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Text</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {complaints.map((item) => (
            <tr
              key={item._id} 
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4 font-medium text-gray-800">
                {item.employee}
              </td>

              <td className="p-4 text-gray-600">
                {item.role}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    item.status === "Resolved"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="p-4 text-gray-600">
                {item.date}
              </td>

              <td className="p-4 text-gray-600 max-w-xs truncate">
                {item.text}
              </td>

              <td className="p-4 text-right">
                <button
                  onClick={() => setSelected(item)}
                  className="text-secondary font-medium hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}