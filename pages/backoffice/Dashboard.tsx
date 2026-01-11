
import React from 'react';
import { TrendingUp, Clock, AlertTriangle, CheckCircle2, Zap, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { COLORS } from '../../constants';

const agingData = [
  { name: 'Set', tempo: 4.2 },
  { name: 'Out', tempo: 3.8 },
  { name: 'Nov', tempo: 2.1 },
];

const categoryData = [
  { name: 'Alimentação', value: 4500, color: '#0B68FF' },
  { name: 'Transporte', value: 3200, color: '#00A86B' },
  { name: 'Hospedagem', value: 2800, color: '#8B5CF6' },
  { name: 'Outros', value: 1450, color: '#94A3B8' },
];

const data = [
  { name: 'Seg', total: 4000 },
  { name: 'Ter', total: 3000 },
  { name: 'Qua', total: 2000 },
  { name: 'Qui', total: 2780 },
  { name: 'Sex', total: 1890 },
];

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className={`text-xs mt-1 font-medium ${sub.includes('-') ? 'text-green-500' : 'text-red-500'}`}>
          {sub}
        </p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel de Performance</h1>
          <p className="text-gray-500 text-sm">Visão estratégica e saúde financeira da empresa.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
             <BarChart3 size={16} /> Relatório Gerencial
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tempo Médio Aprovação" 
          value="2.1 dias" 
          sub="-1.7 dias vs mês ant." 
          icon={Zap} 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="Total Reembolsos" 
          value="R$ 12.450,00" 
          sub="-4.2% queda" 
          icon={TrendingUp} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Alertas de Fraude" 
          value="3" 
          sub="3 pendentes" 
          icon={AlertTriangle} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Taxa de Rejeição" 
          value="8.5%" 
          sub="+1.2% conformidade" 
          icon={CheckCircle2} 
          color="bg-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico de Volume */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-900">Volume Financeiro (Diário)</h3>
            <select className="text-xs font-bold text-blue-600 bg-blue-50 border-none rounded-lg px-2 py-1 outline-none">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="total" stroke={COLORS.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Categorias */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-8 flex items-center gap-2">
            <PieChartIcon size={18} className="text-blue-600" /> Por Categoria
          </h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-2">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <span className="text-gray-500">{cat.name}</span>
                </div>
                <span className="font-bold text-gray-900">R$ {cat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Aging */}
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-8">Aging (Dias p/ Aprovar)</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="tempo" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
             <p className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest mb-1">Meta de Eficiência</p>
             <p className="text-xs text-indigo-900 font-medium">Você está <span className="font-bold">45% mais rápido</span> que a média do setor este mês.</p>
          </div>
        </div>

        {/* Alertas de Antifraude */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
           <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-500" /> Últimas Ocorrências Antifraude
           </h3>
           <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                        <AlertTriangle size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Possível Duplicidade Detectada</p>
                        <p className="text-xs text-gray-500 font-medium">Despesa #E443 · Colaborador: Ricardo Oliveira</p>
                      </div>
                   </div>
                   <button className="text-xs font-bold text-orange-600 hover:underline uppercase tracking-wider">Verificar</button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
