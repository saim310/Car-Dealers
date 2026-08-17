// Central yard → city/email mapping.
// Add a new yard here and every part of the site (grid cards, modals, email API) picks it up automatically.

export interface YardInfo {
  city: string;
  email: string;
}

export const YARD_MAP: Record<string, YardInfo> = {
  '1': { city: 'Maidstone', email: 'sales.maidstone@ukajapan.com.au' },
  '2': { city: 'Mordialloc', email: 'sales.mordialloc@ukajapan.com.au' },
  '4': { city: 'Slacks Creek', email: 'sales.brisbane@ukajapan.com.au' },
};

// Used whenever a car's yard has no dedicated inbox above (e.g. yard 3 / Melbourne).
export const FALLBACK_EMAIL = 'saim@ukajapan.com.au';

// Always CC'd on every form submission, in addition to the yard-specific inbox.
export const GENERAL_EMAIL = 'info@ukajapan.com.au';

/** Sales inbox for a given yard id. Falls back to FALLBACK_EMAIL when the yard has no dedicated inbox. */
export function getYardEmail(yard?: string | number | null): string {
  if (!yard) return FALLBACK_EMAIL;
  const info = YARD_MAP[String(yard)];
  return info ? info.email : FALLBACK_EMAIL;
}

/** Display city for a yard id, falling back to 'N/A' when the yard isn't in the map. Prefer the car's own `city` field first when calling this — only use this as a fallback. */
export function getYardCity(yard?: string | number | null): string {
  if (!yard) return 'N/A';
  const info = YARD_MAP[String(yard)];
  return info ? info.city : 'N/A';
}
