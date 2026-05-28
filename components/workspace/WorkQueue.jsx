import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ClipboardList, SlidersHorizontal } from "lucide-react";

const queueItems = [
  {
    id: "SUB-1048",
    company: "Red River Plastics",
    industry: "Manufacturing",
    location: "Tulsa, OK",
    requestedLimit: "$4.2M",
    status: "Pending Review",
  },
  {
    id: "SUB-1051",
    company: "Northline Cold Storage",
    industry: "Food logistics",
    location: "Kansas City, MO",
    requestedLimit: "$6.8M",
    status: "Pending Review",
  },
  {
    id: "SUB-1052",
    company: "Summit Construction",
    industry: "Construction",
    location: "Denver, CO",
    requestedLimit: "$3.6M",
    status: "Pending Review",
  },
  {
    id: "SUB-1053",
    company: "Pioneer Industries",
    industry: "Manufacturing",
    location: "Fort Worth, TX",
    requestedLimit: "$2.1M",
    status: "Pending Review",
  },
  {
    id: "SUB-1054",
    company: "Bluewater Logistics",
    industry: "Transportation",
    location: "Memphis, TN",
    requestedLimit: "$5.7M",
    status: "Waiting on Broker",
  },
];

function statusClass(status) {
  if (status === "Waiting on Broker") return "text-amber-400";
  return "text-emerald-400";
}

function filterButtonClass(isActive) {
  return isActive
    ? "border-slate-700 bg-slate-800 text-white"
    : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700";
}

export default function WorkQueue({
  selectedId,
  setSelectedId,
  setSelectedDoc,
  setResult,
  setApproved,
  setDetailsOpen,
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return queueItems;

    return queueItems.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

  const pendingCount = queueItems.filter(
    (item) => item.status === "Pending Review",
  ).length;

  const waitingCount = queueItems.filter(
    (item) => item.status === "Waiting on Broker",
  ).length;

  return (
    <Card className="rounded-3xl border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
      <CardContent className="p-5">
        <div className="mb-5 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-emerald-300" />
          <h2 className="text-lg font-semibold">Submission Queue</h2>
        </div>

        <div className="mb-5 flex items-center gap-1.5">
          <button
            onClick={() => setActiveFilter("All")}
            className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-medium ${filterButtonClass(
              activeFilter === "All",
            )}`}
          >
            All
          </button>

          <button
            onClick={() => setActiveFilter("Pending Review")}
            className={`flex shrink items-center gap-1.5 rounded-xl border px-3 py-2 text-xs ${filterButtonClass(
              activeFilter === "Pending Review",
            )}`}
          >
            Pending Review
            <span className="rounded-full bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-200">
              {pendingCount}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter("Waiting on Broker")}
            className={`flex shrink items-center gap-1.5 rounded-xl border px-3 py-2 text-[11px] leading-none ${filterButtonClass(
              activeFilter === "Waiting on Broker",
            )}`}
          >
            Waiting on Broker
            <span className="rounded-full bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-200">
              {waitingCount}
            </span>
          </button>

          <button className="ml-auto shrink-0 rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-300 hover:border-emerald-400/70 hover:text-emerald-300">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedId(item.id);
                setSelectedDoc(null);
                setResult(null);
                setApproved(false);
              }}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                selectedId === item.id
                  ? "border-emerald-400 bg-emerald-400/10"
                  : "border-slate-800 bg-slate-950 hover:border-slate-700"
              }`}
            >
              <div className="mb-0.2 flex items-center justify-between gap-3">
                <span className="text-base font-semibold text-white">
                  {item.company}
                </span>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(item.id);
                    setDetailsOpen(true);
                  }}
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer text-xs text-slate-400 transition hover:text-emerald-300"
                >
                  {item.id}
                </span>
              </div>

              <p className="-mt-1 text-xs leading-[1.8] text-slate-400">
                {item.industry} • {item.location}
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-sm text-slate-300">
                  Requested limit: {item.requestedLimit}
                </p>

                <span
                  className={`text-xs font-semibold ${statusClass(
                    item.status,
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            </button>
          ))}

          {filteredItems.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-500">
              No submissions match this filter.
            </div>
          )}

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-4 text-sm font-medium text-slate-200 hover:border-slate-700">
            Load more
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
