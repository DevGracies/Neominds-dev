"use client";

import { useState } from "react";
import HRDetailsModal from "./HRDetailsModal";

const data = [
  {
    id: 1,
    name: "John Doe",
    type: "Leave",
    status: "Pending",
    date: "2026-04-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    type: "Loan",
    status: "Approved",
    date: "2026-03-28",
  },
];

export default function HRTable() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-500 text-sm">
          <tr>
            <th className="p-4 text-left">Employee</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
            <th className="text-right pr-6">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4">{item.name}</td>
              <td>{item.type}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "Approved"
                      ? "bg-green-100 text-green-600"
                      : item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td>{item.date}</td>

              <td className="text-right pr-6">
                <button
                  onClick={() => setSelected(item)}
                  className="text-secondary"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <HRDetailsModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}