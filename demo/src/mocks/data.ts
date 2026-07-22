import type { Task } from '../features/board/types';

/**
 * In-memory task store used by the mock API handlers.
 * Reset per page load — this is a demo, not a real backend.
 */
export const seedTasks: Task[] = [
  { id: 't-1', title: 'Set up i18n with RTL support', status: 'done', priority: 'high' },
  { id: 't-2', title: 'Build the drag-and-drop board', status: 'doing', priority: 'high' },
  { id: 't-3', title: 'Add Zod validation to the task form', status: 'doing', priority: 'medium' },
  { id: 't-4', title: 'Wire the assistant panel to the API', status: 'todo', priority: 'medium' },
  { id: 't-5', title: 'Write component tests', status: 'todo', priority: 'low' },
];

let store: Task[] = [...seedTasks];

export const db = {
  all: (): Task[] => store,
  add: (task: Task): Task => {
    store = [...store, task];
    return task;
  },
  update: (id: string, patch: Partial<Task>): Task | undefined => {
    let updated: Task | undefined;
    store = store.map((t) => {
      if (t.id !== id) return t;
      updated = { ...t, ...patch };
      return updated;
    });
    return updated;
  },
  reset: (): void => {
    store = [...seedTasks];
  },
};
