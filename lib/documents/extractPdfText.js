export async function extractPdfText(url) {
  try {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/legacy/build/pdf.worker.mjs",
      import.meta.url,
    ).toString();

    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;

    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");
      text += `\n${pageText}`;
    }

    return text.trim();
  } catch (error) {
    console.error("PDF extraction failed:", error);
    return "Unable to extract PDF text.";
  }
}
