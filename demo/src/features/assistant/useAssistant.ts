import { useMutation } from '@tanstack/react-query';
import { askAssistant } from './api';

export function useAssistant() {
  return useMutation({
    mutationFn: (prompt: string) => askAssistant(prompt),
  });
}
