import React, { FormEvent, useState } from 'react';
import { Check, CircleAlert, Github, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { useInView } from '../lib/useInView';
import { SERVICES } from '../data/services';

const CONTACT_METHODS = [
  { label: 'Email', icon: Mail },
  { label: 'Phone', icon: Phone },
  { label: 'WhatsApp', icon: MessageCircle }
];

export const Contact: React.FC = () => {
  const [service, setService] = useState('');
  const [contactMethod, setContactMethod] = useState('Email');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { ref, inView } = useInView<HTMLElement>(0.1);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus('sending');
    setMessage('');
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong.');
      formElement.reset();
      setService('');
      setContactMethod('Email');
      setStatus('success');
      setMessage('Thanks — your enquiry is on its way. We’ll be in touch soon.');
    } catch {
      setStatus('error');
      setMessage('We couldn’t send your enquiry just now. Please try again in a moment or email us directly.');
    }
  };

  const inputClass = 'mt-2 w-full rounded-2xl border-2 border-white/15 bg-black px-5 py-3.5 text-sm text-paper outline-none transition-colors placeholder:text-paper-faint hover:border-white/25 focus:border-lime focus:ring-2 focus:ring-lime/20';
  const labelClass = 'text-sm font-medium text-paper-dim';
  const groupLabelClass = 'flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-paper-faint';

  return (
    <section ref={ref} id="contact" className={`reveal-group scroll-mt-24 border-t border-white/10 px-6 py-24 lg:px-10 lg:py-28 ${inView ? 'is-in-view' : ''}`}>
      <div className="mx-auto max-w-3xl">
        <div className="reveal-item text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lime">Contact</p>
          <h2 className="mt-5 font-display text-4xl font-black leading-[0.94] tracking-tighter text-paper sm:text-5xl">Let's solve a business challenge.</h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-paper-dim">Tell us what you need to improve, build, or launch. Share a few details and we'll follow up through the contact method you prefer.</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <a href="mailto:devstudionvk@gmail.com" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper-dim transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
              <Mail className="h-4 w-4" /> devstudionvk@gmail.com
            </a>
            <a href="https://github.com/devstudionvk-sketch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-paper-dim transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>

        <form onSubmit={submit} className="reveal-item mt-12 rounded-3xl border-2 border-white/15 bg-black p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-10" noValidate>
          <div className={groupLabelClass}>
            <span className="text-lime">01</span> About you
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>Full name<input name="name" required autoComplete="name" className={inputClass} placeholder="Your full name" /></label>
            <label className={labelClass}>Gmail address<input name="email" required type="email" autoComplete="email" className={inputClass} placeholder="you@gmail.com" /></label>
          </div>

          <div className={`${groupLabelClass} mt-10 border-t border-white/10 pt-8`}>
            <span className="text-lime">02</span> How to reach you
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {CONTACT_METHODS.map(({ label, icon: Icon }) => (
              <label key={label} className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3.5 text-[11px] font-mono font-bold uppercase tracking-wider transition-colors ${contactMethod === label ? 'bg-paper text-ink-950' : 'border border-white/20 text-paper hover:border-paper'}`}>
                <input type="radio" name="contactMethod" value={label} checked={contactMethod === label} onChange={() => setContactMethod(label)} className="sr-only" />
                <Icon className="h-3.5 w-3.5" /> {label}
              </label>
            ))}
          </div>
          {contactMethod !== 'Email' && (
            <label className={`mt-5 block ${labelClass}`}>{contactMethod} number<input name="contactDetail" required className={inputClass} placeholder={contactMethod === 'WhatsApp' ? '+91 00000 00000' : 'Your phone number'} /></label>
          )}

          <div className={`${groupLabelClass} mt-10 border-t border-white/10 pt-8`}>
            <span className="text-lime">03</span> The project
          </div>
          <label className={`mt-5 block ${labelClass}`}>What can we help with?
            <select name="service" value={service} required onChange={(event) => setService(event.target.value)} className={inputClass}>
              <option value="" disabled>Select a service</option>
              {SERVICES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          {service === 'Other' && <label className={`mt-5 block ${labelClass}`}>Tell us about it<textarea name="serviceNotes" required rows={4} className={inputClass} placeholder="What are you looking to build or solve?" /></label>}
          <label className={`mt-5 block ${labelClass}`}>Anything else? <span className="text-paper-faint">Optional</span><textarea name="notes" rows={4} className={inputClass} placeholder="Context, timing, links, or anything else that could help." /></label>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 border-t border-white/10 pt-8">
            <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 rounded-full bg-paper px-8 py-4 text-[11px] font-mono font-bold uppercase tracking-wider text-ink-950 transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
              {status === 'sending' ? 'Sending…' : 'Send enquiry'} {status === 'success' ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            </button>
            {message && (
              <div
                key={status}
                role={status === 'error' ? 'alert' : 'status'}
                aria-live="polite"
                className={`contact-feedback w-full ${status === 'success' ? 'contact-feedback--success' : 'contact-feedback--error'}`}
              >
                <span className="contact-feedback__icon" aria-hidden="true">
                  {status === 'success' ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <CircleAlert className="h-4 w-4" strokeWidth={2.5} />}
                </span>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]">{status === 'success' ? 'Enquiry sent' : 'Delivery issue'}</p>
                  <p className="mt-1 text-sm leading-relaxed">{message}</p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
