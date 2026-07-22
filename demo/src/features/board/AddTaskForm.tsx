import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { newTaskSchema } from './schema';
import { useAddTask } from './useBoard';
import { PRIORITIES, type Priority } from './types';

export function AddTaskForm() {
  const { t } = useTranslation();
  const addTask = useAddTask();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = newTaskSchema.safeParse({ title, priority });
    if (!parsed.success) {
      // The message stored in the schema is an i18n key.
      setError(parsed.error.issues[0].message);
      return;
    }
    setError(null);
    addTask.mutate(parsed.data, { onSuccess: () => setTitle('') });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-4"
      aria-label={t('form.add')}
    >
      <h2 className="mb-3 text-sm font-semibold text-slate-700">{t('form.add')}</h2>

      <label className="mb-1 block text-xs font-medium text-slate-500" htmlFor="task-title">
        {t('form.titleLabel')}
      </label>
      <input
        id="task-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t('form.titlePlaceholder')}
        className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
      />

      <label className="mb-1 block text-xs font-medium text-slate-500" htmlFor="task-priority">
        {t('form.priorityLabel')}
      </label>
      <select
        id="task-priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="mb-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-accent"
      >
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>
            {t(`board.priority.${p}`)}
          </option>
        ))}
      </select>

      {error && (
        <p role="alert" className="mb-3 text-xs text-rose-600">
          {t(error)}
        </p>
      )}

      <button
        type="submit"
        disabled={addTask.isPending}
        className="w-full rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {t('form.submit')}
      </button>
    </form>
  );
}
