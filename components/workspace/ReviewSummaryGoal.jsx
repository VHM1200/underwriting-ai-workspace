import { CheckCircle2, Circle, FileCheck2, ArrowRight } from "lucide-react";

export default function ReviewSummaryGoal({ result, onGenerate }) {
  const isReady = Boolean(result);

  const steps = [
    { label: "Submission selected", complete: true },
    { label: "Documents reviewed", complete: true },
    { label: "Signals evaluated", complete: true },
    { label: "Summary generated", complete: isReady },
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 text-slate-100 shadow-2xl">
      <div className="mb-4 flex items-center gap-3">
        <FileCheck2 className="h-5 w-5 text-emerald-300" />
        <div>
          <h2 className="text-lg font-semibold">Review Summary</h2>
          <p className="mt-1 text-xs text-slate-400">
            {isReady ? "Ready to review" : "In progress · 3/4 complete"}
          </p>
        </div>
      </div>

      <div className="mb-5 space-y-2">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-2 text-sm">
            {step.complete ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <Circle className="h-4 w-4 text-slate-500" />
            )}

            <span
              className={step.complete ? "text-slate-200" : "text-slate-500"}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onGenerate}
        className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${
          isReady
            ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
        }`}
      >
        {isReady ? "View Review Summary" : "Generate Review Summary"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
