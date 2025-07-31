
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChatIcon, TasksIcon, FilesIcon } from './icons';

const commonLinkClasses = 'flex items-center p-3 rounded-lg transition-colors duration-200';
const inactiveLinkClasses = 'text-slate-300 hover:bg-slate-700 hover:text-white';
const activeLinkClasses = 'bg-cyan-500 text-white shadow-lg';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-800 p-4 flex flex-col flex-shrink-0">
      <div className="text-2xl font-bold text-white mb-10 p-2 text-center">
        داشبورد
      </div>
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
        >
          <ChatIcon />
          <span className="ml-4">چت با ایجنت</span>
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
        >
          <TasksIcon />
          <span className="ml-4">مدیریت تسک‌ها</span>
        </NavLink>
        <NavLink
          to="/files"
          className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
        >
          <FilesIcon />
          <span className="ml-4">آپلود فایل</span>
        </NavLink>
      </nav>
      <div className="mt-auto text-center text-slate-500 text-xs">
          ساخته شده با React و Tailwind
      </div>
    </aside>
  );
};

export default Sidebar;