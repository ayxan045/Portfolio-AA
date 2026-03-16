import { useState, useCallback } from 'react';

export function useActiveSection(initial = 'home') {
  const [activeSection, setActiveSection] = useState(initial);
  const [prevSection, setPrevSection] = useState(null);

  const navigateTo = useCallback((sectionId) => {
    setActiveSection((current) => {
      setPrevSection(current);
      return sectionId;
    });
  }, []);

  return { activeSection, prevSection, navigateTo };
}
