"use client";

import ComplaintForm from "@/components/staff/ComplaintsForm";

export default function ComplaintPage() {

  const handleSubmit = (data: any) => {
    console.log("Submitted:", data);
    // later → send to backend
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      <h2 className="text-2xl font-bold text-brand-navy font-display">
        Submit Complaint
      </h2>

      <ComplaintForm onSubmit={handleSubmit} />

    </div>
  );
}