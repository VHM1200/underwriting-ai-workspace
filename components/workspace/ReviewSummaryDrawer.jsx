import { X, FileCheck2 } from "lucide-react";

export default function ReviewSummaryDrawer({
  open,
  onClose,
  selected,
  result,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close review summary overlay"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-2xl border-l border-slate-800 bg-slate-950 p-6 text-slate-100 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-emerald-300">
              <FileCheck2 className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Final Review Artifact
              </span>
            </div>

            <h2 className="text-2xl font-semibold">Review Summary</h2>
            <p className="mt-1 text-sm text-slate-400">
              {selected.company} · {selected.industry} · {selected.location}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="mb-2 text-sm font-semibold text-emerald-300">
              Overall Assessment
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              {result?.summary ||
                `${selected.company} is reviewable, with final decision dependent on document completeness and unresolved risk signals.`}
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="mb-3 text-sm font-semibold text-emerald-300">
              Key Risks
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Missing sprinkler inspection documentation</li>
              <li>• Prior water-loss claim pattern requires review</li>
              <li>• Pricing may need adjustment against comparable accounts</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="mb-3 text-sm font-semibold text-emerald-300">
              Recommendation
            </h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Proceed with conditional review. Request outstanding documentation
              before binding and apply conservative pricing until unresolved
              exposures are cleared.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="mb-3 text-sm font-semibold text-emerald-300">
              Broker Draft
            </h3>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
              {result?.draft ||
                `Hi, thanks for sending over the ${selected.company} submission.\n\nTo continue review, please provide the current sprinkler inspection and any water mitigation notes related to prior claims.\n\nOnce received, we can complete the risk review and move this toward a quote decision.`}
            </p>
          </section>

          <div className="flex gap-3 pt-2">
            <button className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-300">
              Save Summary
            </button>

            <button className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 hover:border-emerald-400 hover:text-white">
              Export PDF
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
