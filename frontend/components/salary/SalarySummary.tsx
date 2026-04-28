export default function SalarySummary() {
  const stats = [
    { title: "Total Payroll", value: "₦12,400,000" },
    { title: "Paid", value: "₦10,000,000" },
    { title: "Pending", value: "₦2,400,000" },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white p-6 rounded-2xl shadow-soft"
        >
          <p className="text-gray-500">{item.title}</p>
          <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
        </div>
      ))}
    </div>
  );
}