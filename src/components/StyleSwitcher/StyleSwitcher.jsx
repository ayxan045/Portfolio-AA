import { useCallback, useEffect, useState } from "react";
import { skinColors } from "../../data/portfolioData";

export default function StyleSwitcher({
  isDark,
  onToggleDark,
  skinColor,
  onSkinChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div className={`style-switcher${isOpen ? " open" : ""}`}>
      <div
        className="style-switcher-toggler s-icon"
        onClick={toggleOpen}
        role="button"
        tabIndex={0}
        aria-label="Toggle style switcher"
        onKeyDown={(e) => e.key === "Enter" && toggleOpen()}
      >
        <i className="fas fa-cog fa-spin" aria-hidden="true" />
      </div>

      <div
        className="day-night s-icon"
        onClick={onToggleDark}
        role="button"
        tabIndex={0}
        aria-label="Toggle dark mode"
        onKeyDown={(e) => e.key === "Enter" && onToggleDark()}
      >
        <i
          className={`fas ${isDark ? "fa-sun" : "fa-moon"}`}
          aria-hidden="true"
        />
      </div>

      <h4>Theme Colors</h4>

      <div className="colors">
        {skinColors.map((color) => (
          <span
            key={color.id}
            style={{
              backgroundColor: color.value,
              outline:
                skinColor === color.value
                  ? "2px solid var(--text-black-900)"
                  : "none",
              outlineOffset: "2px",
            }}
            onClick={() => onSkinChange(color.value)}
            role="button"
            tabIndex={0}
            aria-label={`Set theme color ${color.id}`}
            onKeyDown={(e) => e.key === "Enter" && onSkinChange(color.value)}
          />
        ))}
      </div>
    </div>
  );
}
