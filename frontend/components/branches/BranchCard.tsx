"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function BranchCard({ branch }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-md transition">
      
      <div className="flex flex-col items-center space-y-4">
  <div className="bg-secondary text-white px-4 py-2 rounded-lg">
    Branch Manager
  </div>

  <div className="flex gap-4">
    <div className="bg-gray-100 px-4 py-2 rounded-lg">
      Supervisor
    </div>
    <div className="bg-gray-100 px-4 py-2 rounded-lg">
      Supervisor
    </div>
  </div>
</div>
      {/* Top */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg">{branch.name}</h2>
          <p className="text-sm text-gray-500">
            Manager: {branch.manager}
          </p>
        </div>

        <button onClick={() => setOpen(!open)}>
          <ChevronDown
            className={clsx("transition", open && "rotate-180")}
          />
        </button>
      </div>

      {/* Stats */}
      <div className="mt-4 text-sm text-gray-500">
        {branch.staffCount} Staff Members
      </div>

      {/* Expand */}
      {open && (
        <div className="mt-6 border-t pt-4 space-y-3">
          <h3 className="font-semibold text-sm text-gray-600">
            Management Hierarchy
          </h3>

          {branch.hierarchy.map((person: any, i: number) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
            >
              <span className="text-sm">{person.role}</span>
              <span className="text-sm font-medium">
                {person.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}