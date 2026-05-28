import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return Response.json({ error: "No PDF text provided." }, { status: 400 });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an insurance underwriting assistant. Analyze extracted document text and return concise structured JSON only.",
        },
        {
          role: "user",
          content: `
Analyze this document text.

Return JSON with:
{
  "summary": "...",
  "findings": ["...", "..."],
  "recommendation": "...",
  "riskLevel": "Low | Medium | High",
  "missingItems": ["...", "..."]
}

Document text:
${text}
          `,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    const analysis = JSON.parse(content);

    return Response.json(analysis);
  } catch (error) {
    console.error("Analyze PDF failed:", error);

    return Response.json({ error: "PDF analysis failed." }, { status: 500 });
  }
}
