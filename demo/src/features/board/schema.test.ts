import { describe, it, expect } from 'vitest';
import { newTaskSchema } from './schema';

describe('newTaskSchema', () => {
  it('accepts a valid task', () => {
    const result = newTaskSchema.safeParse({ title: 'Ship the demo', priority: 'high' });
    expect(result.success).toBe(true);
  });

  it('rejects a title that is too short and returns the i18n key', () => {
    const result = newTaskSchema.safeParse({ title: 'ab', priority: 'low' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('form.errors.titleMin');
    }
  });

  it('rejects an invalid priority', () => {
    const result = newTaskSchema.safeParse({ title: 'Valid title', priority: 'urgent' });
    expect(result.success).toBe(false);
  });

  it('trims whitespace before validating', () => {
    const result = newTaskSchema.safeParse({ title: '   hello   ', priority: 'medium' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.title).toBe('hello');
  });
});
