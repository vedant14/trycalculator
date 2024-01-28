export function Card({ children }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="mx-8 my-12">{children}</div>
    </div>
  );
}
