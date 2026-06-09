function parseIsoDayDate(isoDate: string): Date | null {
  const match = isoDate.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  if (Number.isNaN(date.getTime())) return null;

  return date;
}

/** Month + day only, e.g. "Jun 8" */
export function formatDayDateLabel(isoDate: string): string {
  const parts = formatDayDateParts(isoDate);
  if (!parts) return '';

  return `${parts.month} ${parts.day}`;
}

export function formatDayDateParts(isoDate: string): { month: string; day: string } | null {
  const date = parseIsoDayDate(isoDate);
  if (!date) return null;

  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
  };
}

export function formatDayHeaderLabel(dayLabel: string, isoDate?: string): string {
  if (!isoDate) return dayLabel;

  const dayDateLabel = formatDayDateLabel(isoDate);
  return dayDateLabel ? `${dayLabel} · ${dayDateLabel}` : dayLabel;
}
