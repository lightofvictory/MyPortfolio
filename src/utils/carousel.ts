/** Keep an index inside a circular list. */
export function wrapIndex(index: number, count: number) {
  return (index + count) % count;
}

/** Shortest signed distance from the active item. */
export function circularDistance(index: number, active: number, count: number) {
  return ((index - active + count + Math.floor(count / 2)) % count) - Math.floor(count / 2);
}
