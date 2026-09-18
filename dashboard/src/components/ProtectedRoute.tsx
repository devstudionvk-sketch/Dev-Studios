import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { dataSource } from '../lib/dataSource';

export const ProtectedRoute: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    dataSource.checkSession().then(setAuthenticated);
  }, []);

  if (authenticated === null) {
    return <div className="flex min-h-screen items-center justify-center bg-ink-950 text-paper-dim">Loading…</div>;
  }

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};
