export default function Dialog({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-lg rounded-xl bg-card p-6 border border-border shadow-xl">
        {/* header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-primary text-2xl font-semibold text-right flex-1">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="اغلاق"
            className="ml-3 rounded-md px-3 py-1 text-secondary hover:bg-accent transition duration-300 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
