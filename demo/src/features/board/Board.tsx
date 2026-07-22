import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import { Column } from './Column';
import { useMoveTask, useTasks } from './useBoard';
import { STATUSES, type Status } from './types';

export function Board() {
  const { t } = useTranslation();
  const { data: tasks, isLoading, isError } = useTasks();
  const moveTask = useMoveTask();

  // Require a small drag distance so clicks aren't treated as drags.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const target = over.id as Status;
    const current = tasks?.find((task) => task.id === active.id);
    if (current && current.status !== target) {
      moveTask.mutate({ id: String(active.id), status: target });
    }
  }

  if (isLoading) return <p className="p-6 text-sm text-slate-500">{t('board.loading')}</p>;
  if (isError || !tasks) return <p className="p-6 text-sm text-rose-600">{t('board.error')}</p>;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-3 sm:flex-row">
        {STATUSES.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </DndContext>
  );
}
