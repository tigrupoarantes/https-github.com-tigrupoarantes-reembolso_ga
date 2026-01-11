
import React, { useState } from 'react';
import { Settings as SettingsIcon, Tag, Landmark, Scale, Plus, Edit2, ToggleLeft, ToggleRight, Share2, Globe, MessageCircle, Activity, Link2 } from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_COST_CENTERS, MOCK_POLICIES } from '../../services/mockData';
import { Button } from '../../components/UI/Button';
import { Badge } from '../../components/UI/Badge';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'ccs' | 'policies' | 'integrations'>('categories');
  const [isTesting, setIsTesting] = useState(false);

  const testWebhook = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      alert("Webhook testado com sucesso! Conexão ativa com Microsoft Teams.");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configurações Gerais</h1>
          <p className="text-gray-500 text-sm">Gerencie os parâmetros globais da empresa.</p>
        </div>
      </div>

      <div className="flex gap-1 border-b border-gray-100 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('categories')}
          className={`px-6 py-3 text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'categories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
        >
          <Tag size={16} /> Categorias
        </button>
        <button 
          onClick={() => setActiveTab('ccs')}
          className={`px-6 py-3 text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'ccs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
        >
          <Landmark size={16} /> Centros de Custo
        </button>
        <button 
          onClick={() => setActiveTab('policies')}
          className={`px-6 py-3 text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'policies' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
        >
          <Scale size={16} /> Políticas
        </button>
        <button 
          onClick={() => setActiveTab('integrations')}
          className={`px-6 py-3 text-sm font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'integrations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
        >
          <Share2 size={16} /> Integrações
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {activeTab === 'categories' && (
          <div className="divide-y divide-gray-50">
            <div className="p-4 bg-gray-50/50 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-600 uppercase">Lista de Categorias</span>
              <Button size="sm" variant="outline" className="h-8"><Plus size={14} className="mr-1"/> Nova Categoria</Button>
            </div>
            {MOCK_CATEGORIES.map(cat => (
              <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50">
                <div>
                  <p className="text-sm font-bold text-gray-900">{cat.name}</p>
                  <p className="text-xs text-gray-500">Limite sugerido: {cat.rule_limit_amount ? `R$ ${cat.rule_limit_amount}` : 'Sem limite'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600"><Edit2 size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="p-8 space-y-8 animate-in fade-in duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Teams Integration */}
                <div className="p-6 border border-gray-100 rounded-[24px] space-y-6 shadow-sm">
                   <div className="flex items-center justify-between">
                      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                         <MessageCircle size={28} />
                      </div>
                      <div className="text-right">
                        <Badge className="bg-emerald-100 text-emerald-700">Ativo</Badge>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Último sinal: 2m atrás</p>
                      </div>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900 text-lg">Microsoft Teams</h4>
                      <p className="text-sm text-gray-500 mt-1">Envio automático de alertas de aprovação e relatórios de conformidade.</p>
                   </div>
                   <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                         <span>Webhook URL</span>
                         <span className="text-blue-600 cursor-pointer">Editar</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between overflow-hidden">
                         <span className="text-xs text-gray-500 truncate mr-4">https://hooks.teams.microsoft.com/v1/491...</span>
                         <Link2 size={14} className="text-gray-400 shrink-0" />
                      </div>
                   </div>
                   <div className="flex gap-3">
                      <Button onClick={testWebhook} isLoading={isTesting} variant="outline" className="flex-1 text-xs py-2">Testar Conexão</Button>
                      <Button variant="ghost" className="text-xs py-2 text-red-500">Desativar</Button>
                   </div>
                </div>

                {/* SSO Integration */}
                <div className="p-6 border border-gray-100 rounded-[24px] space-y-6 shadow-sm opacity-60">
                   <div className="flex items-center justify-between">
                      <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
                         <Globe size={28} />
                      </div>
                      <Badge className="bg-gray-100 text-gray-400">Inativo</Badge>
                   </div>
                   <div>
                      <h4 className="font-bold text-gray-900 text-lg">SSO (Microsoft Entra ID)</h4>
                      <p className="text-sm text-gray-500 mt-1">Autenticação centralizada e provisionamento automático de usuários.</p>
                   </div>
                   <div className="p-4 bg-blue-50/50 rounded-xl flex items-center gap-3">
                      <Activity size={18} className="text-blue-600" />
                      <p className="text-xs text-blue-700 font-medium leading-relaxed">Disponível apenas no plano Enterprise. Entre em contato para ativar.</p>
                   </div>
                   <Button variant="primary" className="w-full h-11 text-sm bg-blue-600">Falar com Consultor</Button>
                </div>
             </div>
             
             {/* Developer Section */}
             <div className="p-8 bg-[#0F1724] rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32"></div>
                <div className="relative z-10 flex items-center gap-6">
                   <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                      <Share2 size={28} />
                   </div>
                   <div>
                      <p className="text-lg font-bold">API Pública GA Reembolsos</p>
                      <p className="text-gray-400 text-sm mt-1">Integre seu ERP ou sistema contábil diretamente via nossa API REST.</p>
                   </div>
                </div>
                <div className="relative z-10 flex gap-4">
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 font-bold border-none h-11 px-6">Gerar Chave API</Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 h-11 px-6 border border-white/20">Documentação</Button>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'ccs' && (
          <div className="divide-y divide-gray-50">
            <div className="p-4 bg-gray-50/50 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-600 uppercase">Centros de Custo</span>
              <Button size="sm" variant="outline" className="h-8"><Plus size={14} className="mr-1"/> Importar ERP</Button>
            </div>
            {MOCK_COST_CENTERS.map(cc => (
              <div key={cc.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50">
                <div>
                  <p className="text-sm font-bold text-gray-900">{cc.name}</p>
                  <p className="text-xs text-gray-500">Código: {cc.code}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={cc.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {cc.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                  <button className="text-gray-400 hover:text-gray-600"><ToggleRight size={24} className="text-blue-500"/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="p-6 space-y-8">
            {MOCK_POLICIES.map(policy => (
              <div key={policy.id} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">{policy.name}</h3>
                  <Badge className="bg-blue-100 text-blue-700">Política Ativa</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-100 rounded-xl space-y-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Regras de Lançamento</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Dias retroativos permitidos</span>
                      <span className="font-bold text-gray-900">{policy.retroactive_days} dias</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Anexo obrigatório</span>
                      <span className="font-bold text-emerald-600">{policy.mandatory_attachment ? 'Sim' : 'Não'}</span>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl space-y-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Limites de Alçada</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Teto por despesa</span>
                      <span className="font-bold text-gray-900">R$ {policy.max_amount_per_expense?.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full border-dashed">Editar Regras de Governança</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
