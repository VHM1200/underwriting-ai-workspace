import React from "react";
import {
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  User,
  Users,
} from "lucide-react";

export default function SubmissionReview({ selected }) {
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
    <section className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-xl">
      <div className="mb-5 flex items-center gap-3">
        <FileText className="h-5 w-5 text-emerald-400" />
        <h2 className="text-lg font-semibold text-slate-100">
          Submission Review
        </h2>
      </div>

      <div>
        <div className="overflow-hidden rounded-xl border border-slate-700/70">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="grid grid-cols-[180px_1fr] border-b border-slate-800 px-4 py-2 last:border-b-0"
            >
              <div className="text-sm text-slate-400">{label}</div>
              <div className="text-sm font-medium text-slate-100">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
