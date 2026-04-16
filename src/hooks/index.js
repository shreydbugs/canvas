import { useState, useEffect } from "react";

/** Reveals indices [0..count-1] one by one, each separated by `delay` ms. */
export function useStaggeredReveal(count, delay = 80) {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const timers = Array.from({ length: count }, (_, i) =>
      setTimeout(() => setVisible((v) => [...v, i]), 300 + i * delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [count, delay]);

  return visible;
}

/** Returns true after an initial mount delay (used to trigger CSS animations). */
export function useMounted(delay = 100) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return mounted;
}
