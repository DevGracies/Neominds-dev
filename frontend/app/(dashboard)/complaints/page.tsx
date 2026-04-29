"use client";

import { useState } from "react";
import ComplaintForm from "@/components/complaints/ComplaintForm";
import ComplaintTable from "@/components/complaints/ComplaintTable";

export default function ComplaintDashboard() {

  const [complaints, setComplaints] = useState<any[]>([]);

  const addComplaint = (newComplaint: any) => {
    setComplaints((prev) => [
      ...prev,
      { id: Date.now(), ...newComplaint }
    ]);
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-navy font-display">
          Employee Complaints
        </h2>
      </div>

      <ComplaintForm onSubmit={addComplaint} />

      <ComplaintTable complaints={complaints} />

    </div>
  );
}

// // components/complaints/ComplaintTable.tsx
// const complaints = [
//   { id: 1, employee: "Sarah Jenkins", role: "UI Designer", date: "Apr 12", status: "Pending", text: "Hardware issues with MacBook..." },
//   { id: 2, employee: "Michael Chen", role: "Backend Dev", date: "Apr 11", status: "Resolved", text: "Request for workspace stipend..." },
// ];

// export default function  ComplaintDashboard() {
//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-brand-navy font-display">Employee Complaints</h2>
//       </div>
//     </div>
//   );
// }