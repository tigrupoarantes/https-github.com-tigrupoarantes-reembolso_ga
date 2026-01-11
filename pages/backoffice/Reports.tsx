
import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileArchive, Filter, Calendar, BarChart3, ChevronDown } from 'lucide-react';
import { Button } from '../../components/UI/Button';

export const Reports: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (type: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`${type} gerado com sucesso! O download iniciará em instantes.`);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios & Exportação</h1>
          <p className="text-gray-500 text-sm">Extração de dados consolidados para contabilidade e ERP.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Filter size={18} className="text-blue-600" /> Parâmetros de Filtro
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Período de Competência</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Novembro/2023" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status do Reembolso</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 appearance-none">
                  <option>Todos finalizados (Aprovados/Pagos)</option>
                  <option>Somente Pagos</option>
                  <option>Pendentes de Pagamento</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Centro de Custo</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 appearance-none">
                  <option>Todos os Centros</option>
                  <option>100.01 - Tecnologia</option>
                  <option>200.05 - Marketing</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Formato do Arquivo</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 appearance-none">
                  <option>CSV (Padrão Excel)</option>
                  <option>JSON (Para integração de sistemas)</option>
                  <option>Layout ERP Grupo Arantes</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button 
                onClick={() => handleExport('CSV')} 
                isLoading={isExporting}
                className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-none"
              >
                <FileSpreadsheet size={18} className="mr-2 text-emerald-600" /> Gerar Planilha
              </Button>
              <Button 
                onClick={() => handleExport('ZIP')} 
                isLoading={isExporting}
                className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-none"
              >
                <FileArchive size={18} className="mr-2 text-orange-600" /> Exportar Comprovantes (ZIP)
              </Button>
            </div>
          </div>

          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
               <Download size={20} />
             </div>
             <div>
               <p className="text-sm font-bold text-blue-900">Histórico de Exportações</p>
               <p className="text-xs text-blue-700 mt-1">Você pode baixar arquivos gerados nos últimos 7 dias diretamente do servidor de armazenamento seguro.</p>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
               <BarChart3 size={18} className="text-purple-600" /> Resumo do Lote Selecionado
             </h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500">Total de Despesas</span>
                 <span className="font-bold text-gray-900">128</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500">Montante Total</span>
                 <span className="font-bold text-gray-900">R$ 42.150,55</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500">Valor Médio p/ Item</span>
                 <span className="font-bold text-gray-900">R$ 329,30</span>
               </div>
               <div className="pt-4 border-t border-gray-50">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold text-gray-400 uppercase">Principal Centro de Custo</span>
                   <span className="text-xs font-bold text-blue-600">62%</span>
                 </div>
                 <p className="text-sm font-medium text-gray-900">Tecnologia (100.01)</p>
                 <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2">
                   <div className="w-[62%] h-full bg-blue-500 rounded-full"></div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
