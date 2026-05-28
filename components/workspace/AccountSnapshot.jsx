import { BriefcaseBusiness, CalendarDays, Users } from "lucide-react";

export default function AccountSnapshot() {
  return (
    <section className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-5 shadow-xl">
      <h3 className="mb-5 text-base font-semibold text-slate-100">
        Account Snapshot
      </h3>

      <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-slate-700/70 bg-slate-950/50">
        <div className="min-w-0 border-r border-slate-800 p-5">
          <div className="mb-4 flex items-center gap-3">
            <BriefcaseBusiness className="h-5 w-5 shrink-0 text-emerald-400" />
            <div className="text-sm font-medium text-slate-400">Revenue</div>
          </div>

          <div className="text-[34px] font-semibold leading-none tracking-tight text-slate-100">
            $28.4M
          </div>

          <div className="mt-3 whitespace-nowrap text-xs text-slate-400">
            +12% vs prior year
          </div>
        </div>

        <div className="min-w-0 border-r border-slate-800 p-5">
          <div className="mb-4 flex items-center gap-3">
            <Users className="h-5 w-5 shrink-0 text-emerald-400" />
            <div className="text-sm font-medium text-slate-400">Employees</div>
          </div>

          <div className="text-[34px] font-semibold leading-none tracking-tight text-slate-100">
            142
          </div>

          <div className="mt-3 whitespace-nowrap text-xs text-slate-400">
            +5 vs prior year
          </div>
        </div>

        <div className="min-w-0 p-5">
          <div className="mb-4 flex items-center gap-3">
            <CalendarDays className="h-5 w-5 shrink-0 text-emerald-400" />
            <div className="text-sm font-medium text-slate-400">Years</div>
          </div>

          <div className="text-[34px] font-semibold leading-none tracking-tight text-slate-100">
            18
          </div>

          <div className="mt-3 whitespace-nowrap text-xs text-slate-400">
            Since 2007
          </div>
        </div>
      </div>
    </section>
  );
}
