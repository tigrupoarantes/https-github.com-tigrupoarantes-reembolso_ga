
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BackofficeLayout } from './components/Layout/BackofficeLayout';
import { MobileLayout } from './components/Layout/MobileLayout';
import { Dashboard } from './pages/backoffice/Dashboard';
import { Inbox } from './pages/backoffice/Inbox';
import { Approvals } from './pages/backoffice/Approvals';
import { Reports } from './pages/backoffice/Reports';
import { Users } from './pages/backoffice/Users';
import { Settings } from './pages/backoffice/Settings';
import { Advances } from './pages/backoffice/Advances';
import { Reconciliation } from './pages/backoffice/Reconciliation';
import { AuditTrail } from './pages/backoffice/AuditTrail';
import { PwaHome } from './pages/pwa/PwaHome';
import { NewExpense } from './pages/pwa/NewExpense';
import { Wallet } from './pages/pwa/Wallet';
import { Notifications } from './pages/pwa/Notifications';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/backoffice/dashboard" replace />} />
        <Route path="/backoffice" element={<BackofficeLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="advances" element={<Advances />} />
          <Route path="reconciliation" element={<Reconciliation />} />
          <Route path="audit" element={<AuditTrail />} />
        </Route>
        <Route path="/pwa" element={<MobileLayout />}>
          <Route path="home" element={<PwaHome />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<div className="p-6 font-bold text-gray-900 h-full flex items-center justify-center">Em Breve: Perfil & SSO</div>} />
        </Route>
        <Route path="/pwa/new" element={<NewExpense />} />
        <Route path="/pwa/wallet" element={<Wallet />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
