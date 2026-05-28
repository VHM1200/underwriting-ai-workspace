import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  FileSearch,
} from "lucide-react";

const actionIcons = [FileSearch, BriefcaseBusiness, BarChart3];

export default function IntentLayer({
  prompt,
  setPrompt,
  starterPrompts,
  runAgent,
  result,
  approved,
  approveAction,
}) {
  return (
    <Card className="rounded-3xl border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
      <CardContent className="p-5 md:p-6">
        <div className="mb-6 flex items-center gap-2">
          <BriefcaseBusiness className="h-5 w-5 text-emerald-300" />
          <h2 className="text-lg font-semibold">Review Actions</h2>
        </div>

        <div className="mb-6 rounded-2xl border border-emerald-400/70 bg-slate-950 px-6 py-5">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-transparent text-base text-slate-100 outline-none placeholder:text-slate-500"
            placeholder="Evaluate the newest submission and tell me what matters."
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="grid flex-1 grid-cols-3 gap-3">
            {starterPrompts.map((item, index) => {
              const Icon = actionIcons[index] || FileSearch;
              const isSelected = prompt === item;

              return (
                <button
                  key={item}
                  onClick={() => setPrompt(item)}
                  className={`flex min-h-[72px] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-emerald-400/70 bg-emerald-400/10"
                      : "border-slate-800 bg-slate-950/70 hover:border-slate-700"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0 text-slate-200" />

                  <span className="text-xs font-medium leading-snug text-slate-100">
                    {item}
                  </span>
                </button>
              );
            })}
          </div>

          <Button
            onClick={() => runAgent()}
            className="flex h-[48px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-emerald-400 px-7 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
          >
            Generate Review
            <ArrowRight className="h-5 w-5 shrink-0" />
          </Button>
        </div>

        {result && (
          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-300">
                  {result.mode}
                </p>

                <h3 className="mt-1 text-base font-semibold text-slate-100">
                  Review Response
                </h3>
              </div>

              {approved && (
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                  Approved
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed text-slate-300">
              {result.summary}
            </p>

            <div className="mt-4 space-y-2">
              {result.actions?.map((action) => (
                <div
                  key={action}
                  className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300"
                >
                  {action}
                </div>
              ))}
            </div>

            {result.draft && (
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Draft
                </p>

                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
                  {result.draft}
                </p>
              </div>
            )}

            <button
              onClick={approveAction}
              className="mt-4 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300"
            >
              Approve Action
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
