import { useDroppable } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import { TaskCard } from './TaskCard';
import type { Status, Task } from './types';

interface ColumnProps {
  status: Status;
  tasks: Task[];
}

export function Column({ status, tasks }: ColumnProps) {
  const { t } = useTranslation();
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <section
      ref={setNodeRef}
      className={`flex min-h-[220px] flex-1 flex-col rounded-xl border p-3 transition-colors ${
        isOver ? 'border-accent bg-blue-50/60' : 'border-slate-200 bg-slate-50'
      }`}
      aria-label={t(`board.columns.${status}`)}
    >
      <header className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-slate-700">{t(`board.columns.${status}`)}</h2>
        <span className="rounded-full bg-slate-200 px-2 text-xs text-slate-600">{tasks.length}</span>
      </header>

      {tasks.length === 0 ? (
        <p className="px-1 py-6 text-center text-xs text-slate-400">{t('board.empty')}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  );
}
