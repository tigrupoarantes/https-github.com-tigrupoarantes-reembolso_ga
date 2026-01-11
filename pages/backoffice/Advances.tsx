
import React, { useState } from 'react';
import { Search, Plus, Wallet, ArrowUpRight, History, X, User, CheckCircle } from 'lucide-react';
import { MOCK_PROFILES } from '../../services/mockData';
import { Button } from '../../components/UI/Button';
import { Badge } from '../../components/UI/Badge';

export const Advances: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [amount, setAmount] = useState('');

  const openCreditModal = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCredit = () => {
    alert(`R$ ${amount} creditados com sucesso para ${selectedUser?.full_name}`);
    setShowModal(false);
    setAmount('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Adiantamentos</h1>
          <p className="text-gray-500 text-sm">Gerencie o saldo das "caixinhas" e depósitos antecipados.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowModal(true)}>
          <Plus size={18} className="mr-2" /> Novo Depósito em Lote
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 bg-gray-50/30">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar colaborador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Colaborador</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Saldo Atual</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_PROFILES.map(user => (
                  <tr key={user.user_id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">
                          {user.full_name[0]}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{user.full_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-emerald-600">R$ 1.250,00</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => openCreditModal(user)}>
                        <ArrowUpRight size={14} className="mr-1" /> Creditar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <History size={18} className="text-blue-600" /> Últimos Depósitos
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Wallet size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">Ana Silva</p>
                    <p className="text-[10px] text-gray-500">Hoje às 10:45</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">+R$ 500,00</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs text-blue-600">Ver Histórico Completo</Button>
          </div>
        </div>
      </div>

      {/* Credit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 bg-[#0B68FF] text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">Injetar Saldo</h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {selectedUser ? selectedUser.full_name[0] : 'U'}
                 </div>
                 <div>
                    <p className="text-sm font-bold text-gray-900">{selectedUser?.full_name || 'Selecione um usuário'}</p>
                    <p className="text-xs text-gray-500">Saldo atual: R$ 1.250,00</p>
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Valor do Adiantamento</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">R$</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0,00"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Motivo / Descrição</label>
                <textarea 
                  placeholder="Ex: Adiantamento para viagem comercial MG"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 resize-none h-24"
                />
              </div>

              <Button onClick={handleCredit} className="w-full h-14 rounded-2xl bg-[#0B68FF]">
                <CheckCircle size={18} className="mr-2" /> Confirmar Depósito
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
