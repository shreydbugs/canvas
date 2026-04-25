import { useState } from "react";
import { PRIMARY } from "../theme";
import { projects } from "../data";

export default function WorksSection({ theme, visible }) {
  const { fg, muted, border } = theme;
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section
      id="works"
      className="section-pad"
      style={{
        position: "relative", zIndex: 1, width: "100%",
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        borderTop: `1px solid ${border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 64 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: PRIMARY }}>
          02 / Works
        </span>
        <div style={{ flex: 1, height: 1, background: `${PRIMARY}18` }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: `${PRIMARY}50`, letterSpacing: "0.1em" }}>
          {String(projects.length).padStart(2, "0")} projects
        </span>
      </div>

      <div style={{ maxWidth: 1304, margin: "0 auto", width: "100%" }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
          fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: 56,
        }}>
          Selected<br /><span style={{ color: PRIMARY }}>Work</span>
        </h2>

        {/* Table header */}
        <div className="works-grid" style={{
          display: "grid", gap: 0,
          padding: "0 0 12px",
          borderBottom: `1px solid ${border}`,
        }}>
          {["#", "Project", "Focus", "Year", ""].map((col, i) => (
            <span key={i} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase", color: muted, opacity: 0.5,
            }}
            className={col === "Focus" ? "works-tag" : col === "Year" ? "works-year" : ""}
            >
              {col}
            </span>
          ))}
        </div>

        {/* Rows */}
        {projects.map((proj, i) => {
          const hov = hoveredIdx === i;
          return (
            <a
              key={proj.id}
              href="#"
              className="works-grid"
              style={{
                display: "grid", gap: 0,
                alignItems: "center",
                padding: "26px 0",
                borderBottom: `1px solid ${hov ? `${PRIMARY}20` : border}`,
                textDecoration: "none", color: "inherit",
                transition: "border-color 0.2s",
                cursor: "pointer",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : `translateX(-${16 + i * 4}px)`,
                transitionDelay: `${0.05 * i}s`,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600,
                color: hov ? PRIMARY : `${PRIMARY}50`, letterSpacing: "0.1em", transition: "color 0.2s",
              }}>
                {proj.id}
              </span>
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(1.2rem, 2.2vw, 1.9rem)",
                fontWeight: 800, letterSpacing: "-0.03em",
                color: hov ? PRIMARY : fg,
                transition: "color 0.2s, transform 0.2s",
                transform: hov ? "translateX(6px)" : "translateX(0)",
                display: "block",
              }}>
                {proj.name}
              </span>
              <span className="works-tag" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: hov ? fg : muted, transition: "color 0.2s",
              }}>
                {proj.tag}
              </span>
              <span className="works-year" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: muted, opacity: 0.6 }}>
                {proj.year}
              </span>
              <span style={{
                color: PRIMARY, fontSize: 18,
                opacity: hov ? 1 : 0,
                transform: hov ? "translate(0,0)" : "translate(-6px,6px)",
                transition: "opacity 0.2s, transform 0.2s",
              }}>
                ↗
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
