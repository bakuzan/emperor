import { useState, useEffect } from 'react';

export function useMountedOnClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Why window.__theme ? If no theme then js is disabled!
    if ((window as any).__theme) {
      setMounted(true);
    }
  }, []);

  return mounted;
}
