export function paisa(value: string): bigint {
  if (!/^(0|[1-9]\d*)(\.\d{1,2})?$/.test(value)) throw new Error('Enter a nonnegative amount with at most two decimals');
  const [whole, fraction = ''] = value.split('.');
  return BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'));
}
export function formatPaisa(value: bigint): string {
  const sign = value < 0n ? '-' : '';
  const abs = value < 0n ? -value : value;
  return `${sign}${abs / 100n}.${String(abs % 100n).padStart(2, '0')}`;
}
export function allocate(total: bigint, weights: bigint[], ids: string[]): bigint[] {
  if (total < 0n || weights.some(w => w < 0n) || weights.length !== ids.length) throw new Error('Invalid allocation');
  const sum = weights.reduce((a, b) => a + b, 0n);
  if (sum === 0n) { if (total !== 0n) throw new Error('No eligible allocation weights'); return weights.map(() => 0n); }
  const result = weights.map(w => total * w / sum);
  let remainder = total - result.reduce((a, b) => a + b, 0n);
  const order = weights.map((w, i) => ({i, rem: total * w % sum, id: ids[i]})).sort((a,b) => a.rem === b.rem ? a.id.localeCompare(b.id) : a.rem > b.rem ? -1 : 1);
  for (let i = 0; remainder > 0n; i++, remainder--) result[order[i].i]++;
  return result;
}
export function daysInMonth(month: Date): number { return new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate(); }
export function monthDate(value: string): Date { if (!/^\d{4}-\d{2}$/.test(value)) throw new Error('Invalid month'); return new Date(`${value}-01T00:00:00.000Z`); }
export function date(value: string): Date { if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Invalid date'); const d = new Date(`${value}T00:00:00.000Z`); if (isNaN(d.getTime()) || d.toISOString().slice(0,10) !== value) throw new Error('Invalid date'); return d; }
