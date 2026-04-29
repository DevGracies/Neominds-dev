"use client";

import { useEffect, useState } from "react";
import ComplaintForm from "@/components/complaints/ComplaintForm";
import ComplaintTable, { fetchComplaints } from "@/components/complaints/ComplaintTable";

export default function ComplaintDashboard() {
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    fetchComplaints()
      .then((data) => setComplaints(data ?? []))
      .catch(console.error);
  }, []);

  const handleFormSubmit = async (_submittedData: any) => {
  // After the form has successfully posted, refetch all complaints
  const updated = await fetchComplaints();
  setComplaints(updated ?? []);
};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-navy font-display">
          Employee Complaints
        </h2>
      </div>

      <ComplaintForm onSubmit={handleFormSubmit} />

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
