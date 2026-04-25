import { useState } from "react";
import { PRIMARY } from "../theme";
import { navLinks, socialLinks } from "../data";

export default function Navbar({ theme, dark, onToggleDark, onAboutClick, onWorksClick, onContactClick }) {
  const { navBg, border, muted, fg } = theme;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (item, e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (item === "About")   onAboutClick?.();
    if (item === "Works")   onWorksClick?.();
    if (item === "Contact") onContactClick?.();
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          height: 64,
          background: navBg,
          backdropFilter: "blur(24px)",
          borderBottom: `1px solid ${border}`,
          animation: "fadeIn 0.8s ease forwards",
        }}
      >
        {/* ── Logo ── */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em", color: fg }}>
            &#62;&#95;
          </span>
        </a>

        {/* ── Right: desktop items ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

          {/* Nav links — desktop */}
          <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
            {navLinks.map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => handleNavClick(item, e)}
                className="nav-link"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: muted,
                  textDecoration: "none",
                  padding: "0 14px",
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = fg)}
                onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="desktop-divider" style={{ width: 1, height: 18, background: border, marginRight: 6 }} />

          {/* Social links — desktop */}
          <div className="desktop-social" style={{ display: "flex", alignItems: "center" }}>
            {socialLinks.map(({ label, href }, i) => (
              <span key={label} style={{ display: "flex", alignItems: "center" }}>
                <a
                  href={href}
                  style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 500, color: muted, textDecoration: "none", padding: "0 10px", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = PRIMARY)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
                >
                  {label}
                </a>
                {i < socialLinks.length - 1 && <span style={{ color: border, fontSize: 12 }}>·</span>}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="desktop-divider" style={{ width: 1, height: 18, background: border, marginLeft: 6, marginRight: 10 }} />

          {/* Theme toggle */}
          <button
            className="toggle-btn"
            onClick={onToggleDark}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: "transparent",
              border: `1px solid ${border}`,
              color: muted, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14,
              transition: "border-color 0.2s, color 0.2s",
              marginRight: 6,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted; }}
          >
            {dark ? "☀" : "◑"}
          </button>

          {/* CV — desktop */}
          <a
            href="#"
            className="desktop-cv"
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "7px 16px", borderRadius: 8,
              border: `1px solid ${border}`,
              fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600,
              color: muted, textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s, background 0.2s",
              background: "transparent",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY; e.currentTarget.style.background = `${PRIMARY}08`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted; e.currentTarget.style.background = "transparent"; }}
          >
            CV <span style={{ fontSize: 10, opacity: 0.6 }}>↓</span>
          </a>

          {/* Hire Me — desktop */}
          <button
            className="hire-btn desktop-hire"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "7px 18px", borderRadius: 8, border: "none",
              fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
              color: "#0d1b23", background: PRIMARY, cursor: "pointer",
            }}
          >
            Hire Me
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <div className="hamburger-line" style={{
              background: menuOpen ? PRIMARY : muted,
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }} />
            <div className="hamburger-line" style={{
              background: menuOpen ? PRIMARY : muted,
              opacity: menuOpen ? 0 : 1,
            }} />
            <div className="hamburger-line" style={{
              background: menuOpen ? PRIMARY : muted,
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        style={{ background: navBg }}
      >
        {navLinks.map((item) => (
          <a
            key={item}
            href="#"
            className="mobile-menu-link"
            onClick={(e) => handleNavClick(item, e)}
            style={{ color: fg }}
          >
            {item}
          </a>
        ))}
        <div className="mobile-menu-socials">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: muted,
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#"
            style={{
              marginLeft: "auto",
              fontFamily: "'Syne', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: "#0d1b23",
              background: PRIMARY,
              padding: "6px 16px",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}
