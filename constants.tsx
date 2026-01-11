
import React from 'react';
import { ExpenseStatus } from './types';

export const COLORS = {
  primary: '#0B68FF',
  secondary: '#00A86B',
  warning: '#FFB020',
  danger: '#E53935',
  bg: '#F7F9FB',
  surface: '#FFFFFF',
  textPrimary: '#0F1724',
  textSecondary: '#6B7280',
};

export const STATUS_CONFIG: Record<ExpenseStatus, { color: string; label: string }> = {
  [ExpenseStatus.RASCUNHO]: { color: 'bg-gray-100 text-gray-600', label: 'Rascunho' },
  [ExpenseStatus.ENVIADO]: { color: 'bg-blue-100 text-blue-600', label: 'Enviado' },
  [ExpenseStatus.EM_APROVACAO]: { color: 'bg-indigo-100 text-indigo-600', label: 'Em Aprovação' },
  [ExpenseStatus.APROVADO]: { color: 'bg-emerald-100 text-emerald-600', label: 'Aprovado' },
  [ExpenseStatus.EM_VALIDACAO]: { color: 'bg-purple-100 text-purple-600', label: 'Em Validação' },
  [ExpenseStatus.PROGRAMADO]: { color: 'bg-amber-100 text-amber-600', label: 'Programado' },
  [ExpenseStatus.PAGO]: { color: 'bg-green-100 text-green-600', label: 'Pago' },
  [ExpenseStatus.REJEITADO]: { color: 'bg-red-100 text-red-600', label: 'Rejeitado' },
  [ExpenseStatus.AJUSTE_SOLICITADO]: { color: 'bg-orange-100 text-orange-600', label: 'Ajuste Solicitado' },
};
