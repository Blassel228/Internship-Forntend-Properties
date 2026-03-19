export default function PersonalDataFooter({ message }: { message?: string }) {
  return (
    <div
      className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md transition-all duration-200"
      style={{
        minHeight: "40px",
        visibility: message ? "visible" : "hidden",
      }}
    >
      {message && <p className="text-red-700 text-sm font-medium">{message}</p>}
    </div>
  );
}
