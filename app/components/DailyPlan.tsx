"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "desklife-daily-plan";

const initialTasks = [
  { title: "Закуска", text: "Започни деня с нещо питателно.", done: true },
  { title: "Изпий 500 мл вода", text: "Хидратацията е ключова.", done: true },
  { title: "Раздвижване (5 минути)", text: "Леки упражнения за енергия.", done: false },
  { title: "Обяд", text: "Хапни здравословно и балансирано.", done: false },
  { title: "3000 крачки", text: "Малка разходка, голям ефект.", done: false },
  { title: "Следобедна почивка", text: "Отпусни се за няколко минути.", done: false },
  { title: "Кратка разходка", text: "Свеж въздух за по-добро настроение.", done: false },
];

export function DailyPlan() {
  const [tasks, setTasks] = useState(initialTasks);
  const [hasLoaded, setHasLoaded] = useState(false);
  const completedCount = tasks.filter((task) => task.done).length;
  const progress = (completedCount / tasks.length) * 100;

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks) as typeof initialTasks;
        if (Array.isArray(parsedTasks) && parsedTasks.length === initialTasks.length) {
          setTasks(parsedTasks);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, hasLoaded]);

  function toggleTask(index: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task, taskIndex) =>
        taskIndex === index ? { ...task, done: !task.done } : task,
      ),
    );
  }

  return (
    <article className="card panel">
      <div className="panel-heading">
        <h2>Днешният план</h2>
        <span>Примерен ден</span>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <button
            className={`task${task.done ? " is-done" : ""}`}
            key={task.title}
            type="button"
            onClick={() => toggleTask(index)}
            aria-pressed={task.done}
          >
            <span className={`check${task.done ? " done" : ""}`} aria-hidden="true">
              {task.done ? "✓" : ""}
            </span>
            <span className="task-copy">
              <strong>{task.title}</strong>
              <small>{task.text}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="panel-footer">
        <span className="progress-bar" aria-label={`${completedCount} от ${tasks.length} завършени`}>
          <i style={{ width: `${progress}%` }} />
        </span>
        <small>{completedCount} от {tasks.length} завършени</small>
      </div>
    </article>
  );
}
