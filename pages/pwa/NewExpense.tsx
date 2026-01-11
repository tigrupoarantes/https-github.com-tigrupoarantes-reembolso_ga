
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronLeft, ChevronRight, Check, X, CreditCard, Calendar, Sparkles, Wand2, Loader2, PartyPopper } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { MOCK_CATEGORIES, MOCK_COST_CENTERS } from '../../services/mockData';

export const NewExpense: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    costCenter: '',
    isCorporate: false,
    description: '',
    image: null as string | null
  });

  const next = () => setStep(s => Math.min(s + 1, 4));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const handleCapture = () => {
    setFormData({ ...formData, image: 'https://picsum.photos/800/1200' });
  };

  const simulateOCR = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setFormData({
      ...formData,
      amount: '124.50',
      date: '2023-11-23',
      description: 'Almoço Executivo (Extraído via IA)',
      category: 'cat1',
      costCenter: 'cc1'
    });
    setIsProcessing(false);
    setStep(1);
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const isStepValid = () => {
    if (step === 1) return formData.amount && formData.date;
    if (step === 2) return formData.category && formData.costCenter;
    if (step === 3) return formData.description;
    return true;
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#0B68FF] text-white p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-8 animate-bounce">
           <Check size={48} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Lançamento Enviado!</h2>
        <p className="text-blue-100 text-lg mb-12 leading-relaxed">Sua despesa de R$ {formData.amount} foi enviada para aprovação do seu gestor.</p>
        <Button onClick={() => navigate('/pwa/home')} className="w-full h-16 bg-white text-[#0B68FF] font-bold text-lg rounded-2xl shadow-xl">
           Voltar para o Início
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-bottom-8 duration-500 overflow-hidden">
      {/* ... (restante do código do NewExpense mantido igual) ... */}
      {isProcessing && (
        <div className="absolute inset-0 z-[100] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
          <div className="relative">
             <div className="w-24 h-24 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin"></div>
             <Sparkles className="absolute inset-0 m-auto text-blue-600 animate-pulse" size={32} />
          </div>
          <h3 className="mt-8 text-xl font-bold text-gray-900">IA Analisando...</h3>
        </div>
      )}

      <div className="p-6 flex items-center justify-between border-b border-gray-100 shrink-0">
        <button onClick={() => step === 1 ? navigate(-1) : prev()} className="text-gray-400">
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Passo {step} de 4</span>
          <div className="flex gap-1.5 mt-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i <= step ? 'w-6 bg-[#0B68FF]' : 'w-2 bg-gray-100'}`} />
            ))}
          </div>
        </div>
        <button onClick={() => navigate(-1)} className="text-gray-400"><X size={24} /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900">Qual o valor <br/>da despesa?</h2>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">R$</span>
                <input type="number" autoFocus value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full bg-blue-50/50 border-none rounded-3xl py-12 pl-20 pr-6 text-4xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-100 transition-all" />
              </div>
              <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-medium text-gray-900 focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900">Onde foi <br/>gasto?</h2>
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-medium text-gray-900 appearance-none">
              <option value="">Categoria</option>
              {MOCK_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={formData.costCenter} onChange={e => setFormData({ ...formData, costCenter: e.target.value })} className="w-full p-4 bg-gray-50 border-none rounded-2xl font-medium text-gray-900 appearance-none">
              <option value="">Centro de Custo</option>
              {MOCK_COST_CENTERS.map(cc => <option key={cc.id} value={cc.id}>{cc.name}</option>)}
            </select>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900">Descreva a <br/>finalidade</h2>
            <textarea autoFocus value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-6 bg-gray-50 border-none rounded-3xl font-medium text-gray-900 h-48 resize-none" />
          </div>
        )}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900">Anexe o <br/>comprovante</h2>
            {!formData.image ? (
              <button onClick={handleCapture} className="w-full aspect-[3/4] border-2 border-dashed border-gray-200 rounded-[40px] flex flex-col items-center justify-center gap-4 bg-gray-50 active:bg-gray-100 transition-colors">
                <div className="w-20 h-20 bg-blue-100 text-[#0B68FF] rounded-full flex items-center justify-center shadow-lg"><Camera size={32} /></div>
                <p className="font-bold text-gray-900">Tirar foto</p>
              </button>
            ) : (
              <div className="relative aspect-[3/4] bg-gray-100 rounded-[40px] overflow-hidden group border-2 border-blue-100">
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Button onClick={simulateOCR} className="w-full bg-white/90 backdrop-blur-md text-blue-600 border border-blue-100 h-14 rounded-2xl shadow-xl font-bold">
                    <Sparkles size={20} className="mr-2 text-blue-600" />Análise IA Inteligente
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-100 bg-white shrink-0">
        {step < 4 ? (
          <Button onClick={next} disabled={!isStepValid()} className="w-full h-16 rounded-[20px] shadow-lg text-lg flex items-center justify-center gap-2 bg-[#0B68FF]">Próximo <ChevronRight size={20} /></Button>
        ) : (
          <Button onClick={handleFinish} disabled={!formData.image} className="w-full h-16 rounded-[20px] bg-emerald-600 hover:bg-emerald-700 shadow-lg text-lg flex items-center justify-center gap-2">Finalizar e Enviar <Check size={20} /></Button>
        )}
      </div>
    </div>
  );
};
