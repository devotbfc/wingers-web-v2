export function pence(p: number): string {
  const sign = p < 0 ? "-" : "";
  const abs = Math.abs(p);
  const pounds = Math.floor(abs / 100);
  const rem = (abs % 100).toString().padStart(2, "0");
  return `${sign}£${pounds}.${rem}`;
}

export function pts(n: number): string {
  return `${n} pts`;
}
