import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardLayout } from './pages/DashboardLayout';
import { DashboardRequests } from './pages/DashboardRequests';
import { DashboardClients } from './pages/DashboardClients';
import { DashboardClientForm } from './pages/DashboardClientForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="requests" replace />} />
            <Route path="requests" element={<DashboardRequests />} />
            <Route path="clients" element={<DashboardClients />} />
            <Route path="clients/new" element={<DashboardClientForm />} />
            <Route path="clients/:id/edit" element={<DashboardClientForm />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
