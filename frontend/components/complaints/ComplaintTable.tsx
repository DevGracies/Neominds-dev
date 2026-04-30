"use client";

import { useState } from "react";

 interface Complaint {
  id: number;
  employee: string;
  role: string;
  date: string;
  status: string;
  text: string;
}
//fetch complaints from api
export async function fetchComplaints(): Promise<Complaint[] | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || " http://localhost:3000/api/v1";
  const res = await fetch(`${API_URL}/complaints`);

if (!res.ok) {
    throw new Error("Failed to fetch complaints")
    
  } 

  return res.json();
}
  
//submit complaint to api
export async function submitComplaint(data: Omit<Complaint, 'id'>): Promise<Complaint> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || " http://localhost:3000/api/v1";
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

            <th className="p-4 text-left font-medium">
              Employee
            </th>

            <th className="p-4 text-left font-medium">
              Role
            </th>

            <th className="p-4 text-left font-medium">
              Status
            </th>

            <th className="p-4 text-left font-medium">
              Date
            </th>

            <th className="p-4 text-left font-medium">
              Text
            </th>

            <th className="p-4 text-right font-medium"> Action </th>

          </tr>

        </thead>

        {/* BODY */}
        <tbody>

          {complaints.map((item) => (

            <tr
              key={item.id}
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
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
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
              <button onClick={() => setSelected(item)} 
              className="text-secondary font-medium hover:underline" > View </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}