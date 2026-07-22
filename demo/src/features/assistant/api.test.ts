import { describe, it, expect, vi, afterEach } from 'vitest';
import { askAssistant } from './api';
import * as model from './model';

describe('askAssistant', () => {
  afterEach(() => vi.restoreAllMocks());

  it('parses a well-formed structured response', async () => {
    vi.spyOn(model, 'generatePlan').mockReturnValue({
      summary: 'A plan',
      subtasks: [{ title: 'Do the thing', estimateMinutes: 30 }],
    });

    const result = await askAssistant('build a page');
    expect(result.summary).toBe('A plan');
    expect(result.subtasks).toHaveLength(1);
  });

  it('rejects a malformed model output (negative estimate)', async () => {
    vi.spyOn(model, 'generatePlan').mockReturnValue({
      summary: 'A plan',
      subtasks: [{ title: 'Bad', estimateMinutes: -5 }],
    });

    await expect(askAssistant('build a page')).rejects.toThrow();
  });
});
