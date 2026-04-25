import { PRIMARY } from "../theme";

export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: ${PRIMARY}30; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: ${PRIMARY}; }

      @keyframes ticker {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 0 0   ${PRIMARY}40; }
        50%       { box-shadow: 0 0 0 8px ${PRIMARY}00; }
      }
      @keyframes cursorBlink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }
      @keyframes menuSlideDown {
        from { opacity: 0; transform: translateY(-12px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* ── Navbar ── */
      .nav-link { position: relative; transition: color 0.2s; }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -2px; left: 0;
        width: 0; height: 1.5px;
        background: ${PRIMARY};
        transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .nav-link:hover::after { width: 100%; }

      .toggle-btn { transition: all 0.3s; }
      .toggle-btn:hover { transform: rotate(180deg); }

      /* ── Hire button shimmer ── */
      .hire-btn { position: relative; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
      .hire-btn:hover { transform: scale(1.04); box-shadow: 0 0 20px ${PRIMARY}50; }
      .hire-btn::after {
        content: '';
        position: absolute; inset: 0;
        background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
        transform: translateX(-100%);
        transition: transform 0.5s;
      }
      .hire-btn:hover::after { transform: translateX(100%); }

      /* ── CTA button ── */
      .cta-btn { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
      .cta-btn:hover {
        background: ${PRIMARY} !important;
        color: white !important;
        transform: scale(1.03);
        box-shadow: 0 8px 24px ${PRIMARY}35;
      }

      /* ── About section ── */
      .timeline-entry:hover .timeline-dot {
        background: ${PRIMARY} !important;
        box-shadow: 0 0 10px ${PRIMARY}60;
      }

      /* ── Project rows ── */
      .project-row { position: relative; cursor: pointer; transition: padding 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
      .project-row:hover { padding-left: 18px; }
      .project-arrow {
        opacity: 0;
        transform: translateX(-14px);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .project-row:hover .project-arrow { opacity: 1; transform: translateX(0); }

      /* ══════════════════════════════════════
         MOBILE MENU
      ══════════════════════════════════════ */
      .mobile-menu {
        display: none;
        position: fixed;
        top: 64px;
        left: 0; right: 0;
        z-index: 49;
        padding: 24px 24px 32px;
        animation: menuSlideDown 0.25s ease both;
        border-bottom: 1px solid ${PRIMARY}18;
        backdrop-filter: blur(24px);
      }
      .mobile-menu.open { display: flex; flex-direction: column; gap: 0; }
      .mobile-menu-link {
        font-family: 'Syne', sans-serif;
        font-size: 22px;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: inherit;
        text-decoration: none;
        padding: 14px 0;
        border-bottom: 1px solid ${PRIMARY}12;
        display: block;
        transition: color 0.2s;
      }
      .mobile-menu-link:last-child { border-bottom: none; }
      .mobile-menu-link:hover { color: ${PRIMARY}; }
      .mobile-menu-socials {
        display: flex;
        gap: 16px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid ${PRIMARY}12;
      }
      .hamburger-btn {
        display: none;
        background: none;
        border: 1px solid ${PRIMARY}25;
        border-radius: 8px;
        width: 36px;
        height: 36px;
        cursor: pointer;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        padding: 0;
        transition: border-color 0.2s;
      }
      .hamburger-btn:hover { border-color: ${PRIMARY}; }
      .hamburger-line {
        width: 16px;
        height: 1.5px;
        border-radius: 2px;
        transition: transform 0.25s, opacity 0.25s;
      }

      /* ══════════════════════════════════════
         LAYOUT HELPERS — used across sections
      ══════════════════════════════════════ */
      .section-pad {
        padding: 120px 48px 100px;
      }
      .two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 80px;
        align-items: start;
        max-width: 1304px;
        margin: 0 auto;
        width: 100%;
      }
      .hero-wrap {
        padding-top: 64px;
        padding-left: 48px;
        padding-right: 48px;
        max-width: 1400px;
        margin: 0 auto;
        width: 100%;
      }
      .hero-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        min-height: calc(100vh - 64px);
        align-items: center;
        width: 100%;
      }
      .hero-left {
        padding-right: 64px;
      }
      .works-grid {
        grid-template-columns: 56px 1fr 220px 80px 40px;
      }
      .works-tag { display: block; }
      .works-year { display: block; }
      .contact-form-grid {
        grid-template-columns: 1fr 1fr;
      }
      .code-panel { display: flex; }

      /* ══════════════════════════════════════
         TABLET  ≤ 1024px
      ══════════════════════════════════════ */
      @media (max-width: 1024px) {
        .section-pad { padding: 100px 36px 80px; }
        .hero-wrap { padding-left: 36px; padding-right: 36px; }
        .hero-left { padding-right: 40px; }
        .two-col { gap: 52px; }

        .works-grid { grid-template-columns: 44px 1fr 160px 64px 32px; }

        .desktop-social { display: none; }
        .desktop-divider { display: none; }
        .desktop-cv { display: none; }
      }

      /* ══════════════════════════════════════
         MOBILE  ≤ 768px
      ══════════════════════════════════════ */
      @media (max-width: 768px) {
        /* Navbar */
        .desktop-nav  { display: none !important; }
        .desktop-social { display: none !important; }
        .desktop-divider { display: none !important; }
        .desktop-cv   { display: none !important; }
        .desktop-hire { display: none !important; }
        .hamburger-btn { display: flex; }

        /* Layout */
        .section-pad  { padding: 88px 20px 72px; }
        .hero-wrap    { padding-top: 64px; padding-left: 20px; padding-right: 20px; }

        /* Hero */
        .hero-grid    { grid-template-columns: 1fr; min-height: auto; padding: 48px 0 40px; }
        .hero-left    { padding-right: 0; }
        .code-panel   { display: none; }

        /* Two-col → single col */
        .two-col      { grid-template-columns: 1fr; gap: 48px; }

        /* Works table */
        .works-grid   { grid-template-columns: 36px 1fr 32px; }
        .works-tag    { display: none; }
        .works-year   { display: none; }

        /* Contact form */
        .contact-form-grid { grid-template-columns: 1fr; gap: 28px; }
      }

      /* ══════════════════════════════════════
         SMALL MOBILE  ≤ 480px
      ══════════════════════════════════════ */
      @media (max-width: 480px) {
        .section-pad { padding: 80px 16px 64px; }
        .hero-wrap   { padding-left: 16px; padding-right: 16px; }
      }
    `}</style>
  );
}
