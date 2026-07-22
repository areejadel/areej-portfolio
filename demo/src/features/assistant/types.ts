export interface Subtask {
  title: string;
  estimateMinutes: number;
}

export interface AssistantResponse {
  summary: string;
  subtasks: Subtask[];
}
