import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export function useTyped(strings = [], options = {}) {
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;

    const typed = new Typed(elRef.current, {
      strings,
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
      ...options,
    });

    return () => typed.destroy();
  }, [JSON.stringify(strings)]);

  return elRef;
}
