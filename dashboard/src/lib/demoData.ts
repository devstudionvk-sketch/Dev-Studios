import type { Client, ContactRequest, Meeting } from '../types/dashboard';

export const DEMO_REQUESTS: ContactRequest[] = [
  {
    id: 'demo-req-1',
    name: 'Ananya Rao',
    email: 'ananya@brightlane.co',
    contact_method: 'Email',
    contact_detail: null,
    service: 'Web Development',
    service_notes: null,
    notes: 'Looking to rebuild our marketing site before a fundraise in Q1.',
    status: 'new',
    email_sent: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
  },
  {
    id: 'demo-req-2',
    name: 'Marcus Webb',
    email: 'marcus@fieldstonelogistics.com',
    contact_method: 'WhatsApp',
    contact_detail: '+1 415 555 0182',
    service: 'Custom Software',
    service_notes: null,
    notes: 'Need a dispatch dashboard for our trucking fleet, ~15 drivers.',
    status: 'contacted',
    email_sent: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  },
  {
    id: 'demo-req-3',
    name: 'Priya Chandran',
    email: 'priya@loopcollective.in',
    contact_method: 'Phone',
    contact_detail: '+91 98765 43210',
    service: 'Other',
    service_notes: 'Want an internal tool to track freelancer payouts across projects.',
    notes: null,
    status: 'new',
    email_sent: false,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  }
];

export const DEMO_CLIENTS: Client[] = [
  {
    id: 'demo-client-1',
    organization_name: 'Fieldstone Logistics',
    contact_info: 'Marcus Webb — marcus@fieldstonelogistics.com',
    project_description: 'Dispatch dashboard with live driver tracking and route assignment.',
    amount_charged: 8500,
    website_url: 'https://fieldstonelogistics.com',
    github_url: 'https://github.com/devstudionvk-sketch/fieldstone-dispatch',
    status: 'active',
    service: 'Custom Software',
    notes: 'Second phase (billing module) tentatively starting next quarter.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString()
  },
  {
    id: 'demo-client-2',
    organization_name: 'Loop Collective',
    contact_info: 'Priya Chandran — priya@loopcollective.in',
    project_description: 'Freelancer payout tracker with monthly CSV export.',
    amount_charged: null,
    website_url: null,
    github_url: null,
    status: 'lead',
    service: 'Other',
    notes: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: 'demo-client-3',
    organization_name: 'Brightlane Studio',
    contact_info: 'hello@brightlane.co',
    project_description: 'Full marketing site rebuild — Next.js, CMS-driven blog, investor deck landing page.',
    amount_charged: 4200,
    website_url: 'https://brightlane.co',
    github_url: 'https://github.com/devstudionvk-sketch/brightlane-site',
    status: 'completed',
    service: 'Web Development',
    notes: 'Happy client — asked to be a reference for future pitches.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString()
  },
  {
    id: 'demo-client-4',
    organization_name: 'Harbor & Co.',
    contact_info: 'ops@harborandco.com',
    project_description: 'iOS + Android app for appointment booking with push notifications.',
    amount_charged: 12000,
    website_url: 'https://harborandco.com',
    github_url: null,
    status: 'active',
    service: 'Mobile Apps',
    notes: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString()
  },
  {
    id: 'demo-client-5',
    organization_name: 'Nettle & Vine',
    contact_info: 'sam@nettleandvine.co',
    project_description: 'Brand refresh and redesign of the online ordering flow.',
    amount_charged: 2600,
    website_url: null,
    github_url: null,
    status: 'on_hold',
    service: 'UI/UX Design',
    notes: 'Paused while they finalize new branding direction.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString()
  }
];

const at = (dayOffset: number, hour: number, minute = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

export const DEMO_MEETINGS: Meeting[] = [
  { id: 'demo-meet-1', contact_name: 'Priya Chandran', organization: 'Loop Collective', contact_info: '+91 98765 43210', meeting_at: at(0, 11), duration_minutes: 30, stage: 'confirmed', is_client: false, notes: 'Cold call follow-up: walk through payout tracker.', created_at: at(-2, 9) },
  { id: 'demo-meet-2', contact_name: 'Marcus Webb', organization: 'Fieldstone Logistics', contact_info: 'marcus@fieldstonelogistics.com', meeting_at: at(1, 15), duration_minutes: 60, stage: 'scheduled', is_client: true, notes: 'Billing module scoping.', created_at: at(-5, 9) },
  { id: 'demo-meet-3', contact_name: 'Sam Ortiz', organization: 'Nettle & Vine', contact_info: 'sam@nettleandvine.co', meeting_at: at(-3, 10, 30), duration_minutes: 45, stage: 'completed', is_client: true, notes: null, created_at: at(-8, 9) },
  { id: 'demo-meet-4', contact_name: 'Dana Whitfield', organization: null, contact_info: null, meeting_at: at(3, 9), duration_minutes: 30, stage: 'follow_up', is_client: false, notes: 'Cold call, asked us to ring back.', created_at: at(-1, 9) }
];
