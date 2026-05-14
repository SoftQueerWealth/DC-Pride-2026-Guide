export function communityPerkTypeLabel(type: string): string {
  const normalized = type.toLowerCase().replace(/\s+/g, ' ').trim();

  if (normalized.includes('brow')) return 'Brows';
  if (normalized.includes('wellness') || normalized.includes('acupuncture')) return 'Wellness';
  if (normalized.includes('barber') || normalized.includes('hair') || normalized.includes('braid')) return 'Hair';

  return type;
}
