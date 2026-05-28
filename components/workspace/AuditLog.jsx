import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function AuditLog({ auditEvents }) {
  return (
    <Card className="rounded-3xl border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
      <CardContent className="p-5 md:p-6">
        <div className="mb-5 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
          <h2 className="text-lg font-semibold">Activity Timeline</h2>
        </div>

        {auditEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-5 text-sm text-slate-400">
            No review actions completed yet.
          </div>
        ) : (
          <div className="space-y-3">
            {auditEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm"
              >
                <p className="font-medium text-white">{event.title}</p>
                <p className="mt-1 text-slate-400">{event.description}</p>
                <p className="mt-2 text-xs text-slate-500">{event.timestamp}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
