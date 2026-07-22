import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './components/LanguageToggle';
import { Board } from './features/board/Board';
import { AddTaskForm } from './features/board/AddTaskForm';
import { AssistantPanel } from './features/assistant/AssistantPanel';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <h1 className="text-lg font-bold text-ink">{t('app.title')}</h1>
            <p className="text-xs text-slate-500">{t('app.subtitle')}</p>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="order-2 lg:order-1">
            <Board />
          </div>
          <aside className="order-1 flex flex-col gap-4 lg:order-2">
            <AddTaskForm />
            <AssistantPanel />
          </aside>
        </div>
      </main>
    </div>
  );
}
