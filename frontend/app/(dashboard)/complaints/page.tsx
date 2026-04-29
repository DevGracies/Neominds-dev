// complaints page for the HR dashboard
// This file composes a simple complaints list alongside the client-side ComplaintForm.
import ComplaintForm from "../../../components/forms/ComplaintForm";

// Static placeholder data for the demo. Replace with a fetch to
// `/api/v1/complaints` to show real complaints stored by the server.
// Keeping the placeholder makes the UI visible while backend wiring is optional.
// TODO: once you fetch real data, handle loading / error states.
const complaints = [
  { id: 1, employee: "Sarah Jenkins", role: "UI Designer", date: "Apr 12", status: "Pending", text: "Hardware issues with MacBook..." },
  { id: 2, employee: "Michael Chen", role: "Backend Dev", date: "Apr 11", status: "Resolved", text: "Request for workspace stipend..." },
];

export default function ComplaintDashboard() {
  // Layout is a 2-column complaints list + 1-column form for quick submissions.
  // Team notes:
  // - Move `ComplaintForm` to a modal if the page needs to be more compact.
  // - Replace the static `complaints` with SWR/React Query + an API endpoint.
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {/* Page title */}
        <h2 className="text-2xl font-bold text-brand-navy font-display">Employee Complaints</h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Primary column: recent complaints list (placeholder data) */}
        <div className="col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-soft">
            <h3 className="text-lg font-semibold mb-4">Recent Complaints</h3>
            <ul className="space-y-4">
              {complaints.map((c) => (
                <li key={c.id} className="border p-4 rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{c.employee} <span className="text-sm text-gray-500">· {c.role}</span></div>
                      <div className="text-sm text-gray-600 mt-1">{c.text}</div>
                    </div>
                    <div className="text-sm text-gray-500">{c.date}<div className="mt-1">{c.status}</div></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Secondary column: the complaint submission form */}
        <div className="col-span-1">
          {/* The `ComplaintForm` is a client component (uses state). */}
          <ComplaintForm />
        </div>
      </div>
    </div>
  );
}