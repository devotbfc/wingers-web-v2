// Dead-simple deterministic pickup code generator. Ported verbatim from
// wing-app/src/lib/pickup-code.ts. Server-authoritative in HTTP mode; this
// only runs in the mock.

export function mkPickupCode(seq: number): string {
  const letter = String.fromCharCode(65 + (Math.floor(seq / 9) % 26));
  const digit = (seq % 9) + 1;
  return `${letter}${digit}`;
}
