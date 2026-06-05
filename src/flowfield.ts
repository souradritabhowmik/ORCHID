export function flow(x: number, y: number, t: number): number {
  return Math.sin(x * 0.002 + t * 0.2) +
         Math.cos(y * 0.002 - t * 0.15);
}
