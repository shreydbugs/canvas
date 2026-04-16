import { PRIMARY } from "../theme";
import { stats, techStack } from "../data";

export default function HeroSection({ theme, mounted }) {
  const { muted } = theme;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      {/* Status badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 14px",
          borderRadius: 40,
          background: `${PRIMARY}12`,
          border: `1px solid ${PRIMARY}25`,
          width: "fit-content",
          opacity: mounted ? 1 : 0,
          animation: mounted ? "fadeUp 0.6s ease forwards" : "none",
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 8px #22c55e",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            color: PRIMARY,
            letterSpacing: "0.1em",
          }}
        >
          Pune · Let’s Build
        </span>
      </div>

      {/* Heading block */}
      <div
        style={{ animation: mounted ? "fadeUp 0.7s 0.1s ease both" : "none" }}
      >
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(3.8rem, 7.5vw, 6.5rem)",
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            marginBottom: 6,
          }}
        >
          Shreyash
          <br />
          <span style={{ color: PRIMARY }}>Dev</span>
        </h1>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 500,
            color: muted,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          // Full-Stack Engineer
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{ animation: mounted ? "fadeUp 0.7s 0.2s ease both" : "none" }}
      >
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 17,
            fontWeight: 400,
            lineHeight: 1.7,
            color: muted,
            maxWidth: 440,
          }}
        >
          I build backend systems and digital products that stay fast, reliable,
          and easy to scale.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          borderTop: `1px solid ${PRIMARY}15`,
          borderBottom: `1px solid ${PRIMARY}15`,
          padding: "20px 0",
          animation: mounted ? "fadeUp 0.7s 0.3s ease both" : "none",
        }}
      >
        {stats.map(({ value, label }, i) => (
          <div
            key={label}
            style={{
              flex: 1,
              paddingLeft: i === 0 ? 0 : 24,
              borderLeft: i === 0 ? "none" : `1px solid ${PRIMARY}15`,
            }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 30,
                fontWeight: 700,
                color: PRIMARY,
                letterSpacing: "-0.03em",
              }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.14em",
                color: muted,
                textTransform: "uppercase",
                marginTop: 3,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ animation: mounted ? "fadeUp 0.7s 0.5s ease both" : "none" }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: muted,
            marginBottom: 10,
          }}
        >
          // Stack
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {techStack.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.08em",
                padding: "5px 12px",
                borderRadius: 20,
                background: `${PRIMARY}10`,
                border: `1px solid ${PRIMARY}20`,
                color: PRIMARY,
                cursor: "default",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${PRIMARY}22`;
                e.currentTarget.style.borderColor = `${PRIMARY}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${PRIMARY}10`;
                e.currentTarget.style.borderColor = `${PRIMARY}20`;
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
