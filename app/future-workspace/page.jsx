"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bell, ChevronDown, HelpCircle } from "lucide-react";
import AccountSnapshot from "@/components/workspace/AccountSnapshot";
import ReviewSummaryDrawer from "@/components/workspace/ReviewSummaryDrawer";
import WorkQueue from "@/components/workspace/WorkQueue";
import SubmissionReview from "@/components/workspace/SubmissionReview";
import RiskSignals from "@/components/workspace/RiskSignals";
import DocumentReview from "@/components/workspace/DocumentReview";
import IntentLayer from "@/components/workspace/IntentLayer";
import AuditLog from "@/components/workspace/AuditLog";
import PdfExtractor from "@/components/workspace/PdfExtractor";

import { starterPrompts, docFiles, docReviews } from "@/lib/mockData";

const workspaceSubmissions = [
  {
    id: "SUB-1048",
    company: "Red River Plastics",
    industry: "Manufacturing",
    location: "Tulsa, OK",
    requestedLimit: "$4.2M",
    status: "Pending Review",
    currentCarrier: "State National",
    expiration: "06/15/2025",
    submissionDate: "05/12/2025",
    assignedTo: "Unassigned",
    docs: [
      "Loss history PDF",
      "Property schedule",
      "Broker notes",
      "Prior carrier quote",
    ],
    recommendation:
      "Proceed with conditional review. Request outstanding documentation before binding.",
  },
  {
    id: "SUB-1051",
    company: "Northline Cold Storage",
    industry: "Food logistics",
    location: "Kansas City, MO",
    requestedLimit: "$6.8M",
    status: "Pending Review",
    currentCarrier: "Great Plains Mutual",
    expiration: "07/01/2025",
    submissionDate: "05/15/2025",
    assignedTo: "Unassigned",
    docs: [
      "Loss history PDF",
      "Property schedule",
      "Broker notes",
      "Prior carrier quote",
    ],
    recommendation:
      "Continue review pending updated inspection and refrigeration maintenance documentation.",
  },
  {
    id: "SUB-1052",
    company: "Summit Construction",
    industry: "Construction",
    location: "Denver, CO",
    requestedLimit: "$3.6M",
    status: "Pending Review",
    currentCarrier: "Mountain West Casualty",
    expiration: "07/18/2025",
    submissionDate: "05/18/2025",
    assignedTo: "Unassigned",
    docs: [
      "Loss history PDF",
      "Property schedule",
      "Broker notes",
      "Prior carrier quote",
    ],
    recommendation:
      "Review contractor exposure and confirm prior carrier terms before proceeding.",
  },
  {
    id: "SUB-1053",
    company: "Pioneer Industries",
    industry: "Manufacturing",
    location: "Fort Worth, TX",
    requestedLimit: "$2.1M",
    status: "Pending Review",
    currentCarrier: "Lone Star Risk",
    expiration: "08/05/2025",
    submissionDate: "05/20/2025",
    assignedTo: "Unassigned",
    docs: [
      "Loss history PDF",
      "Property schedule",
      "Broker notes",
      "Prior carrier quote",
    ],
    recommendation:
      "Review property schedule and loss history before issuing terms.",
  },
  {
    id: "SUB-1054",
    company: "Bluewater Logistics",
    industry: "Transportation",
    location: "Memphis, TN",
    requestedLimit: "$5.7M",
    status: "Waiting on Broker",
    currentCarrier: "Riverbend Specialty",
    expiration: "08/22/2025",
    submissionDate: "05/22/2025",
    assignedTo: "Unassigned",
    docs: [
      "Loss history PDF",
      "Property schedule",
      "Broker notes",
      "Prior carrier quote",
    ],
    recommendation:
      "Hold review until broker provides requested follow-up documentation.",
  },
];

function buildAgentResult(prompt, selected) {
  const missingDocs =
    selected.id === "SUB-1048"
      ? ["Current sprinkler inspection", "Water mitigation notes"]
      : ["Updated inspection report", "Refrigeration maintenance log"];

  const tone = prompt.toLowerCase();

  if (tone.includes("missing") || tone.includes("broker")) {
    return {
      mode: "Document follow-up",
      summary: `I found ${missingDocs.length} missing items for ${selected.company}. The highest-friction blocker is ${missingDocs[0].toLowerCase()}.`,
      actions: [
        `Draft broker email requesting ${missingDocs.join(" and ")}`,
        "Attach current document checklist",
        "Mark submission as Waiting on Broker",
      ],
      draft: `Hi, thanks for sending over the ${selected.company} submission. To continue review, could you please send the following items when available?\n\n• ${missingDocs.join("\n• ")}\n\nOnce received, we can complete the risk review and move this toward a quote decision.`,
    };
  }

  if (tone.includes("compare") || tone.includes("similar")) {
    return {
      mode: "Peer comparison",
      summary: `${selected.company} looks moderately above peer risk because of one unresolved exposure, but the account is not an automatic decline.`,
      actions: [
        "Show peer pricing range",
        "Flag unresolved exposure for underwriter approval",
        "Create conditional quote path",
      ],
      draft:
        "Recommended path: continue review with a conditional quote. Price conservatively until the unresolved exposure is cleared. Require updated documentation before binding.",
    };
  }

  return {
    mode: "Risk evaluation",
    summary: `${selected.company} is reviewable, but not clean. The main decision point is whether the missing documentation resolves the highest-risk exposure.`,
    actions: [
      "Summarize risk concerns",
      "Create missing-document request",
      "Prepare conditional approval recommendation",
    ],
    draft: selected.recommendation,
  };
}

