
export enum UserRole {
  COLABORADOR = 'colaborador',
  APPROVER = 'approver',
  FINANCE = 'finance',
  ADMIN = 'admin'
}

export enum ExpenseStatus {
  RASCUNHO = 'rascunho',
  ENVIADO = 'enviado',
  EM_APROVACAO = 'em aprovação',
  APROVADO = 'aprovado',
  EM_VALIDACAO = 'em validação',
  PROGRAMADO = 'programado',
  PAGO = 'pago',
  REJEITADO = 'rejeitado',
  AJUSTE_SOLICITADO = 'ajuste solicitado'
}

export interface Company {
  id: string;
  name: string;
  slug: string;
}

export interface UserProfile {
  user_id: string;
  company_id: string;
  full_name: string;
  email: string;
  role: UserRole;
  manager_id?: string;
  manager_name?: string;
  cpf?: string;
}

export interface CostCenter {
  id: string;
  company_id: string;
  name: string;
  code: string;
  active: boolean;
}

export interface Category {
  id: string;
  company_id: string;
  name: string;
  rule_limit_amount?: number;
  requires_km?: boolean;
}

export interface Policy {
  id: string;
  company_id: string;
  name: string;
  retroactive_days: number;
  mandatory_attachment: boolean;
  max_amount_per_expense?: number;
}

export interface Expense {
  id: string;
  company_id: string;
  created_by: string;
  cost_center_id: string;
  category_id: string;
  amount: number;
  date_competencia: string;
  description: string;
  is_corporate_card: boolean;
  status: ExpenseStatus;
  current_approver_user_id?: string;
  duplicate_score: number;
  created_at: string;
  attachment_url?: string;
}

export interface AdvanceLedger {
  id: string;
  user_id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  created_at: string;
}

export interface ExpenseEvent {
  id: string;
  expense_id: string;
  actor_user_id: string;
  action: string;
  from_status?: ExpenseStatus;
  to_status?: ExpenseStatus;
  note?: string;
  created_at: string;
}

export interface ExpenseComment {
  id: string;
  expense_id: string;
  user_id: string;
  user_name: string;
  text: string;
  created_at: string;
}
