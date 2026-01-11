
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, FileText, CheckCircle, XCircle, Send, MessageSquare, ShieldAlert } from 'lucide-react';
import { MOCK_EXPENSES, MOCK_COST_CENTERS, MOCK_CATEGORIES } from '../../services/mockData';
import { Badge } from '../../components/UI/Badge';
import { Button } from '../../components/UI/Button';
import { STATUS_CONFIG } from '../../constants';

export const Inbox: React.FC = () => {
  const [selectedExpense, setSelectedExpense] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'audit'>('details');
  const [commentText, setCommentText] = useState('');
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const toggleCheck = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const next = new Set(checkedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCheckedIds(next);
  };

  return (
    <div className="flex h-full gap-6 animate-in fade-in duration-500 overflow-hidden">
      <div className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${selectedExpense ? 'w-2/3' : 'w-full'}`}>
        {/* Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por descrição, colaborador ou ID..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            {checkedIds.size > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100 animate-in zoom-in-95">
                {checkedIds.size} selecionados
                <button onClick={() => setCheckedIds(new Set())} className="ml-1 text-blue-400 hover:text-blue-600"><XCircle size={14}/></button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              <Filter size={16} /> Filtros
            </button>
            <Button size="sm" variant="primary" className="bg-[#0B68FF] shadow-md">
              Processar {checkedIds.size > 0 ? checkedIds.size : ''} Lote
            </Button>
          </div>
        </div>

        {/* List Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    onChange={() => checkedIds.size === MOCK_EXPENSES.length ? setCheckedIds(new Set()) : setCheckedIds(new Set(MOCK_EXPENSES.map(e => e.id)))} 
                    checked={checkedIds.size === MOCK_EXPENSES.length && MOCK_EXPENSES.length > 0}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                </th>
                <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Despesa</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Colaborador</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Valor</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_EXPENSES.map((expense) => (
                <tr 
                  key={expense.id} 
                  onClick={() => setSelectedExpense(expense.id)}
                  className={`group hover:bg-blue-50/20 cursor-pointer transition-colors ${selectedExpense === expense.id ? 'bg-blue-50/50' : ''}`}
                >
                  <td className="px-6 py-4" onClick={(e) => toggleCheck(e, expense.id)}>
                    <input 
                      type="checkbox" 
                      checked={checkedIds.has(expense.id)} 
                      onChange={() => {}} // Controlled by cell click
                      className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-100">
                        {expense.attachment_url ? (
                          <img src={expense.attachment_url} className="w-full h-full object-cover rounded-lg" alt="Comprovante" />
                        ) : (
                          <FileText size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                           <p className="text-sm font-bold text-gray-900 truncate">{expense.description}</p>
                           {expense.duplicate_score > 0.5 && <ShieldAlert size={14} className="text-orange-500" />}
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                          {MOCK_CATEGORIES.find(c => c.id === expense.category_id)?.name} · CC: {MOCK_COST_CENTERS.find(cc => cc.id === expense.cost_center_id)?.code}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 font-medium">{new Date(expense.date_competencia).toLocaleDateString('pt-BR')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">RO</div>
                       <span className="text-xs text-gray-700 font-medium">Ricardo O.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-bold text-gray-900">R$ {expense.amount.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={STATUS_CONFIG[expense.status].color}>
                      {STATUS_CONFIG[expense.status].label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"><Eye size={18}/></button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"><MoreVertical size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Siderail - Enhanced Fase 2 */}
      {selectedExpense && (
        <div className="w-1/3 bg-white border border-gray-100 rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-right-8 duration-300 overflow-hidden shrink-0">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
             <div className="flex gap-4">
               {['details', 'comments', 'audit'].map((tab) => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab as any)}
                   className={`text-xs font-bold uppercase tracking-widest pb-1 transition-all ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
                 >
                   {tab === 'details' ? 'Detalhes' : tab === 'comments' ? 'Chat' : 'Eventos'}
                 </button>
               ))}
             </div>
             <button onClick={() => setSelectedExpense(null)} className="text-gray-400 hover:text-gray-600">
               <XCircle size={20} />
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'details' && (
              <div className="p-6 space-y-6">
                <div className="relative group cursor-zoom-in rounded-xl overflow-hidden border border-gray-100">
                  <img 
                    src={MOCK_EXPENSES.find(e => e.id === selectedExpense)?.attachment_url} 
                    className="w-full h-48 object-cover bg-gray-900"
                    alt="Receipt"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Abrir Original</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-6 bg-gray-50 p-4 rounded-xl">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Montante</p>
                    <p className="text-lg font-bold text-gray-900">R$ {MOCK_EXPENSES.find(e => e.id === selectedExpense)?.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Data Gasto</p>
                    <p className="text-sm font-bold text-gray-900">{MOCK_EXPENSES.find(e => e.id === selectedExpense)?.date_competencia}</p>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl space-y-2">
                   <div className="flex items-center gap-2 text-orange-700">
                     <ShieldAlert size={16} />
                     <p className="text-xs font-bold uppercase tracking-wider">Antifraude Ativo</p>
                   </div>
                   <p className="text-xs text-orange-800 leading-relaxed font-medium">
                     <span className="font-bold underline">Score: 85%</span> - Duplicidade visual detectada. Comparado com despesa #E9213 em 21/11/2023.
                   </p>
                   <Button size="sm" className="w-full py-1 text-[10px] bg-orange-600 hover:bg-orange-700 h-7 rounded-lg">Ver Comparativo</Button>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Descrição do Lançamento</p>
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl italic">
                    "{MOCK_EXPENSES.find(e => e.id === selectedExpense)?.description}"
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="flex flex-col h-full">
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700 shrink-0">RO</div>
                    <div className="bg-blue-50 p-3 rounded-2xl rounded-tl-none">
                      <p className="text-[10px] font-bold text-blue-800 mb-1">Ricardo Oliveira · 10:20</p>
                      <p className="text-xs text-gray-700">Poderia anexar o detalhamento dos itens deste almoço?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-tr-none">
                      <p className="text-[10px] font-bold text-gray-500 mb-1 text-right">Financeiro Arantes · 10:45</p>
                      <p className="text-xs text-gray-700 text-right">Aguardando novo anexo para validar políticas.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">FA</div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100 flex gap-2">
                  <input 
                    type="text" 
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Escreva uma mensagem..."
                    className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-100"
                  />
                  <button className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className="p-6">
                <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                  <div className="relative">
                    <div className="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                    <p className="text-xs font-bold text-gray-900">Enviado</p>
                    <p className="text-[10px] text-gray-500">22 Nov, 14:30 · Ricardo Oliveira</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-orange-400 border-2 border-white"></div>
                    <p className="text-xs font-bold text-gray-900">Escaneado (OCR)</p>
                    <p className="text-[10px] text-gray-500">22 Nov, 14:31 · Sistema AI (Gemini)</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-purple-500 border-2 border-white"></div>
                    <p className="text-xs font-bold text-gray-900">Entrou em Validação</p>
                    <p className="text-[10px] text-gray-500">23 Nov, 09:15 · Sistema</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 bg-white space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="text-red-600 border-red-100 bg-red-50 hover:bg-red-100 h-11 text-xs">
                <XCircle size={16} className="mr-1.5" /> Rejeitar
              </Button>
              <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-700 h-11 text-xs shadow-md">
                <CheckCircle size={16} className="mr-1.5" /> Aprovar
              </Button>
            </div>
            <Button variant="ghost" className="w-full text-blue-600 text-xs py-2">Solicitar Ajuste por Chat</Button>
          </div>
        </div>
      )}
    </div>
  );
};
