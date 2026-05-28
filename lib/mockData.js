export const submissions = [
  {
    id: "SUB-1048",
    company: "Red River Plastics",
    industry: "Manufacturing",
    location: "Tulsa, OK",
    requestedLimit: "$4.2M",
    status: "New submission",
    docs: [
      "Loss history PDF",
      "Property schedule",
      "Broker notes",
      "Prior carrier quote",
    ],
    signals: [
      { label: "3 prior water-loss claims", severity: "high" },
      { label: "Sprinkler inspection missing", severity: "high" },
      { label: "Roof replacement documented in 2023", severity: "positive" },
      { label: "Similar accounts priced 8–12% higher", severity: "medium" },
    ],
    recommendation:
      "Proceed with conditional approval pending sprinkler inspection and updated mitigation notes.",
  },
  {
    id: "SUB-1051",
    company: "Northline Cold Storage",
    industry: "Food logistics",
    location: "Kansas City, MO",
    requestedLimit: "$6.8M",
    status: "Needs review",
    docs: [
      "Property schedule",
      "Equipment list",
      "Claims export",
      "Inspection summary",
    ],
    signals: [
      { label: "Ammonia refrigeration exposure", severity: "high" },
      { label: "Backup generator coverage verified", severity: "positive" },
      { label: "Claims frequency below peer average", severity: "positive" },
      { label: "Inspection report older than 18 months", severity: "medium" },
    ],
    recommendation:
      "Request updated inspection before quote. If acceptable, price within standard risk band.",
  },
];

export const starterPrompts = [
  "Evaluate the newest submission and tell me what matters.",
  "Find missing documents and draft a broker follow-up.",
  "Compare this account to similar risks and recommend next steps.",
];

export const docFiles = {
  "Loss history PDF": "loss_history.pdf",
  "Property schedule": "property_schedule.pdf",
  "Broker notes": "broker_notes.pdf",
  "Prior carrier quote": "prior_carrier_quote.pdf",
  "Equipment list": "property_schedule.pdf",
  "Claims export": "loss_history.pdf",
  "Inspection summary": "inspection_summary.pdf",
};

export const docReviews = {
  "Loss history PDF": {
    summary:
      "Three prior water-loss claims were found. Claim frequency is higher than peer average and may require mitigation review.",
    findings: [
      "Water loss reported in 2021, 2022, and 2024",
      "No open claims currently active",
      "Mitigation notes are incomplete",
    ],
    evidence:
      "Claims history shows repeated water-related losses across multiple policy periods.",
    requestItems: ["Water mitigation notes", "Updated loss-control response"],
  },
  "Property schedule": {
    summary:
      "Property values and locations are present. No major schedule gaps found.",
    findings: [
      "Primary location listed",
      "Replacement values included",
      "Occupancy type is consistent with submission",
    ],
    evidence:
      "Property schedule includes location, occupancy, and reported values.",
    requestItems: ["Confirmed replacement values", "Updated location schedule"],
  },
  "Broker notes": {
    summary:
      "Broker notes confirm recent operational changes but do not include enough mitigation detail.",
    findings: [
      "Recent roof replacement mentioned",
      "Water mitigation details missing",
      "Follow-up needed before approval",
    ],
    evidence:
      "Broker notes reference improvements but do not attach supporting inspection detail.",
    requestItems: ["Water mitigation details", "Supporting roof documentation"],
  },
  "Prior carrier quote": {
    summary:
      "Prior quote is usable for comparison. Similar accounts appear priced higher.",
    findings: [
      "Prior premium available",
      "Coverage limits are comparable",
      "Pricing may be below current peer range",
    ],
    evidence:
      "Prior carrier quote gives a baseline but does not resolve current risk concerns.",
    requestItems: [
      "Current quote assumptions",
      "Prior carrier loss-control notes",
    ],
  },
  "Equipment list": {
    summary:
      "Equipment list confirms refrigeration and backup generator assets.",
    findings: [
      "Ammonia refrigeration equipment listed",
      "Backup generator included",
      "Maintenance record not attached",
    ],
    evidence:
      "Equipment schedule includes refrigeration systems and backup power equipment.",
    requestItems: ["Refrigeration maintenance log", "Generator service record"],
  },
  "Claims export": {
    summary: "Claims frequency is below peer average for this account type.",
    findings: [
      "No major claims in current review window",
      "Loss trend appears stable",
      "Claims history supports continued review",
    ],
    evidence:
      "Exported claims data shows lower-than-average frequency against similar accounts.",
    requestItems: ["Complete claims run", "Open-claims confirmation"],
  },
  "Inspection summary": {
    summary:
      "Inspection is useful, but it is older than 18 months and should be updated before quote.",
    findings: [
      "Ammonia refrigeration exposure confirmed",
      "Backup generator coverage verified",
      "Inspection age creates uncertainty",
    ],
    evidence:
      "Inspection summary confirms key controls but is no longer current enough for final approval.",
    requestItems: [
      "Updated inspection report",
      "Refrigeration maintenance log",
    ],
  },
};
