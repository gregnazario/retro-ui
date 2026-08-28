let windowStack = 100;

/** Shared z-order counter so clicked/dragged windows rise above their siblings. */
export function bumpWindowStack(): number {
  windowStack += 1;
  return windowStack;
}
