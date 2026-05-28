import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Send,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function AgentOutput({ result, approved, setApproved }) {
  return (
    <Card className="rounded-3xl border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
      <CardContent className="p-5 md:p-6">
        <div className="mb-5 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-300" />
          <h2 className="text-lg font-semibold">Review Summary</h2>
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-6 text-center text-slate-400"
            >
              <RefreshCw className="mx-auto mb-3 h-8 w-8 text-slate-600" />
              Generate a review or request additional documentation.
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
                <p className="mb-1 text-sm text-emerald-200">{result.mode}</p>
                <p className="text-white">{result.summary}</p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-300">
                  Recommended Actions
                </p>

                <div className="space-y-2">
                  {result.actions.map((action) => (
                    <div
                      key={action}
                      className="flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-300"
                    >
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                      {action}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-300">
                  Draft Recommendation
                </p>

                <pre className="whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm leading-relaxed text-slate-300">
                  {result.draft}
                </pre>
              </div>

              <Button
                onClick={() => setApproved(true)}
                className="w-full rounded-full bg-emerald-400 text-slate-950 hover:bg-emerald-300"
              >
                <Send className="mr-2 h-4 w-4" />
                Approve Recommendation
              </Button>

              {approved && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm text-emerald-100"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Recommendation approved. Status updated and next step queued.
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
