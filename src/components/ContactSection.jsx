import { useState } from "react";
import { PRIMARY } from "../theme";

const contactMethods = [
  {
    label: "Email",
    value: "shreyash@shreyash.dev",
    href: "mailto:shreyash@shreyash.dev",
    icon: "✉",
  },
  {
    label: "Github",
    value: "github.com/shreyash",
    href: "#",
    icon: "⌥",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/shreyash",
    href: "#",
    icon: "◈",
  },
];

export default function ContactSection({ theme, visible }) {
  const { fg, muted, border } = theme;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [hoveredMethod, setHoveredMethod] = useState(null);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  };

  const inputBase = (field) => ({
    width: "100%",
    background: focused === field ? `${PRIMARY}06` : "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? PRIMARY : border}`,
    outline: "none",
    padding: "14px 0",
    fontFamily: "'Syne', sans-serif",
    fontSize: 15,
    fontWeight: 400,
    color: fg,
    transition: "border-color 0.2s, background 0.2s",
    resize: "none",
    display: "block",
  });

  return (
    <section
      id="contact"
      className="section-pad"
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
          03 / Contact
        </span>
        <div style={{ flex: 1, height: 1, background: `${PRIMARY}18` }} />
      </div>

      {/* ── Two-column layout ── */}
      <div className="two-col">
        {/* ── LEFT: heading + contact methods ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
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
              Let's build
              <br />
              <span style={{ color: PRIMARY }}>something.</span>
            </h2>
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 1.75,
                color: muted,
                maxWidth: 400,
              }}
            >
              Open to full-time roles, contracts, and interesting freelance
              work. If you have a project or position in mind, I'd like to hear
              about it.
            </p>
          </div>

          {/* Contact method rows */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: muted,
                opacity: 0.6,
                paddingBottom: 16,
                borderBottom: `1px solid ${border}`,
                marginBottom: 0,
              }}
            >
              // Reach me at
            </div>
            {contactMethods.map(({ label, value, href, icon }) => {
              const hov = hoveredMethod === label;
              return (
                <a
                  key={label}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 0",
                    borderBottom: `1px solid ${hov ? `${PRIMARY}20` : border}`,
                    textDecoration: "none",
                    color: "inherit",
                    transition: "border-color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredMethod(label)}
                  onMouseLeave={() => setHoveredMethod(null)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 16,
                        color: hov ? PRIMARY : `${PRIMARY}50`,
                        transition: "color 0.2s",
                        width: 24,
                        textAlign: "center",
                      }}
                    >
                      {icon}
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9,
                          fontWeight: 600,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: muted,
                          opacity: 0.5,
                          marginBottom: 4,
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: 15,
                          fontWeight: 600,
                          color: hov ? PRIMARY : fg,
                          transition: "color 0.2s",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      color: PRIMARY,
                      fontSize: 16,
                      opacity: hov ? 1 : 0,
                      transform: hov ? "translate(0,0)" : "translate(-6px, 6px)",
                      transition: "opacity 0.2s, transform 0.2s",
                    }}
                  >
                    ↗
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: form ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {sent ? (
            /* ── Success state ── */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 16,
                padding: "48px 40px",
                border: `1px solid ${PRIMARY}25`,
                borderRadius: 14,
                background: `${PRIMARY}06`,
                animation: "fadeUp 0.5s ease both",
                minHeight: 360,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: `${PRIMARY}15`,
                  border: `1px solid ${PRIMARY}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: PRIMARY,
                }}
              >
                ✓
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: fg,
                    marginBottom: 8,
                  }}
                >
                  Message sent.
                </div>
                <p
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 14,
                    color: muted,
                    lineHeight: 1.7,
                    maxWidth: 280,
                  }}
                >
                  Thanks for reaching out — I'll get back to you shortly.
                </p>
              </div>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                style={{
                  marginTop: 8,
                  background: "none",
                  border: `1px solid ${border}`,
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: muted,
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = muted; }}
              >
                Send another
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

              {/* Row: Name + Email */}
              <div className="contact-form-grid" style={{ display: "grid", gap: 32 }}>
                {[
                  { field: "name",  label: "Name",  type: "text",  placeholder: "John Doe" },
                  { field: "email", label: "Email", type: "email", placeholder: "john@co.com" },
                ].map(({ field, label, type, placeholder }) => (
                  <div key={field}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        fontWeight: 600,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: focused === field ? PRIMARY : muted,
                        opacity: focused === field ? 1 : 0.55,
                        marginBottom: 4,
                        transition: "color 0.2s, opacity 0.2s",
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[field]}
                      onChange={handleChange(field)}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputBase(field),
                        "::placeholder": { color: `${muted}60` },
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: focused === "message" ? PRIMARY : muted,
                    opacity: focused === "message" ? 1 : 0.55,
                    marginBottom: 4,
                    transition: "color 0.2s, opacity 0.2s",
                  }}
                >
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about the project or role..."
                  value={form.message}
                  onChange={handleChange("message")}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  style={inputBase("message")}
                />
              </div>

              {/* Submit */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: muted,
                    letterSpacing: "0.1em",
                    opacity: 0.4,
                  }}
                >
                  Response within 24h
                </span>
                <button
                  className="hire-btn"
                  onClick={handleSubmit}
                  disabled={sending || !form.name || !form.email || !form.message}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 24px",
                    borderRadius: 8,
                    border: "none",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0d1b23",
                    background: PRIMARY,
                    cursor: sending || !form.name || !form.email || !form.message ? "not-allowed" : "pointer",
                    opacity: !form.name || !form.email || !form.message ? 0.45 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {sending ? (
                    <>
                      <span
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          border: "2px solid #0d1b2360",
                          borderTopColor: "#0d1b23",
                          animation: "spin 0.7s linear infinite",
                          display: "inline-block",
                        }}
                      />
                      Sending
                    </>
                  ) : (
                    <>Send Message <span style={{ fontSize: 14 }}>→</span></>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
