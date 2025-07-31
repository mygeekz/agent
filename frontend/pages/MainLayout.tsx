import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ChatIcon, TasksIcon, UserIcon, LogoutIcon } from '../components/icons';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 p-4 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white"/>
          </div>
          <div>
            <span className="font-semibold text-white">{user?.email?.split('@')[0] || 'کاربر'}</span>
            <p className="text-xs text-slate-400">کاربر فعال</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 text-slate-300 hover:text-red-400 transition-colors" title="خروج">
            <LogoutIcon className="w-6 h-6"/>
        </button>
      </div>
    </header>
  );
};

const BottomNav = () => {
    const commonClasses = "flex flex-col items-center justify-center gap-1 text-slate-400 transition-colors duration-200 flex-1 py-2";
    const activeClasses = "!text-white";

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-lg border-t border-white/10">
            <div className="flex justify-around max-w-5xl mx-auto">
                <NavLink to="/" end className={({isActive}) => `${commonClasses} ${isActive ? activeClasses : ''}`}>
                    <ChatIcon />
                    <span className="text-xs font-medium">چت</span>
                </NavLink>
                <NavLink to="/tasks" className={({isActive}) => `${commonClasses} ${isActive ? activeClasses : ''}`}>
                    <TasksIcon />
                    <span className="text-xs font-medium">تسک‌ها</span>
                </NavLink>
            </div>
        </nav>
    );
};


const MainLayout = () => {
  return (
    <div className="relative h-full w-full">
      <Header />
      <main className="pt-24 pb-20 h-full overflow-y-auto">
          <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;