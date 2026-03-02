import Groq from "groq-sdk";
import CHATBOT_CONTEXT from "./chatbot";
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const SYSTEM_PROMPT = `
You are the official AI assistant for the symposium website.
Answer only symposium-related questions such as events, venue, prize pool, coordinators, and contacts.
If a question is unrelated, politely decline.
`;

const FINAL_SYSTEM_PROMPT = `${SYSTEM_PROMPT}\n\nSymposium context:\n${CHATBOT_CONTEXT}`;

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages?: IncomingMessage[] };

    const safeMessages = Array.isArray(messages) ? messages : [];

    const completion = await groq.chat.completions.create({
      model: "moonshotai/kimi-k2-instruct-0905",
      messages: [{ role: "system", content: FINAL_SYSTEM_PROMPT }, ...safeMessages],
    });

    return Response.json({
      reply: completion.choices[0]?.message?.content ?? "",
    });
  } catch (error: unknown) {
    const maybeError = error as {
      status?: number;
      message?: string;
      error?: { message?: string };
    };
    const status =
      typeof maybeError?.status === "number" && maybeError.status >= 400
        ? maybeError.status
        : 500;
    const message =
      maybeError?.error?.message ??
      maybeError?.message ??
      "Failed to generate response";

    console.error("Groq chat error:", {
      status,
      message,
    });

    return Response.json(
      { error: message },
      { status }
    );
  }
}
