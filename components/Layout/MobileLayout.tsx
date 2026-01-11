
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, PlusCircle, Bell, User } from 'lucide-react';

export const MobileLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-[#F7F9FB] max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around px-6 z-50 max-w-md mx-auto">
        <NavLink to="/pwa/home" className={({ isActive }) => 
          `flex flex-col items-center gap-1 ${isActive ? 'text-[#0B68FF]' : 'text-gray-400'}`
        }>
          <Home size={22} />
          <span className="text-[10px] font-medium">Início</span>
        </NavLink>
        <NavLink to="/pwa/new" className="flex flex-col items-center -mt-10">
          <div className="w-14 h-14 bg-[#0B68FF] rounded-full flex items-center justify-center text-white shadow-lg border-4 border-[#F7F9FB]">
            <PlusCircle size={28} />
          </div>
          <span className="text-[10px] font-bold text-[#0B68FF] mt-1">Lançar</span>
        </NavLink>
        <NavLink to="/pwa/notifications" className={({ isActive }) => 
          `flex flex-col items-center gap-1 ${isActive ? 'text-[#0B68FF]' : 'text-gray-400'}`
        }>
          <div className="relative">
            <Bell size={22} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </div>
          <span className="text-[10px] font-medium">Alertas</span>
        </NavLink>
        <NavLink to="/pwa/profile" className={({ isActive }) => 
          `flex flex-col items-center gap-1 ${isActive ? 'text-[#0B68FF]' : 'text-gray-400'}`
        }>
          <User size={22} />
          <span className="text-[10px] font-medium">Perfil</span>
        </NavLink>
      </nav>
    </div>
  );
};
