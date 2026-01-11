
import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight, Filter, Search, ShieldCheck, AlertCircle } from 'lucide-react';
import { MOCK_EXPENSES, MOCK_CATEGORIES } from '../../services/mockData';
import { Button } from '../../components/UI/Button';
import { Badge } from '../../components/UI/Badge';
import { STATUS_CONFIG } from '../../constants';

export const Approvals: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const pendingExpenses = MOCK_EXPENSES.filter(e => e.status === 'enviado' || e.status === 'em aprovação');

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectAll = () => {
    if (selectedIds.size === pendingExpenses.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(pendingExpenses.map(e => e.id)));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Aprovações em Lote</h1>
          <p className="text-gray-500 text-sm">Gerencie múltiplas solicitações de forma eficiente e rápida.</p>
        </div>
        {selectedIds.size > 0 && (
          <div className="flex gap-3 animate-in slide-in-from-right-4">
            <Button variant="outline" className="text-red-600 border-red-100 bg-red-50 hover:bg-red-100">
              Rejeitar {selectedIds.size} itens
            </Button>
            <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-700">
              Aprovar {selectedIds.size} itens
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={selectAll}
              className="text-xs font-bold text-blue-600 uppercase tracking-wider hover:underline"
            >
              {selectedIds.size === pendingExpenses.length ? 'Desmarcar todos' : 'Selecionar todos'}
            </button>
            <span className="text-sm text-gray-500">{pendingExpenses.length} pendentes</span>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input type="text" placeholder="Filtrar por nome ou CC..." className="pl-9 pr-4 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none" />
            </div>
            <Button size="sm" variant="outline" className="h-8"><Filter size={14} className="mr-1"/> Filtros</Button>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {pendingExpenses.map(expense => (
            <div 
              key={expense.id} 
              onClick={() => toggleSelect(expense.id)}
              className={`p-4 flex items-center gap-6 hover:bg-gray-50 transition-colors cursor-pointer ${selectedIds.has(expense.id) ? 'bg-blue-50/40' : ''}`}
            >
              <div className="flex items-center gap-4 shrink-0">
                <input 
                  type="checkbox" 
                  checked={selectedIds.has(expense.id)} 
                  onChange={() => {}} 
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-100" 
                />
                <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                  <img src={expense.attachment_url} className="w-full h-full object-cover" alt="Comprovante" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-gray-900 truncate">{expense.description}</p>
                  {expense.duplicate_score > 0.7 && (
                    <Badge className="bg-orange-100 text-orange-600 border border-orange-200 flex items-center gap-1 py-0 px-2">
                      <AlertCircle size={10} /> Risco de Fraude
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                  <span>Ricardo Oliveira</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{MOCK_CATEGORIES.find(c => c.id === expense.category_id)?.name}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{new Date(expense.date_competencia).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-base font-bold text-gray-900">R$ {expense.amount.toFixed(2).replace('.', ',')}</p>
                <Badge className={STATUS_CONFIG[expense.status].color + " text-[10px] uppercase tracking-tighter"}>
                  {STATUS_CONFIG[expense.status].label}
                </Badge>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" title="Rejeitar"><XCircle size={20} /></button>
                <button className="p-2 text-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors" title="Aprovar"><CheckCircle size={20} /></button>
                <button className="p-2 text-gray-300 hover:text-gray-600" title="Ver detalhes"><ChevronRight size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
