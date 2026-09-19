import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { dataSource } from '../lib/dataSource';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  const logout = async () => {
    setSigningOut(true);
    try {
      await dataSource.logout();
    } finally {
      navigate('/login', { replace: true });
    }
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-mono text-[11px] font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-lime' : 'text-paper-dim hover:text-paper'}`;

  return (
    <div className="min-h-screen bg-ink-950 text-paper">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 lg:px-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">Dev Studios</p>
          <h1 className="mt-1 font-display text-xl font-black tracking-tighter">Dashboard</h1>
        </div>
        <nav className="flex items-center gap-6">
          <NavLink to="/requests" className={linkClass}>Requests</NavLink>
          <NavLink to="/meetings" className={linkClass}>Meetings</NavLink>
          <NavLink to="/clients" className={linkClass}>Clients</NavLink>
          <button
            type="button"
            onClick={logout}
            disabled={signingOut}
            className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-paper-dim transition-colors hover:text-paper disabled:opacity-60"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </nav>
      </header>

      <main className="px-6 py-10 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
};
