"use client";

import { useState } from "react";
import BranchCard from "./BranchCard";

const branches = [
  {
    name: "Lagos Branch",
    manager: "John Doe",
    staffCount: 25,
    hierarchy: [
      { role: "Branch Manager", name: "John Doe" },
      { role: "Assistant Manager", name: "Jane Smith" },
      { role: "Supervisor", name: "Michael Lee" },
    ],
  },
  {
    name: "Abuja Branch",
    manager: "Sarah Adams",
    staffCount: 18,
    hierarchy: [
      { role: "Branch Manager", name: "Sarah Adams" },
      { role: "Supervisor", name: "David King" },
    ],
  },
];

export default function BranchList() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {branches.map((branch, i) => (
        <BranchCard key={i} branch={branch} />
      ))}
      <div className="flex gap-4">
  <input placeholder="Search branch..." className="input w-64" />

  <select className="input w-48">
    <option>All Locations</option>
    <option>Lagos</option>
    <option>Abuja</option>
  </select>
</div>
    </div>
  );
}