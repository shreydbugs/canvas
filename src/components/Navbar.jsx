import { PRIMARY } from "../theme";
import { navLinks, socialLinks } from "../data";

export default function Navbar({ theme, dark, onToggleDark }) {
  const { navBg, border, muted, fg } = theme;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
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
      {/* ── Left: Logo ── */}
      <a
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: fg,
          }}
        >
          &#62;&#95;
        </span>
      </a>

      {/* ── Right: everything else ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
          {navLinks.map((item) => (
            <a
              key={item}
              href="#"
              className="nav-link"
              style={{
                fontFamily: "'Inter', 'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: muted,
                textDecoration: "none",
                padding: "0 14px",
                height: 64,
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s",
                letterSpacing: "0",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = fg)}
              onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Thin divider */}
        <div
          style={{ width: 1, height: 18, background: border, marginRight: 6 }}
        />

        {/* Social text links */}
        {socialLinks.map(({ label, href }, i) => (
          <span key={label} style={{ display: "flex", alignItems: "center" }}>
            <a
              href={href}
              style={{
                fontFamily: "'Inter', 'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: muted,
                textDecoration: "none",
                padding: "0 10px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = PRIMARY)}
              onMouseLeave={(e) => (e.currentTarget.style.color = muted)}
            >
              {label}
            </a>
            {i < socialLinks.length - 1 && (
              <span style={{ color: border, fontSize: 12 }}>·</span>
            )}
          </span>
        ))}

        {/* Thin divider */}
        <div
          style={{
            width: 1,
            height: 18,
            background: border,
            marginLeft: 6,
            marginRight: 10,
          }}
        />

        {/* Theme toggle — minimal icon button */}
        <button
          className="toggle-btn"
          onClick={onToggleDark}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "transparent",
            border: `1px solid ${border}`,
            color: muted,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            transition: "border-color 0.2s, color 0.2s",
            marginRight: 6,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = PRIMARY;
            e.currentTarget.style.color = PRIMARY;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = border;
            e.currentTarget.style.color = muted;
          }}
        >
          {dark ? "☀" : "◑"}
        </button>

        {/* CV — ghost pill */}
        <a
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "7px 16px",
            borderRadius: 8,
            border: `1px solid ${border}`,
            fontFamily: "'Syne', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: muted,
            textDecoration: "none",
            transition: "border-color 0.2s, color 0.2s, background 0.2s",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = PRIMARY;
            e.currentTarget.style.color = PRIMARY;
            e.currentTarget.style.background = `${PRIMARY}08`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = border;
            e.currentTarget.style.color = muted;
            e.currentTarget.style.background = "transparent";
          }}
        >
          CV <span style={{ fontSize: 10, opacity: 0.6 }}>↓</span>
        </a>

        {/* Hire Me — filled, slightly rounded rect not pill */}
        <button
          className="hire-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "7px 18px",
            borderRadius: 8,
            border: "none",
            fontFamily: "'Syne', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: "#0d1b23",
            background: PRIMARY,
            cursor: "pointer",
            letterSpacing: "0",
          }}
        >
          Hire Me
        </button>
      </div>
    </header>
  );
}
