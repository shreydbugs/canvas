import { PRIMARY } from "../theme";
import { stats } from "../data";

export default function HeroSection({ theme, mounted }) {
  const { fg, muted, border } = theme;

  return (
    <div className="hero-grid">
      {/* ── LEFT: copy ── */}
      <div className="hero-left" style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Status badge */}
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 40,
            background: `${PRIMARY}12`, border: `1px solid ${PRIMARY}25`,
            width: "fit-content",
            opacity: mounted ? 1 : 0,
            animation: mounted ? "fadeUp 0.6s ease forwards" : "none",
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, color: PRIMARY, letterSpacing: "0.1em" }}>
            Pune · Available Now
          </span>
        </div>

        {/* Name */}
        <div style={{ animation: mounted ? "fadeUp 0.7s 0.1s ease both" : "none" }}>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(3rem, 6.5vw, 6rem)",
            fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.04em", marginBottom: 16,
          }}>
            Shreyash
            <br />
            <span style={{ color: PRIMARY }}>Vishwasrao</span>
          </h1>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500,
            color: muted, letterSpacing: "0.18em", textTransform: "uppercase",
          }}>
            // Backend · Full-Stack Engineer
          </div>
        </div>

        {/* Bio */}
        <div style={{ animation: mounted ? "fadeUp 0.7s 0.2s ease both" : "none" }}>
          <p style={{
            fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 400,
            lineHeight: 1.75, color: muted, maxWidth: 400,
          }}>
            I build backend systems and digital products that stay fast, reliable, and easy to scale — from API design to production.
          </p>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex",
          borderTop: `1px solid ${PRIMARY}15`, borderBottom: `1px solid ${PRIMARY}15`,
          padding: "20px 0",
          animation: mounted ? "fadeUp 0.7s 0.3s ease both" : "none",
        }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} style={{
              flex: 1, paddingLeft: i === 0 ? 0 : 24,
              borderLeft: i === 0 ? "none" : `1px solid ${PRIMARY}15`,
            }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: PRIMARY, letterSpacing: "-0.03em" }}>
                {value}
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.14em", color: muted, textTransform: "uppercase", marginTop: 3 }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: mounted ? "fadeUp 0.7s 0.4s ease both" : "none" }}>
          <a href="#works" className="hire-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 22px", borderRadius: 8, border: "none",
            fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
            color: "#0d1b23", background: PRIMARY, cursor: "pointer", textDecoration: "none",
          }}>
            View Work <span style={{ fontSize: 14 }}>↓</span>
          </a>
          <a href="#" className="cta-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "9px 20px", borderRadius: 8,
            border: `1px solid ${border}`,
            fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600,
            color: muted, textDecoration: "none", background: "transparent", cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY; e.currentTarget.style.background = `${PRIMARY}08`; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted; e.currentTarget.style.background = "transparent"; }}
          >
            Download CV <span style={{ fontSize: 10, opacity: 0.6 }}>↓</span>
          </a>
        </div>
      </div>

      {/* ── RIGHT: code panel (hidden on mobile via CSS) ── */}
      <div className="code-panel" style={{ alignItems: "center", justifyContent: "center", paddingLeft: 32 }}>
        <DecorativePanel theme={theme} mounted={mounted} />
      </div>
    </div>
  );
}

const codeLines = (muted) => [
  { indent: 0, text: "const engineer = {",        color: "fg" },
  { indent: 1, text: 'name: "Shreyash",',          color: "primary" },
  { indent: 1, text: 'focus: "backend",',           color: "primary" },
  { indent: 1, text: "stack: [",                    color: "fg" },
  { indent: 2, text: '"Node.js", "Express",',       color: "muted" },
  { indent: 2, text: '"PostgreSQL", "MongoDB",',    color: "muted" },
  { indent: 2, text: '"Docker", "REST",',           color: "muted" },
  { indent: 1, text: "],",                           color: "fg" },
  { indent: 1, text: "available: true,",            color: "green" },
  { indent: 0, text: "};",                           color: "fg" },
  { indent: 0, text: "",                             color: "fg" },
  { indent: 0, text: "// currently building",       color: "comment" },
  { indent: 0, text: "// scalable systems.",        color: "comment" },
];

function DecorativePanel({ theme, mounted }) {
  const { fg, muted, border } = theme;

  const resolveColor = (key) => ({
    fg, primary: `${PRIMARY}cc`, muted, green: "#22c55e", comment: `${muted}80`,
  }[key] || fg);

  return (
    <div style={{ width: "100%", maxWidth: 380, animation: mounted ? "fadeUp 0.9s 0.35s ease both" : "none" }}>
      <div style={{
        borderRadius: 14, border: `1px solid ${border}`,
        background: `${PRIMARY}04`, overflow: "hidden", backdropFilter: "blur(8px)",
      }}>
        {/* Window chrome */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "14px 18px", borderBottom: `1px solid ${border}` }}>
          {["#ff5f57","#febc2e","#28c840"].map((c) => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.8 }} />
          ))}
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: muted, letterSpacing: "0.08em", marginLeft: 8, opacity: 0.6 }}>
            profile.js
          </span>
        </div>
        {/* Code body */}
        <div style={{ padding: "20px 24px 24px", lineHeight: 1.85 }}>
          {codeLines(muted).map((line, i) => (
            <div key={i} style={{ display: "flex" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: `${muted}35`, minWidth: 24, userSelect: "none", paddingRight: 16, textAlign: "right" }}>
                {i + 1}
              </span>
              <span style={{ whiteSpace: "pre" }}>{"  ".repeat(line.indent)}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: resolveColor(line.color), letterSpacing: "0.02em" }}>
                {line.text}
              </span>
            </div>
          ))}
          <div style={{ display: "flex", marginTop: 4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: `${muted}35`, minWidth: 24, userSelect: "none", paddingRight: 16, textAlign: "right" }}>
              {codeLines(muted).length + 1}
            </span>
            <span style={{ display: "inline-block", width: 8, height: 14, background: PRIMARY, opacity: 0.8, animation: "cursorBlink 1.1s ease-in-out infinite", borderRadius: 1, marginTop: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
