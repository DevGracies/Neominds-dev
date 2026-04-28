export default function Filters() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-soft flex flex-wrap gap-4 items-center">
      {/* Search */}
      <input
        placeholder="Search staff..."
        className="input w-64"
      />

      {/* Role */}
      <select className="input w-48">
        <option>All Roles</option>
        <option>Manager</option>
        <option>Staff</option>
      </select>

      {/* Status */}
      <select className="input w-48">
        <option>All Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>

      {/* Branch */}
      <select className="input w-48">
        <option>All Branches</option>
        <option>Lagos</option>
        <option>Abuja</option>
      </select>
    </div>
  );
}