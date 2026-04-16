import { PRIMARY } from "../theme";
import { tickerItems } from "../data";

export default function Footer({ theme }) {
  const { bg, fg, muted, tickerBg } = theme;

  return (
    <footer style={{ position: "relative", zIndex: 1, marginTop: 80 }}>
      {/* Ticker strip */}
      <div
        style={{
          overflow: "hidden",
          borderTop: `1px solid ${PRIMARY}20`,
          borderBottom: `1px solid ${PRIMARY}20`,
          background: tickerBg,
          padding: "22px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            animation: "ticker 28s linear infinite",
            width: "max-content",
          }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 28,
                paddingRight: 28,
              }}
            >
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color: i % 2 === 0 ? fg : muted,
                }}
              >
                {item}
              </span>
              <span style={{ color: PRIMARY, fontWeight: 800, fontSize: 20 }}>
                •
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 48px",
          background: bg,
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: muted,
            textTransform: "uppercase",
          }}
        >
          © 2026 Shreyash Vishwasrao
        </p>
      </div>
    </footer>
  );
}
