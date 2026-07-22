import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { boardApi } from './api';
import type { Priority, Status, Task } from './types';

const KEY = ['tasks'] as const;

export function useTasks() {
  return useQuery({ queryKey: KEY, queryFn: boardApi.list });
}

export function useAddTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { title: string; priority: Priority }) => boardApi.create(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useMoveTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Status }) => boardApi.move(id, status),
    // Optimistic update: move the card immediately, roll back on error.
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: KEY });
      const previous = qc.getQueryData<Task[]>(KEY);
      qc.setQueryData<Task[]>(KEY, (old) =>
        (old ?? []).map((t) => (t.id === id ? { ...t, status } : t)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(KEY, ctx.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
