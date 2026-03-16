import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY_DARK = 'portfolio_dark_mode';
const STORAGE_KEY_COLOR = 'portfolio_skin_color';
const DEFAULT_COLOR = '#ec1839';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY_DARK) === 'true'; }
    catch { return false; }
  });

  const [skinColor, setSkinColor] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY_COLOR) || DEFAULT_COLOR; }
    catch { return DEFAULT_COLOR; }
  });

  // Apply dark class to <body>
  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    try { localStorage.setItem(STORAGE_KEY_DARK, isDark); } catch { /* noop */ }
  }, [isDark]);

  // Apply skin CSS variable to :root
  useEffect(() => {
    document.documentElement.style.setProperty('--skin-color', skinColor);
    try { localStorage.setItem(STORAGE_KEY_COLOR, skinColor); } catch { /* noop */ }
  }, [skinColor]);

  const toggleDark = useCallback(() => setIsDark((prev) => !prev), []);

  return { isDark, toggleDark, skinColor, setSkinColor };
}
