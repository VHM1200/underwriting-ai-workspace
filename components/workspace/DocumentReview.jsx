import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, MoreVertical } from "lucide-react";

const documentMeta = {
  "Loss history PDF": {
    file: "loss_history.pdf",
    status: "reviewed",
    group: "all",
  },
  "Property schedule": {
    file: "property_schedule.pdf",
    status: "reviewed",
    group: "all",
  },
  "Broker notes": {
    file: "broker_notes.pdf",
    status: "reviewed",
    group: "all",
  },
  "Prior carrier quote": {
    file: "prior_carrier_quote.pdf",
    status: "reviewed",
    group: "requested",
  },
  "Current sprinkler inspection": {
    file: "sprinkler_inspection.pdf",
    status: "missing",
    group: "missing",
  },
  "Water mitigation notes": {
    file: "water_mitigation_notes.pdf",
    status: "requested",
    group: "requested",
  },
};

function statusLabel(status) {
  if (status === "missing") return "Missing";
  if (status === "requested") return "Requested";
  return "Reviewed";
}

function statusClass(status) {
  if (status === "missing") return "text-red-300";
  if (status === "requested") return "text-amber-300";
  return "text-emerald-300";
}
function countBadgeClass(tabId) {
  if (tabId === "missing") return "bg-red-400/15 text-red-300";
  if (tabId === "requested") return "bg-amber-400/15 text-amber-300";
  return "bg-slate-800 text-slate-400";
}

export default function DocumentReview({
  selected,
  selectedDoc,
  setSelectedDoc,
  activeDocReview,
  docFiles,
  requestUpdate,
}) {
  const [activeTab, setActiveTab] = useState("all");

  const documents = useMemo(() => {
    const baseDocs = selected.docs || [];

    const missingDocs = [
      "Current sprinkler inspection",
      "Water mitigation notes",
    ];

    const allDocs = [...baseDocs, ...missingDocs];

    if (activeTab === "all") return baseDocs;

    return allDocs.filter((doc) => documentMeta[doc]?.group === activeTab);
  }, [selected.docs, activeTab]);

  const tabs = [
    { id: "all", label: "All Documents", count: selected.docs?.length || 0 },
    { id: "missing", label: "Missing", count: 2 },
    { id: "requested", label: "Requested", count: 2 },
  ];

  return (
    <Card className="rounded-3xl border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
      <CardContent className="p-5 md:p-6">
        <div className="mb-5 flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-300" />
          <h2 className="text-lg font-semibold">Document Review</h2>
        </div>

        <div className="mb-4 flex gap-6 border-b border-slate-800 pb-3 text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 ${
                activeTab === tab.id
                  ? tab.id === "missing"
                    ? "text-red-300"
                    : "text-emerald-300"
                  : "text-slate-400"
              }`}
            >
              <span>{tab.label}</span>

              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  tab.id === "missing"
                    ? "bg-red-400/15 text-red-300"
                    : tab.id === "requested"
                      ? "bg-amber-400/15 text-amber-300"
                      : "bg-slate-800 text-slate-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="divide-y divide-slate-800 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          {documents.map((doc) => {
            const meta = documentMeta[doc] || {
              file: docFiles?.[doc] || "uploaded_document.pdf",
              status: "reviewed",
              group: "all",
            };

            return (
              <button
                key={doc}
                onClick={() => setSelectedDoc(doc)}
                className={`flex w-full items-center justify-between gap-3 p-4 text-left transition ${
                  selectedDoc === doc
                    ? "bg-emerald-400/10"
                    : "hover:bg-slate-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 h-5 w-5 text-slate-400" />

                  <div>
                    <p className="text-sm font-medium text-white">{doc}</p>
                    <p className="text-xs text-slate-500">{meta.file}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs ${statusClass(meta.status)}`}>
                    {statusLabel(meta.status)}
                  </span>
                  <MoreVertical className="h-4 w-4 text-slate-500" />
                </div>
              </button>
            );
          })}

          {documents.length === 0 && (
            <div className="p-4 text-sm text-slate-500">
              No documents in this category.
            </div>
          )}
        </div>

        {selectedDoc && activeDocReview && (
          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <p className="mb-1 text-xs uppercase tracking-wide text-emerald-300">
              Selected Document
            </p>

            <h3 className="text-base font-semibold text-white">
              {selectedDoc}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {activeDocReview.summary}
            </p>

            <div className="mt-4 space-y-2">
              {activeDocReview.findings.map((finding) => (
                <div
                  key={finding}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300"
                >
                  {finding}
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  window.open(`/docs/${docFiles[selectedDoc]}`, "_blank")
                }
                className="rounded-full border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:border-emerald-400 hover:text-white"
              >
                View Source Document
              </button>

              <button
                onClick={requestUpdate}
                className="rounded-full bg-emerald-400 px-3 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-300"
              >
                Request Documentation
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
