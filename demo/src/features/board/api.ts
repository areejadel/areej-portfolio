import { db } from '../../mocks/data';
import type { Priority, Status, Task } from './types';

/**
 * Data-access layer for the board.
 *
 * This demo ships an in-memory implementation so it runs fully client-side on
 * GitHub Pages with no backend. In a real project the same `boardApi` interface
 * is backed by a REST API (fetch) and covered with MSW integration tests — the
 * UI and hooks never change, only this module.
 */
const NETWORK_DELAY = 250;
const wait = (ms = NETWORK_DELAY) => new Promise((r) => setTimeout(r, ms));

export const boardApi = {
  async list(): Promise<Task[]> {
    await wait();
    return db.all();
  },

  async create(input: { title: string; priority: Priority }): Promise<Task> {
    await wait();
    return db.add({
      id: `t-${Date.now()}`,
      title: input.title,
      priority: input.priority,
      status: 'todo',
    });
  },

  async move(id: string, status: Status): Promise<Task> {
    await wait(120);
    const updated = db.update(id, { status });
    if (!updated) throw new Error(`Task not found: ${id}`);
    return updated;
  },
};
