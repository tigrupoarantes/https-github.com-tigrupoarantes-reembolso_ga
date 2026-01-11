
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  Layers, 
  Settings, 
  BarChart3, 
  Users,
  LogOut,
  ChevronRight,
  Wallet,
  RefreshCcw,
  ShieldCheck
} from 'lucide-react';
import { MOCK_USER } from '../../services/mockData';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive 
          ? 'bg-[#0B68FF] text-white shadow-md' 
          : 'text-gray-500 hover:bg-blue-50 hover:text-[#0B68FF]'
      }`
    }
  >
    <Icon size={20} className="shrink-0" />
    <span className="font-medium">{children}</span>
    <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
  </NavLink>
);

export const BackofficeLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#F7F9FB] overflow-hidden">
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0B68FF] rounded-xl flex items-center justify-center text-white font-bold text-xl italic">GA</div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight">Reembolsos</h1>
              <span className="text-xs text-blue-600 font-medium tracking-wider uppercase">Grupo Arantes</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-4 mt-2">Operação</p>
          <SidebarLink to="/backoffice/dashboard" icon={LayoutDashboard}>Dashboard</SidebarLink>
          <SidebarLink to="/backoffice/inbox" icon={Inbox}>Caixa de Entrada</SidebarLink>
          <SidebarLink to="/backoffice/approvals" icon={Layers}>Aprovações em Lote</SidebarLink>
          <SidebarLink to="/backoffice/advances" icon={Wallet}>Adiantamentos</SidebarLink>
          <SidebarLink to="/backoffice/reconciliation" icon={RefreshCcw}>Conciliação</SidebarLink>
          
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-4 mt-6">Administração</p>
          <SidebarLink to="/backoffice/reports" icon={BarChart3}>Relatórios</SidebarLink>
          <SidebarLink to="/backoffice/users" icon={Users}>Equipe & Hierarquia</SidebarLink>
          <SidebarLink to="/backoffice/settings" icon={Settings}>Configurações</SidebarLink>
          <SidebarLink to="/backoffice/audit" icon={ShieldCheck}>Auditoria</SidebarLink>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">RO</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{MOCK_USER.full_name}</p>
              <p className="text-xs text-gray-500 capitalize">{MOCK_USER.role}</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"><LogOut size={16} />Sair</button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div id="page-header-slot"></div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Fechamento Ativo (Fase 5)
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
