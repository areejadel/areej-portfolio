import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useTranslation } from 'react-i18next';
import type { Priority, Task } from './types';

const priorityStyles: Record<Priority, string> = {
  low: 'bg-slate-100 text-slate-600 ring-slate-200',
  medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  high: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export function TaskCard({ task }: { task: Task }) {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`cursor-grab touch-none rounded-lg border border-slate-200 bg-white p-3 shadow-sm ${
        isDragging ? 'dragging' : ''
      }`}
      aria-label={task.title}
    >
      <p className="text-sm font-medium text-slate-800">{task.title}</p>
      <span
        className={`mt-2 inline-block rounded px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
          priorityStyles[task.priority]
        }`}
      >
        {t(`board.priority.${task.priority}`)}
      </span>
    </li>
  );
}
