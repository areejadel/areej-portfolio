import { z } from 'zod';
import { generatePlan } from './model';
import type { AssistantResponse } from './types';

// Validate the model's structured output at the boundary — never trust it blindly.
const assistantResponseSchema = z.object({
  summary: z.string(),
  subtasks: z
    .array(
      z.object({
        title: z.string(),
        estimateMinutes: z.number().int().positive(),
      }),
    )
    .max(10),
});

const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export async function askAssistant(prompt: string): Promise<AssistantResponse> {
  await wait();
  const raw = generatePlan(prompt);
  // Throws if the model returned something that doesn't match the contract.
  return assistantResponseSchema.parse(raw);
}
