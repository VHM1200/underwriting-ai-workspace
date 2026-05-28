import { X, FileText } from "lucide-react";

export default function SubmissionDetailsDrawer({ open, onClose, selected }) {
  if (!open || !selected) return null;

  const rows = [
    ["Company", selected.company],
    ["Submission ID", selected.id],
    ["Industry", selected.industry],
    ["Location", selected.location],
    ["Requested Limit", selected.requestedLimit],
    ["Current Carrier", selected.currentCarrier || "State National"],
    ["Expiration", selected.expiration || "06/15/2025"],
    ["Submission Date", selected.submissionDate || "05/12/2025"],
    [
      "Status",
      selected.status === "New submission" ? "Pending Review" : selected.status,
    ],
    ["Assigned To", selected.assignedTo || "Unassigned"],
  ];

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close submission details"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-xl border-l border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-emerald-300">
              <FileText className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Submission Details
              </span>
            </div>

            <h2 className="text-2xl font-semibold">{selected.company}</h2>
            <p className="mt-1 text-sm text-slate-400">
              {selected.industry} · {selected.location}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[180px_1fr] border-b border-slate-800 px-4 py-3 last:border-b-0"
            >
              <div className="text-sm text-slate-400">{label}</div>
              <div className="text-sm font-medium text-slate-100">{value}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
