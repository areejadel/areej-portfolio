import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAssistant } from './useAssistant';
import { useAddTask } from '../board/useBoard';

export function AssistantPanel() {
  const { t } = useTranslation();
  const assistant = useAssistant();
  const addTask = useAddTask();
  const [prompt, setPrompt] = useState('');

  function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (prompt.trim().length === 0) return;
    assistant.mutate(prompt);
  }

  function addAll() {
    assistant.data?.subtasks.forEach((sub) =>
      addTask.mutate({ title: sub.title, priority: 'medium' }),
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-slate-700">{t('assistant.title')}</h2>
      <p className="mb-3 mt-1 text-xs text-slate-500">{t('assistant.hint')}</p>

      <form onSubmit={handleAsk} className="flex flex-col gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t('assistant.placeholder')}
          rows={2}
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        <button
          type="submit"
          disabled={assistant.isPending}
          className="self-start rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-60"
        >
          {assistant.isPending ? t('assistant.thinking') : t('assistant.ask')}
        </button>
      </form>

      {assistant.data && (
        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {t('assistant.summary')}
          </p>
          <p className="mb-3 mt-1 text-sm text-slate-700">{assistant.data.summary}</p>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {t('assistant.subtasks')}
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            {assistant.data.subtasks.map((sub, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="text-slate-700">{sub.title}</span>
                <span className="shrink-0 ps-2 text-xs text-slate-400">
                  {t('assistant.estimate', { count: sub.estimateMinutes })}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={addAll}
            className="mt-3 w-full rounded-lg border border-accent px-3 py-2 text-sm font-semibold text-accent hover:bg-blue-50"
          >
            {t('assistant.addAll')}
          </button>
        </div>
      )}
    </div>
  );
}
