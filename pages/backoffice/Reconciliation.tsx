
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, ArrowRight, Banknote, Search, Filter } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { Badge } from '../../components/UI/Badge';

export const Reconciliation: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [matchDone, setMatchDone] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setMatchDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conciliação Bancária</h1>
          <p className="text-gray-500 text-sm">Cruze os lançamentos do seu banco com as despesas do sistema.</p>
        </div>
      </div>

      {!matchDone ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-[32px] p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Upload size={32} />
          </div>
          <div className="max-w-sm mx-auto">
            <h3 className="text-lg font-bold text-gray-900">Importar Extrato</h3>
            <p className="text-sm text-gray-500 mt-2">Arraste seu arquivo .OFX ou .CSV aqui para processar o fechamento do lote.</p>
          </div>
          <Button onClick={handleUpload} isLoading={isUploading} className="px-8 h-12 rounded-xl">
            Selecionar Arquivo
          </Button>
        </div>
      ) : (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Matches Perfeitos</p>
              <h4 className="text-2xl font-bold text-emerald-900">124</h4>
            </div>
            <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
              <p className="text-[10px] font-bold text-orange-700 uppercase tracking-widest mb-1">Divergências de Valor</p>
              <h4 className="text-2xl font-bold text-orange-900">3</h4>
            </div>
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
              <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest mb-1">Não Encontrados</p>
              <h4 className="text-2xl font-bold text-red-900">1</h4>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Resultados do Cruzamento</span>
              <Button size="sm" variant="outline" onClick={() => setMatchDone(false)}>Limpar</Button>
            </div>
            <div className="divide-y divide-gray-50">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50/50">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-700 text-[10px]">BANCO</Badge>
                        <span className="text-sm font-bold text-gray-900">PAGTO RESTAURANTE ARANTES</span>
                      </div>
                      <p className="text-xs text-gray-400">23/11/2023 · R$ 124,50</p>
                    </div>
                    <ArrowRight size={16} className="text-gray-300" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">SISTEMA</Badge>
                        <span className="text-sm font-bold text-gray-900">Almoço Executivo</span>
                      </div>
                      <p className="text-xs text-gray-400">ID: #E123 · Colaborador: Ricardo O.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-emerald-500" />
                    <Button size="sm" variant="ghost" className="text-xs">Conciliar</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-[#0B68FF] px-8 h-12 shadow-xl shadow-blue-200">
              Finalizar Conciliação do Lote
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
