export function clampNumber(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

export function toPercent(value: number, total: number) {
  if (total <= 0) return 0;
  return clampNumber((value / total) * 100, 0, 100);
}