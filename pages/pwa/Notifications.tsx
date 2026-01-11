
import React from 'react';
import { Bell, CheckCircle, XCircle, MessageSquare, Clock, ChevronRight } from 'lucide-react';

const NOTIF_MOCKS = [
  { id: 1, title: 'Despesa Aprovada!', desc: 'Seu reembolso de R$ 54,90 foi aprovado pelo gestor.', time: '10 min atrás', type: 'success', icon: CheckCircle },
  { id: 2, title: 'Ajuste Solicitado', desc: 'O financeiro solicitou um novo anexo na despesa #E442.', time: '2 horas atrás', type: 'warning', icon: MessageSquare },
  { id: 3, title: 'Pagamento Programado', desc: 'O lote de Nov/23 foi programado para 25/11.', time: 'Ontem', type: 'info', icon: Clock },
];

export const Notifications: React.FC = () => {
  return (
    <div className="flex flex-col animate-in fade-in duration-500 h-full bg-[#F7F9FB]">
      <div className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Bell className="text-blue-600" size={20} /> Notificações
        </h1>
      </div>

      <div className="p-4 space-y-3">
        {NOTIF_MOCKS.map(n => (
          <div key={n.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 active:scale-95 transition-transform">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              n.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
              n.type === 'warning' ? 'bg-orange-50 text-orange-600' :
              'bg-blue-50 text-blue-600'
            }`}>
              <n.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-bold text-gray-900">{n.title}</p>
                <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{n.time}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{n.desc}</p>
            </div>
            <div className="flex items-center">
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
          <Bell size={24} />
        </div>
        <p className="text-sm text-gray-400 font-medium">Não há mais notificações por enquanto.</p>
      </div>
    </div>
  );
};
