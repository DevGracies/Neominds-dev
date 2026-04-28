"use client";

import { motion } from "framer-motion";

export default function HRDetailsModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-[500px] rounded-2xl p-6 shadow-soft"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{data.type} Request</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Info */}
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Date:</strong> {data.date}</p>
          <p><strong>Status:</strong> {data.status}</p>
        </div>

        {/* Timeline */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Activity Timeline</h3>

          <div className="space-y-4">
            <TimelineItem text="Request submitted" />
            <TimelineItem text="Under review" />
            {data.status === "Approved" && (
              <TimelineItem text="Approved by HR Manager" />
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 border rounded-lg">Reject</button>
          <button className="px-4 py-2 bg-secondary text-white rounded-lg">
            Approve
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function TimelineItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 bg-secondary rounded-full" />
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}