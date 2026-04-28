const staff = [
  { name: "John Doe", role: "Manager", status: "Active" },
  { name: "Jane Smith", role: "HR", status: "Inactive" },
];

export default function StaffCards() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {staff.map((person, i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-2xl shadow-soft hover:shadow-lg transition cursor-pointer"
        >
          {/* Avatar */}
          <div className="w-12 h-12 bg-gray-200 rounded-full mb-4" />

          <h3 className="font-semibold">{person.name}</h3>
          <p className="text-gray-500 text-sm">{person.role}</p>

          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-xs ${
              person.status === "Active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {person.status}
          </span>
        </div>
      ))}
    </div>
  );
}