
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { BellIcon, LogoutIcon, ChevronDownIcon } from './icons';
import { Notification } from '../types';

const NotificationDropdown: React.FC<{ notifications: Notification[] }> = ({ notifications }) => (
  <div className="absolute left-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-20">
    <div className="p-3">
      <h3 className="font-semibold text-white">اعلان‌ها</h3>
    </div>
    <div className="divide-y divide-slate-700 max-h-96 overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map(notif => (
          <div key={notif.id} className={`p-3 hover:bg-slate-700 ${notif.read ? 'opacity-60' : ''}`}>
            <p className="text-sm text-slate-300">{notif.message}</p>
          </div>
        ))
      ) : (
        <p className="p-4 text-sm text-slate-400">هیچ اعلان جدیدی وجود ندارد.</p>
      )}
    </div>
  </div>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  const initialNotifications: Notification[] = [
      { id: 1, message: 'تسک "طراحی صفحه اصلی" به شما واگذار شد.', read: false },
      { id: 2, message: 'فایل "requirements.pdf" با موفقیت آپلود شد.', read: false },
      { id: 3, message: 'یادآوری جلسه: جلسه بررسی پروژه ساعت ۱۴:۰۰', read: true },
  ];
  const [notifications] = useState<Notification[]>(initialNotifications);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm p-4 flex justify-between items-center border-b border-slate-700">
      <div>
        {/* Can add breadcrumbs or page title here */}
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative" ref={notificationRef}>
          <button onClick={() => setShowNotifications(prev => !prev)} className="relative text-slate-300 hover:text-white transition-colors">
            <BellIcon />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          {showNotifications && <NotificationDropdown notifications={notifications} />}
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-slate-300 hidden sm:inline">خوش آمدید، {user?.email}</span>
            <ChevronDownIcon />
        </div>
        <button onClick={logout} className="flex items-center space-x-2 text-slate-300 hover:text-red-400 transition-colors" title="خروج">
            <LogoutIcon />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
