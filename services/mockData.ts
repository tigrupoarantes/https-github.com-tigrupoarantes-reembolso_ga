
import { Company, UserRole, UserProfile, CostCenter, Category, Expense, ExpenseStatus, Policy, AdvanceLedger } from '../types';

export const MOCK_COMPANIES: Company[] = [
  { id: 'c1', name: 'Grupo Arantes', slug: 'grupo-arantes' },
  { id: 'c2', name: 'Jarantes', slug: 'jarantes' },
];

export const MOCK_PROFILES: UserProfile[] = [
  { user_id: 'u1', company_id: 'c1', full_name: 'Ricardo Oliveira', email: 'ricardo@arantes.com', role: UserRole.FINANCE },
  { user_id: 'u2', company_id: 'c1', full_name: 'Ana Silva', email: 'ana.silva@arantes.com', role: UserRole.COLABORADOR, manager_id: 'u3', manager_name: 'Marcos Gestor' },
  { user_id: 'u3', company_id: 'c1', full_name: 'Marcos Gestor', email: 'marcos@arantes.com', role: UserRole.APPROVER },
  { user_id: 'u4', company_id: 'c1', full_name: 'Sérgio Admin', email: 'admin@arantes.com', role: UserRole.ADMIN },
];

export const MOCK_USER = MOCK_PROFILES[0];

export const MOCK_COST_CENTERS: CostCenter[] = [
  { id: 'cc1', company_id: 'c1', name: 'Tecnologia', code: '100.01', active: true },
  { id: 'cc2', company_id: 'c1', name: 'Marketing', code: '200.05', active: true },
  { id: 'cc3', company_id: 'c1', name: 'Vendas', code: '300.10', active: true },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', company_id: 'c1', name: 'Alimentação', rule_limit_amount: 80 },
  { id: 'cat2', company_id: 'c1', name: 'Transporte', requires_km: true },
  { id: 'cat3', company_id: 'c1', name: 'Hospedagem' },
];

export const MOCK_POLICIES: Policy[] = [
  { id: 'p1', company_id: 'c1', name: 'Política Padrão 2024', retroactive_days: 30, mandatory_attachment: true, max_amount_per_expense: 5000 },
];

export const MOCK_ADVANCE_LEDGER: AdvanceLedger[] = [
  { id: 'l1', user_id: 'u1', type: 'credit', amount: 1500, description: 'Adiantamento Viagem SP', created_at: '2023-11-01T10:00:00Z' },
  { id: 'l2', user_id: 'u1', type: 'debit', amount: 450, description: 'Prestação de contas: Hotel Arantes', created_at: '2023-11-18T15:00:00Z' },
  { id: 'l3', user_id: 'u1', type: 'credit', amount: 200, description: 'Complemento Refeição', created_at: '2023-11-20T09:00:00Z' },
];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: 'e1',
    company_id: 'c1',
    created_by: 'u1',
    cost_center_id: 'cc1',
    category_id: 'cat1',
    amount: 54.90,
    date_competencia: '2023-11-20',
    description: 'Almoço com cliente G4',
    is_corporate_card: false,
    status: ExpenseStatus.EM_VALIDACAO,
    duplicate_score: 0,
    created_at: new Date().toISOString(),
    attachment_url: 'https://picsum.photos/800/1200'
  },
  {
    id: 'e2',
    company_id: 'c1',
    created_by: 'u1',
    cost_center_id: 'cc2',
    category_id: 'cat3',
    amount: 450.00,
    date_competencia: '2023-11-18',
    description: 'Estadia Hotel Arantes',
    is_corporate_card: true,
    status: ExpenseStatus.PAGO,
    duplicate_score: 0.85,
    created_at: new Date().toISOString(),
    attachment_url: 'https://picsum.photos/800/1000'
  },
  {
    id: 'e3',
    company_id: 'c1',
    created_by: 'u1',
    cost_center_id: 'cc1',
    category_id: 'cat2',
    amount: 12.50,
    date_competencia: '2023-11-21',
    description: 'Uber para aeroporto',
    is_corporate_card: false,
    status: ExpenseStatus.ENVIADO,
    duplicate_score: 0.1,
    created_at: new Date().toISOString(),
    attachment_url: 'https://picsum.photos/700/900'
  }
];
