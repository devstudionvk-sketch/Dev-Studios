import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleAlert, LogIn } from 'lucide-react';
import { dataSource } from '../lib/dataSource';

export const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setMessage('');
    try {
      await dataSource.login(password);
      navigate('/dashboard/requests', { replace: true });
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  };

  const inputClass = 'mt-2 w-full rounded-2xl border-2 border-white/15 bg-black px-5 py-3.5 text-sm text-paper outline-none transition-colors placeholder:text-paper-faint hover:border-white/25 focus:border-lime focus:ring-2 focus:ring-lime/20';

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6 text-paper">
      <div className="w-full max-w-sm">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">Dev Studios</p>
        <h1 className="mt-3 font-display text-3xl font-black tracking-tighter">Team dashboard</h1>
        {dataSource.isDemo && <p className="mt-3 text-sm text-paper-dim">Demo mode — any password signs you in.</p>}
        <form onSubmit={submit} className="mt-8 rounded-3xl border-2 border-white/15 bg-black p-6" noValidate>
          <label className="text-sm font-medium text-paper-dim">
            Password
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-8 py-4 text-[11px] font-mono font-bold uppercase tracking-wider text-ink-950 transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
          >
            {status === 'sending' ? 'Signing in…' : 'Sign in'} <LogIn className="h-4 w-4" />
          </button>

          {message && (
            <div role="alert" className="contact-feedback contact-feedback--error mt-5">
              <span className="contact-feedback__icon" aria-hidden="true">
                <CircleAlert className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <p className="text-sm leading-relaxed">{message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
