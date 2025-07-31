import React, { useState, FormEvent, useEffect } from 'react';
import { Task, TaskStatus } from '../../types';
import { PlusIcon, TrashIcon, Spinner } from '../../components/icons';
import CustomSelect from '../../components/CustomSelect';

// Mock API fetching tasks
const fetchTasks = (): Promise<Task[]> => {
    const initialTasks: Task[] = [
      { id: 1, title: 'طراحی صفحه جدید چت', status: TaskStatus.Done },
      { id: 2, title: 'پیاده‌سازی ناوبری موبایل', status: TaskStatus.Done },
      { id: 3, title: 'اتصال به Gemini API', status: TaskStatus.InProgress },
      { id: 4, title: 'نوشتن مستندات پروژه', status: TaskStatus.Todo },
    ];
    return new Promise(resolve => setTimeout(() => resolve(initialTasks), 1000));
};

const statusStyles: { [key in TaskStatus]: { bg: string; text: string; } } = {
  [TaskStatus.Todo]: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  [TaskStatus.InProgress]: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  [TaskStatus.Done]: { bg: 'bg-green-500/10', text: 'text-green-400' },
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchTasks().then(data => {
      setTasks(data);
      setIsLoading(false);
    });
  }, []);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      status: TaskStatus.Todo,
    };
    // In a real app, this would be an API call.
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const handleDeleteTask = (id: number) => {
    // In a real app, this would be an API call.
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: TaskStatus) => {
    // In a real app, this would be an API call.
    setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      <h1 className="text-3xl font-bold text-white">مدیریت تسک‌ها</h1>

      <form onSubmit={handleAddTask} className="flex gap-2 p-2 bg-black/20 border border-white/10 rounded-xl">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="تسک جدید..."
          className="flex-1 bg-transparent text-white placeholder-slate-400 px-3 py-2 focus:outline-none"
        />
        <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          <span className="hidden sm:inline">افزودن</span>
        </button>
      </form>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
            <Spinner className="w-8 h-8 text-white"/>
        </div>
      ) : (
      <div className="space-y-3">
        {tasks.map(task => (
          <div key={task.id} className="bg-white/5 backdrop-blur-sm p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/10 transition-all hover:border-white/20">
            <p className="text-slate-100 flex-1">{task.title}</p>
            <div className="flex items-center gap-2 self-end sm:self-center">
              <CustomSelect
                value={task.status}
                onChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                statusStyles={statusStyles}
              />
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-500/10"
                title="حذف تسک"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default TasksPage;