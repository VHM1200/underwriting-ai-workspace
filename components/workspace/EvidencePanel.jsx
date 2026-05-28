import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, FileSearch } from "lucide-react";

export default function EvidencePanel({
  selected,
  selectedDoc,
  setSelectedDoc,
  activeDocReview,
  docFiles,
  requestUpdate,
  severityClasses,
}) {
  return (
    <Card className="rounded-3xl border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
      <CardContent className="p-5 md:p-6">
        <div className="mb-5 flex items-center gap-2">
          <FileSearch className="h-5 w-5 text-emerald-300" />
          <h2 className="text-lg font-semibold">Submission Review</h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">
                {selected.company}
              </h3>

              <p className="text-sm text-slate-400">
                {selected.industry} • {selected.location}
              </p>
            </div>

            <div className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
              {selected.requestedLimit}
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium text-slate-300">
                Documents found
              </p>

              <div className="space-y-2">
                {selected.docs.map((doc) => (
                  <button
                    key={doc}
                    onClick={() => setSelectedDoc(doc)}
                    className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition ${
                      selectedDoc === doc
                        ? "border-emerald-400 bg-emerald-400/10 text-white"
                        : "border-slate-800 bg-slate-900 text-slate-300 hover:border-emerald-400/60 hover:text-white"
                    }`}
                  >
                    <BadgeCheck className="h-4 w-4 text-emerald-300" />
                    {doc}
                  </button>
                ))}
              </div>

              {selectedDoc && activeDocReview && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 p-4"
                >
                  <p className="mb-1 text-xs uppercase tracking-wide text-emerald-300">
                    Evidence review
                  </p>

                  <h4 className="text-base font-semibold text-white">
                    {selectedDoc}
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {activeDocReview.summary}
                  </p>

                  <div className="mt-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      Key findings
                    </p>

                    <div className="space-y-2">
                      {activeDocReview.findings.map((finding) => (
                        <div
                          key={finding}
                          className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-300"
                        >
                          {finding}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                      Evidence
                    </p>

                    <p className="text-sm text-slate-300">
                      {activeDocReview.evidence}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        window.open(`/docs/${docFiles[selectedDoc]}`, "_blank")
                      }
                      className="rounded-full border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:border-emerald-400 hover:text-white"
                    >
                      Open original
                    </button>

                    <button className="rounded-full border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:border-emerald-400 hover:text-white">
                      Compare previous
                    </button>

                    <button
                      onClick={requestUpdate}
                      className="rounded-full bg-emerald-400 px-3 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-300"
                    >
                      Request update
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-300">
                Signals surfaced
              </p>

              <div className="space-y-2">
                {selected.signals.map((signal) => (
                  <div
                    key={signal.label}
                    className={`rounded-xl border px-3 py-2 text-sm ${severityClasses(
                      signal.severity,
                    )}`}
                  >
                    {signal.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
