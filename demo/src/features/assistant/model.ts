/**
 * Stand-in for an LLM call. Returns *raw, untyped* output on purpose — exactly
 * what you get back from a model API before you validate it. The parsing and
 * validation happens in `api.ts` (see the Zod boundary there).
 *
 * Swap this function for a real `fetch` to your model endpoint and nothing else
 * in the feature has to change.
 */
export function generatePlan(prompt: string): unknown {
  const clean = prompt.trim() || 'the feature';
  return {
    summary: `Suggested a 5-step plan for "${clean}", roughly 4 hours of work.`,
    subtasks: [
      { title: `Break down requirements for "${clean}"`, estimateMinutes: 30 },
      { title: 'Design the component API and state shape', estimateMinutes: 45 },
      { title: 'Implement the happy path', estimateMinutes: 90 },
      { title: 'Add validation and error states', estimateMinutes: 40 },
      { title: 'Write tests and update docs', estimateMinutes: 35 },
    ],
  };
}
