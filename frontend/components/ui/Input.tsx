export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-secondary outline-none"
    />
  );
}