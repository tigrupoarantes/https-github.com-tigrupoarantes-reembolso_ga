
import React from 'react';
import { ChevronLeft, Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_ADVANCE_LEDGER } from '../../services/mockData';

export const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const balance = MOCK_ADVANCE_LEDGER.reduce((acc, curr) => 
    curr.type === 'credit' ? acc + curr.amount : acc - curr.amount, 0
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FB] animate-in slide-in-from-right-4 duration-500">
      <div className="p-6 bg-[#0B68FF] text-white pb-12 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-12 -mt-12"></div>
        <div className="flex items-center justify-between mb-8 relative z-10">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg">Minha Caixinha</h1>
          <div className="w-10"></div>
        </div>

        <div className="text-center relative z-10">
          <p className="text-blue-100 text-xs font-medium uppercase tracking-widest mb-2">Saldo Disponível</p>
          <h2 className="text-4xl font-bold">R$ {balance.toFixed(2).replace('.', ',')}</h2>
        </div>
      </div>

      <div className="flex-1 px-6 -mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl space-y-6 min-h-[400px]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar size={18} className="text-blue-600" /> Histórico de Transações
            </h3>
          </div>

          <div className="space-y-4">
            {MOCK_ADVANCE_LEDGER.slice().reverse().map(item => (
              <div key={item.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {item.type === 'credit' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{item.description}</p>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {new Date(item.created_at).toLocaleDateString('pt-BR')} às {new Date(item.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className={`text-right ${item.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                  <p className="text-sm font-bold">
                    {item.type === 'credit' ? '+' : '-'} R$ {item.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <p className="text-xs text-gray-400 leading-relaxed">
              O saldo é atualizado automaticamente conforme <br/>suas despesas são pagas ou rejeitadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
