
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USER, MOCK_EXPENSES, MOCK_ADVANCE_LEDGER } from '../../services/mockData';
import { STATUS_CONFIG } from '../../constants';
import { Badge } from '../../components/UI/Badge';
import { ChevronRight, Wallet as WalletIcon, History, AlertCircle } from 'lucide-react';

export const PwaHome: React.FC = () => {
  const navigate = useNavigate();
  const balance = MOCK_ADVANCE_LEDGER.reduce((acc, curr) => 
    curr.type === 'credit' ? acc + curr.amount : acc - curr.amount, 0
  );

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-[#0B68FF] pt-12 pb-20 px-6 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.05] rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-[0.05] rounded-full -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white font-bold text-lg">
                RO
              </div>
              <div>
                <p className="text-blue-100 text-xs font-medium">Bem-vindo de volta,</p>
                <p className="text-white font-bold text-lg">{MOCK_USER.full_name}</p>
              </div>
            </div>
            <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <AlertCircle size={20} />
            </button>
          </div>

          <div 
            onClick={() => navigate('/pwa/wallet')}
            className="bg-white rounded-3xl p-6 shadow-xl flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer"
          >
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Adiantamentos (Saldo)</p>
              <h2 className="text-2xl font-bold text-gray-900">R$ {balance.toFixed(2).replace('.', ',')}</h2>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <WalletIcon size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-8 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        <button className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-w-[100px] shrink-0 active:bg-gray-50">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-2">
            <History size={20} />
          </div>
          <span className="text-[10px] font-bold text-gray-600 uppercase">Histórico</span>
        </button>
        <button 
          onClick={() => navigate('/pwa/wallet')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-w-[100px] shrink-0 active:bg-gray-50"
        >
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-2">
            <WalletIcon size={20} />
          </div>
          <span className="text-[10px] font-bold text-gray-600 uppercase">Caixinha</span>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-900">Últimos Lançamentos</h3>
          <button className="text-[#0B68FF] text-sm font-bold">Ver todos</button>
        </div>

        <div className="space-y-3">
          {MOCK_EXPENSES.map(expense => (
            <div key={expense.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 active:scale-95 transition-transform">
              <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <img src={expense.attachment_url} className="w-full h-full object-cover" alt="Thumb" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{expense.description}</p>
                <div className="flex items-center gap-2 mt-1">
                   <Badge className={`${STATUS_CONFIG[expense.status].color} text-[10px]`}>
                      {STATUS_CONFIG[expense.status].label}
                   </Badge>
                   <span className="text-[10px] text-gray-400 font-medium">{new Date(expense.date_competencia).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-900">R$ {expense.amount.toFixed(2)}</p>
                <ChevronRight size={16} className="text-gray-300 ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
