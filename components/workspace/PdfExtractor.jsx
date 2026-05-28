"use client";

import { useState } from "react";
import { extractPdfText } from "@/lib/documents/extractPdfText";

export default function PdfExtractor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  async function handleExtract() {
    if (!selectedFile) return;

    setLoading(true);
    setAnalysis(null);

    const fileUrl = URL.createObjectURL(selectedFile);
    const text = await extractPdfText(fileUrl);

    const response = await fetch("/api/analyze-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const result = await response.json();

    setAnalysis(result);
    setLoading(false);

    URL.revokeObjectURL(fileUrl);
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 text-slate-100">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Document Intelligence</h2>

        <p className="mt-1 text-sm text-slate-400">
          Upload submission documents and generate AI-assisted review insights.
        </p>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <label className="block cursor-pointer rounded-xl border border-dashed border-slate-700 bg-slate-900 px-4 py-5 text-center hover:border-emerald-400">
          <span className="block text-sm font-medium text-white">
            {selectedFile ? selectedFile.name : "Choose Document"}
          </span>

          <span className="mt-1 block text-xs text-slate-400">
            {selectedFile ? "Ready for review" : "PDF submission documents"}
          </span>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              setSelectedFile(e.target.files?.[0] || null);
              setAnalysis(null);
            }}
            className="hidden"
          />
        </label>

        <button
          onClick={handleExtract}
          disabled={!selectedFile || loading}
          className={`mt-4 w-full rounded-full px-4 py-3 text-sm font-medium ${
            !selectedFile || loading
              ? "cursor-not-allowed bg-slate-700 text-slate-400"
              : "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
          }`}
        >
          {loading ? "Analyzing Document..." : "Generate Review"}
        </button>
      </div>

      {!analysis && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
          No document review yet.
        </div>
      )}

      {analysis && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <p className="mb-2 text-sm font-semibold text-emerald-300">
              Summary
            </p>

            <p className="text-sm text-slate-300">{analysis.summary}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <p className="mb-2 text-sm font-semibold text-emerald-300">
              Risk Assessment
            </p>

            <p className="text-sm text-slate-300">{analysis.riskLevel}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <p className="mb-2 text-sm font-semibold text-emerald-300">
              Review Findings
            </p>

            <div className="space-y-2">
              {analysis.findings?.map((finding) => (
                <div
                  key={finding}
                  className="rounded-xl border border-slate-800 p-3 text-sm text-slate-300"
                >
                  {finding}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <p className="mb-2 text-sm font-semibold text-emerald-300">
              Recommendation
            </p>

            <p className="text-sm text-slate-300">{analysis.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
