import type { PrideFestival } from '../constants/festivals';

interface FestivalSubheaderProps {
  festival: PrideFestival;
}

export function FestivalSubheader({ festival }: FestivalSubheaderProps) {
  return (
    <p className="festival-subheader">
      {festival.dateRange} · {festival.location}
    </p>
  );
}
