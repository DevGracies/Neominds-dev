"use client";

const salaries = [
  {
    name: "John Doe",
    role: "Manager",
    amount: "₦500,000",
    status: "Paid",
    month: "March",
  },
  {
    name: "Jane Smith",
    role: "HR",
    amount: "₦300,000",
    status: "Pending",
    month: "March",
  },
];

export default function SalaryTable() {
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold">Salary Schedule</h2>

        <button className="px-4 py-2 bg-secondary text-white rounded-lg">
          Export
        </button>
      </div>
<div className="flex gap-4 p-4">
  <select className="input w-48">
    <option>All Months</option>
    <option>January</option>
    <option>February</option>
  </select>

  <select className="input w-48">
    <option>All Status</option>
    <option>Paid</option>
    <option>Pending</option>
  </select>
</div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500 text-sm">
          <tr>
            <th className="p-4">Name</th>
            <th>Role</th>
            <th>Month</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {salaries.map((item, i) => (
            <tr
              key={i}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4 font-medium">{item.name}</td>
              <td>{item.role}</td>
              <td>{item.month}</td>
              <td>{item.amount}</td>

              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "Paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}