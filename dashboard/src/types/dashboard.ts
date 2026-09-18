export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  contact_method: string;
  contact_detail: string | null;
  service: string;
  service_notes: string | null;
  notes: string | null;
  status: string;
  email_sent: boolean;
  created_at: string;
};

export type Client = {
  id: string;
  organization_name: string;
  contact_info: string;
  project_description: string;
  amount_charged: number | null;
  website_url: string | null;
  github_url: string | null;
  status: string | null;
  service: string | null;
  notes: string | null;
  created_at: string;
};

export type ClientInput = {
  organization_name: string;
  contact_info: string;
  project_description: string;
  amount_charged: string;
  website_url: string;
  github_url: string;
  status: string;
  service: string;
  notes: string;
};