function buildDocumentRequest(selected, selectedDoc, activeDocReview) {
  const requestItems = activeDocReview?.requestItems || [
    "Updated documentation",
  ];

  return {
    mode: "Document request",
    summary: `I drafted a broker follow-up for ${selected.company} based on the selected document: ${selectedDoc}.`,
    actions: [
      `Request ${requestItems.join(" and ")}`,
      `Attach source document reference: ${selectedDoc}`,
      "Mark submission as Waiting on Broker",
    ],
    draft: `Hi, thanks for sending over the ${selected.company} submission.\n\nAfter reviewing the ${selectedDoc}, we need a little more information before we can continue the underwriting review.\n\nCould you please send the following when available?\n\n• ${requestItems.join("\n• ")}\n\nOnce we receive those items, we can continue review and move this toward a quote decision.\n\nThank you.`,
  };
}

export default function FutureApplicationAgentWorkspace() {
  const [selectedId, setSelectedId] = useState("SUB-1048");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [prompt, setPrompt] = useState(starterPrompts[0]);
  const [result, setResult] = useState(null);
  const [approved, setApproved] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [submissionStatuses, setSubmissionStatuses] = useState({});
  const [auditEvents, setAuditEvents] = useState([]);

  const selected = useMemo(() => {
    const current =
      workspaceSubmissions.find((item) => item.id === selectedId) ||
      workspaceSubmissions[0];

    return {
      ...current,
      status:
        submissionStatuses[current.id] ||
        (current.status === "New submission"
          ? "Pending Review"
          : current.status),
    };
  }, [selectedId, submissionStatuses]);

  const activeDocReview = selectedDoc ? docReviews[selectedDoc] : null;

  function runAgent(nextPrompt = prompt) {
    setApproved(false);
    setPrompt(nextPrompt);
    setResult(null);

    setTimeout(() => {
      setResult(buildAgentResult(nextPrompt, selected));
    }, 450);
  }

  function requestUpdate() {
    if (!selectedDoc || !activeDocReview) return;

    setApproved(false);
    setResult(null);

    setTimeout(() => {
      setResult(buildDocumentRequest(selected, selectedDoc, activeDocReview));
    }, 300);
  }

  function approveAction() {
    setApproved(true);

    setSubmissionStatuses((current) => ({
      ...current,
      [selected.id]: "Waiting on Broker",
    }));

    setAuditEvents((current) => [
      {
        id: crypto.randomUUID(),
        title: "Action approved",
        description: `${selected.company} moved to Waiting on Broker.`,
        timestamp: new Date().toLocaleString(),
      },
      ...current,
    ]);
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-slate-100 md:p-8">
      <div className="mx-auto w-full max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between px-2 py-2"
        >
          <div>
            <img src="/img/logo.svg" alt="Aegis" className="h-16 w-auto" />
            <p
              className="text-slate-100 uppercase"
              style={{
                fontWeight: "bold",
                fontSize: "6px",
                marginLeft: "56px",
                marginTop: "-15px",
              }}
            >
              Underwriting Intelligence Workspace
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-slate-300 hover:text-white">
              <Bell className="h-7 w-7" />
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </button>

            <button className="text-slate-300 hover:text-white">
              <HelpCircle className="h-7 w-7" />
            </button>

            <button className="flex items-center gap-3 px-4 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
                JS
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-[420px_1fr]">
          <WorkQueue
            title="Submission Queue"
            submissions={workspaceSubmissions}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            setSelectedDoc={setSelectedDoc}
            setResult={setResult}
            setApproved={setApproved}
          />

          <div className="grid gap-4 xl:grid-cols-[1fr_480px]">
            <div className="space-y-4">
              <IntentLayer
                title="Review Actions"
                prompt={prompt}
                setPrompt={setPrompt}
                starterPrompts={starterPrompts}
                runAgent={runAgent}
                result={result}
                approved={approved}
                approveAction={approveAction}
              />

              <AccountSnapshot />

              <RiskSignals selected={selected} />

              <SubmissionReview selected={selected} />
            </div>

            <div className="space-y-4">
              <div>
                <button
                  onClick={() => setSummaryOpen(true)}
                  disabled={!result}
                  className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${
                    result
                      ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                      : "cursor-not-allowed bg-slate-800 text-slate-500"
                  }`}
                >
                  Generate Review Summary →
                </button>
              </div>

              <PdfExtractor title="Document Intelligence" />

              <DocumentReview
                title="Document Review"
                selected={selected}
                selectedDoc={selectedDoc}
                setSelectedDoc={setSelectedDoc}
                activeDocReview={activeDocReview}
                docFiles={docFiles}
                requestUpdate={requestUpdate}
              />

              <AuditLog title="Activity Timeline" auditEvents={auditEvents} />
            </div>
          </div>
        </div>

        <ReviewSummaryDrawer
          open={summaryOpen}
          onClose={() => setSummaryOpen(false)}
          selected={selected}
          result={result}
        />
      </div>
    </div>
  );
}
