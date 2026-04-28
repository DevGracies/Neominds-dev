export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
      {children}
    </button>
  );
}