const staff = [
  { name: "John Doe", role: "Manager", status: "Active" },
  { name: "Jane Smith", role: "HR", status: "Inactive" },
];

export default function StaffTable() {
  return (
    <div className="bg-white rounded-xl shadow-soft overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500 text-sm">
          <tr>
            <th className="p-4">Name</th>
            <th>Role</th>
            <th>Status</th>
            <th className="text-right pr-6">Action</th>
          </tr>
        </thead>
    
        <tbody>
          {staff.map((person, i) => (
            <tr
              key={i}
              className="border-t hover:bg-gray-50 transition cursor-pointer"
            >
              <td className="p-4 font-medium">{person.name}</td>
              <td>{person.role}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    person.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {person.status}
                </span>
              </td>

              <td className="text-right pr-6">
                <button className="text-secondary">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}