import { navItems } from "../../data/portfolioData";

export default function Aside({ activeSection, onNavigate, isOpen, onToggle }) {
  return (
    <>
      <div
        className={`nav-toggler${isOpen ? " open" : ""}`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-label="Toggle navigation"
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
      >
        <span />
      </div>

      <aside className={`aside${isOpen ? " open" : ""}`}>
        <div className="logo">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
          >
            <span>A</span> <span>A</span>
          </a>
        </div>

        <ul className="nav" role="navigation">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
              >
                <i className={item.icon} aria-hidden="true" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {isOpen && (
        <div
          onClick={onToggle}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9,
            background: "rgba(0,0,0,0.4)",
          }}
        />
      )}
    </>
  );
}
