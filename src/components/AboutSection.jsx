import { PRIMARY } from "../theme";

const skills = [
  { category: "// Backend", items: ["Node.js", "Express", "REST APIs", "WebSockets", "MongoDB", "PostgreSQL"] },
  { category: "// Frontend", items: ["React", "Redux", "Tailwind", "Vite", "HTML/CSS"] },
  { category: "// DevOps", items: ["Docker", "Git", "CI/CD", "Linux", "Cloudflare"] },
];

const timeline = [
  {
    year: "2024",
    role: "Full-Stack Engineer",
    place: "Freelance · Remote",
    desc: "Architected and shipped end-to-end products — from REST APIs and auth systems to polished React UIs.",
  },
  {
    year: "2023",
    role: "Backend Developer",
    place: "Contract · Pune",
    desc: "Built microservices, designed DB schemas, and integrated third-party APIs for a logistics SaaS platform.",
  },
  {
    year: "2022",
    role: "Junior Developer",
    place: "Internship · Pune",
    desc: "Contributed to a Node/Express codebase, wrote unit tests, and debugged production issues under pressure.",
  },
];

export default function AboutSection({ theme, visible }) {
  const { bg, fg, muted, border } = theme;

  return (
    <section className="section-pad"
      id="about"
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        
        borderTop: `1px solid ${border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* ── Section label ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 64,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: PRIMARY,
          }}
        >
          01 / About
        </span>
        <div style={{ flex: 1, height: 1, background: `${PRIMARY}18` }} />
      </div>

      {/* ── Two-column layout ── */}
      <div className="two-col">
        {/* ── LEFT: bio + skills ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {/* Heading */}
          <div>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                marginBottom: 24,
              }}
            >
              Building things
              <br />
              <span style={{ color: PRIMARY }}>that last.</span>
            </h2>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 1.75,
                color: muted,
                maxWidth: 460,
              }}
            >
              I'm Shreyash — a backend-focused engineer based in Pune. I care
              deeply about system design, clean APIs, and code that's easy to
              reason about six months later.
            </p>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 1.75,
                color: muted,
                maxWidth: 460,
                marginTop: 14,
              }}
            >
              When I'm not deep in a Node.js service or debugging a race
              condition, I'm experimenting with browser extensions and UI
              side-projects that push creative limits.
            </p>
          </div>

          {/* Skills grid */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              borderTop: `1px solid ${PRIMARY}15`,
              paddingTop: 32,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: muted,
                marginBottom: 4,
              }}
            >
              // Skills
            </div>
            {skills.map(({ category, items }) => (
              <div key={category} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: `${PRIMARY}80`,
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                    paddingTop: 4,
                    minWidth: 88,
                  }}
                >
                  {category}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map((item) => (
                    <span
                      key={item}
                      className="skill-tag"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        padding: "4px 11px",
                        borderRadius: 20,
                        background: `${PRIMARY}0e`,
                        border: `1px solid ${PRIMARY}1a`,
                        color: PRIMARY,
                        cursor: "default",
                        transition: "background 0.2s, border-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${PRIMARY}20`;
                        e.currentTarget.style.borderColor = `${PRIMARY}45`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${PRIMARY}0e`;
                        e.currentTarget.style.borderColor = `${PRIMARY}1a`;
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: timeline ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: muted,
              marginBottom: 28,
            }}
          >
            // Timeline
          </div>

          {/* vertical line */}
          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div
              style={{
                position: "absolute",
                left: 6,
                top: 8,
                bottom: 8,
                width: 1,
                background: `${PRIMARY}20`,
              }}
            />

            {timeline.map(({ year, role, place, desc }, i) => (
              <div
                key={year}
                className="timeline-entry"
                style={{
                  position: "relative",
                  paddingBottom: i < timeline.length - 1 ? 44 : 0,
                  cursor: "default",
                }}
              >
                {/* dot */}
                <div
                  style={{
                    position: "absolute",
                    left: -22,
                    top: 8,
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    border: `1.5px solid ${PRIMARY}`,
                    background: bg,
                    transition: "background 0.2s, box-shadow 0.2s",
                  }}
                  className="timeline-dot"
                />

                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      color: PRIMARY,
                    }}
                  >
                    {year}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: fg,
                    }}
                  >
                    {role}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: `${PRIMARY}70`,
                    letterSpacing: "0.1em",
                    marginBottom: 10,
                  }}
                >
                  {place}
                </div>

                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: muted,
                    maxWidth: 380,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA block */}
          <div
            style={{
              marginTop: 52,
              padding: "28px 32px",
              border: `1px solid ${PRIMARY}1a`,
              borderRadius: 12,
              background: `${PRIMARY}06`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: fg,
                  marginBottom: 4,
                }}
              >
                Open to work
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: muted,
                  letterSpacing: "0.08em",
                }}
              >
                Full-time · Remote · Contract
              </div>
            </div>
            <a
              href="#"
              className="hire-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 22px",
                borderRadius: 8,
                border: "none",
                fontFamily: "'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#0d1b23",
                background: PRIMARY,
                cursor: "pointer",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
