
import React from 'react';
import { ShieldCheck, Clock, User, Fingerprint, Search, Download } from 'lucide-react';
import { Button } from '../../components/UI/Button';
// Fix: Import Badge component to resolve missing name errors
import { Badge } from '../../components/UI/Badge';

export const AuditTrail: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trilha de Auditoria</h1>
          <p className="text-gray-500 text-sm">Registro imutável de todas as ações críticas no sistema.</p>
        </div>
        <Button variant="outline">
          <Download size={18} className="mr-2" /> Exportar Log (.LOG)
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/30 flex items-center justify-between">
           <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Filtrar por IP, User ou Ação..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-100" />
           </div>
           <div className="flex gap-2">
             <Badge className="bg-blue-50 text-blue-600 border border-blue-100">Somente Erros</Badge>
             <Badge className="bg-gray-100 text-gray-600">Últimas 24h</Badge>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Data / Hora</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ator</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ação</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Entidade</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">IP / Sessão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">23/11/2023 14:32:1{i}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">RO</div>
                      <span className="text-xs font-bold text-gray-900">Ricardo O.</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-emerald-50 text-emerald-700 text-[10px] font-bold">APPROVE_EXPENSE</Badge>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 font-mono">expense_id: #E22{i}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-[10px] text-gray-400 font-mono">
                      <Fingerprint size={12} />
                      192.168.1.{i * 10}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
