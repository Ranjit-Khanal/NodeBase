import { inngest } from "./client";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const model = google("gemini-2.5-flash");

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("gemeni-generate-text", generateText, {
      model: model,
      prompt: "Generte a poem for me",
    });
    return steps;
  },
);
