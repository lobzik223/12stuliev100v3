export function isProbablyMobile(): boolean {
  if (typeof window === 'undefined') return false;

  const coarsePointer =
    typeof window.matchMedia === 'function' &&
    (window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches);

  const touchPoints =
    typeof navigator !== 'undefined' &&
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 0;

  // Самый надёжный вариант на iOS — visualViewport (если есть).
  const vvWidth = window.visualViewport?.width;
  const viewportWidth =
    typeof vvWidth === 'number' && vvWidth > 0 ? vvWidth : window.innerWidth;

  // На iPhone screen.width обычно остаётся “физической” (375/390), даже если viewport стал ~980.
  const screenWidth = window.screen?.width;
  const effectiveWidth =
    typeof screenWidth === 'number' && screenWidth > 0
      ? Math.min(viewportWidth, screenWidth)
      : viewportWidth;

  // UA-data если доступно (Chrome/Android) — дополнительная подсказка.
  const uaMobile = (navigator as any)?.userAgentData?.mobile === true;

  return uaMobile || coarsePointer || touchPoints || effectiveWidth < 768;
}


