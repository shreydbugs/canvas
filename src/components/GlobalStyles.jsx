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
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 0 0   ${PRIMARY}40; }
        50%       { box-shadow: 0 0 0 8px ${PRIMARY}00; }
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

      /* ── Project rows ── */
      .project-row { position: relative; cursor: pointer; transition: padding 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
      .project-row:hover { padding-left: 18px; }

      .project-arrow {
        opacity: 0;
        transform: translateX(-14px);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .project-row:hover .project-arrow { opacity: 1; transform: translateX(0); }
    `}</style>
  );
}
