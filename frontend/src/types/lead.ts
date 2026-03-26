export type Lead = {
  id: number;
  name: string;
  email: string;
  company: string;
  website: string;
  summary?: string | null;
  email_subject?: string | null;
  email_body?: string | null;
};