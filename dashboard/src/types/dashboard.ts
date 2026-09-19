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
  archived_at: string | null;
  archived_reason: string | null;
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

export const MEETING_STAGES = ['scheduled', 'confirmed', 'rescheduled', 'completed', 'follow_up', 'no_show', 'cancelled'];

export type Meeting = {
  id: string;
  contact_name: string;
  organization: string | null;
  contact_info: string | null;
  meeting_at: string;
  duration_minutes: number;
  stage: string;
  is_client: boolean;
  notes: string | null;
  follow_up_of: string | null;
  created_at: string;
};

export type MeetingInput = {
  contact_name: string;
  organization: string;
  contact_info: string;
  meeting_at: string;
  duration_minutes: number;
  stage: string;
  is_client: boolean;
  notes: string;
  follow_up_of: string | null;
};

export type MeetingPrefill = {
  contact_name?: string;
  organization?: string;
  contact_info?: string;
  is_client?: boolean;
  notes?: string;
  follow_up_of?: string;
};

// Passed through router state when a meeting is started from a request or as a follow-up.
export type MeetingFormState = {
  prefill?: MeetingPrefill;
  startsAt?: string;
  banner?: string;
  requestId?: string;
};

export const meetingToInput = (meeting: Meeting): MeetingInput => ({
  contact_name: meeting.contact_name,
  organization: meeting.organization ?? '',
  contact_info: meeting.contact_info ?? '',
  meeting_at: meeting.meeting_at,
  duration_minutes: meeting.duration_minutes,
  stage: meeting.stage,
  is_client: meeting.is_client,
  notes: meeting.notes ?? '',
  follow_up_of: meeting.follow_up_of
});
