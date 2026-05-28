import React from "react";
import { ShieldCheck } from "lucide-react";

const signals = [
  {
    severity: "High",
    signal: "Sprinkler inspection missing",
    source: "Inspection Docs",
    action: "Request Document",
  },
  {
    severity: "High",
    signal: "3 prior water-loss claims",
    source: "Loss History",
    action: "Review Details",
  },
  {
    severity: "Medium",
    signal: "Similar accounts priced 8–12% higher",
    source: "Market Intelligence",
    action: "Review Pricing",
  },
  {
    severity: "Low",
    signal: "Roof replacement documented",
    source: "Broker Notes",
    action: "No Action Needed",
  },
];

function severityClass(severity) {
  if (severity === "High") return "bg-red-500/15 text-red-300";
  if (severity === "Medium") return "bg-amber-500/15 text-amber-300";
  return "bg-emerald-500/15 text-emerald-300";
}

export default function RiskSignals() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 shadow-xl">
      <div className="flex items-center gap-3 border-b border-slate-700/70 px-5 py-4">
        <ShieldCheck className="h-5 w-5 text-emerald-400" />
        <h2 className="text-lg font-semibold text-slate-100">Risk Signals</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3">Severity</th>
              <th className="px-5 py-3">Signal</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {signals.map((item) => (
              <tr key={item.signal} className="text-slate-200">
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${severityClass(
                      item.severity,
                    )}`}
                  >
                    {item.severity}
                  </span>
                </td>

                <td className="px-5 py-4">{item.signal}</td>
                <td className="px-5 py-4 text-slate-300">{item.source}</td>
                <td className="px-5 py-4">
                  <button className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:border-emerald-400/70 hover:text-emerald-300">
                    {item.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

