export const STAGES = ['scheduled', 'confirmed', 'completed', 'follow_up', 'no_show', 'cancelled'];

const clean = (value, maxLength) => typeof value === 'string' ? value.trim().slice(0, maxLength) || null : null;

export const parseMeeting = (body) => {
  const contactName = clean(body?.contact_name, 200);
  const meetingAt = new Date(body?.meeting_at);
  const duration = Number(body?.duration_minutes ?? 30);
  const stage = body?.stage || 'scheduled';

  if (!contactName) return { error: 'Contact name is required.' };
  if (Number.isNaN(meetingAt.getTime())) return { error: 'A valid meeting date and time is required.' };
  if (!Number.isInteger(duration) || duration < 5 || duration > 1440) return { error: 'Duration must be between 5 and 1440 minutes.' };
  if (!STAGES.includes(stage)) return { error: 'Invalid stage.' };

  return {
    values: {
      contact_name: contactName,
      organization: clean(body?.organization, 200),
      contact_info: clean(body?.contact_info, 300),
      meeting_at: meetingAt.toISOString(),
      duration_minutes: duration,
      stage,
      is_client: body?.is_client === true,
      notes: clean(body?.notes, 4000)
    }
  };
};
