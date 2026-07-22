export const STATUSES = ['todo', 'doing', 'done'] as const;
export type Status = (typeof STATUSES)[number];

export const PRIORITIES = ['low', 'medium', 'high'] as const;
export type Priority = (typeof PRIORITIES)[number];

export interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
}
