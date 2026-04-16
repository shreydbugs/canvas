import { useState, useRef, useEffect, useCallback } from "react";
import { PRIMARY } from "../theme";
import { projects } from "../data";

const SCROLL_THRESHOLD = 5; // show scroll UI when projects exceed this
const VISIBLE_COUNT = 5; // how many rows are visible in the wheel at once
const ITEM_HEIGHT = 80; // px — height of each row

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

export default function ProjectList({ theme, mounted, visibleProjects }) {
  const { fg, muted, border } = theme;

  const useWheel = projects.length > SCROLL_THRESHOLD;

  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartIdx = useRef(0);
  const containerRef = useRef(null);

  const maxIdx = projects.length - 1;

  // ── Keyboard navigation ──
  useEffect(() => {
    if (!useWheel) return;
    const onKey = (e) => {
      if (e.key === "ArrowDown") setActiveIdx((i) => clamp(i + 1, 0, maxIdx));
      if (e.key === "ArrowUp") setActiveIdx((i) => clamp(i - 1, 0, maxIdx));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [useWheel, maxIdx]);

  // ── Mouse wheel scroll ──
  const onWheel = useCallback(
    (e) => {
      if (!useWheel) return;
      e.preventDefault();
      setActiveIdx((i) => clamp(i + (e.deltaY > 0 ? 1 : -1), 0, maxIdx));
    },
    [useWheel, maxIdx],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !useWheel) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel, useWheel]);

  // ── Touch / drag scroll ──
  const onMouseDown = (e) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartIdx.current = activeIdx;
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const delta = Math.round(
      (dragStartY.current - e.clientY) / (ITEM_HEIGHT * 0.6),
    );
    setActiveIdx(clamp(dragStartIdx.current + delta, 0, maxIdx));
  };
  const onMouseUp = () => setIsDragging(false);

  // Translate so the active item sits at the vertical centre of the viewport
  const translateY =
    -(activeIdx * ITEM_HEIGHT) + ITEM_HEIGHT * Math.floor(VISIBLE_COUNT / 2);

  // ── Opacity / scale per distance from centre ──
  const itemStyle = (i) => {
    const dist = Math.abs(i - activeIdx);
    const opacity = dist === 0 ? 1 : dist === 1 ? 0.45 : dist === 2 ? 0.2 : 0;
    const scale = dist === 0 ? 1 : dist === 1 ? 0.97 : 0.94;
    return { opacity, scale };
  };

  // ─────────────────────────────────────────────
  // FLAT LIST (≤ threshold)
  // ─────────────────────────────────────────────
  if (!useWheel) {
    return (
      <div
        style={{ animation: mounted ? "fadeIn 0.8s 0.3s ease both" : "none" }}
      >
        <ListHeader muted={muted} border={border} count={projects.length} />
        <div>
          {projects.map((proj, i) => (
            <FlatRow
              key={proj.id}
              proj={proj}
              i={i}
              fg={fg}
              muted={muted}
              border={border}
              visible={visibleProjects.includes(i)}
              hovered={hoveredIdx === i}
              onEnter={() => setHoveredIdx(i)}
              onLeave={() => setHoveredIdx(null)}
            />
          ))}
        </div>
        {/* <ViewAll /> */}
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // SCROLL WHEEL (> threshold)
  // ─────────────────────────────────────────────
  const viewportH = ITEM_HEIGHT * VISIBLE_COUNT;

  return (
    <div style={{ animation: mounted ? "fadeIn 0.8s 0.3s ease both" : "none" }}>
      <ListHeader muted={muted} border={border} count={projects.length} />

      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
          marginTop: 4,
        }}
      >
        {/* ── Scrollbar track ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            paddingTop: 8,
          }}
        >
          {/* Up arrow */}
          <button
            onClick={() => setActiveIdx((i) => clamp(i - 1, 0, maxIdx))}
            style={{
              background: "none",
              border: `1px solid ${border}`,
              borderRadius: "50%",
              width: 26,
              height: 26,
              color: activeIdx === 0 ? border : PRIMARY,
              cursor: activeIdx === 0 ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              transition: "color 0.2s, border-color 0.2s",
              flexShrink: 0,
            }}
          >
            ↑
          </button>

          {/* Track */}
          <div
            style={{
              width: 2,
              height: viewportH - 68,
              background: `${PRIMARY}15`,
              borderRadius: 99,
              position: "relative",
            }}
          >
            {/* Thumb */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                width: 4,
                borderRadius: 99,
                background: PRIMARY,
                height: `${(VISIBLE_COUNT / projects.length) * 100}%`,
                top: `${(activeIdx / maxIdx) * (100 - (VISIBLE_COUNT / projects.length) * 100)}%`,
                transition: "top 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
          </div>

          {/* Down arrow */}
          <button
            onClick={() => setActiveIdx((i) => clamp(i + 1, 0, maxIdx))}
            style={{
              background: "none",
              border: `1px solid ${border}`,
              borderRadius: "50%",
              width: 26,
              height: 26,
              color: activeIdx === maxIdx ? border : PRIMARY,
              cursor: activeIdx === maxIdx ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              transition: "color 0.2s, border-color 0.2s",
              flexShrink: 0,
            }}
          >
            ↓
          </button>

          {/* Counter */}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: PRIMARY,
              fontWeight: 600,
              letterSpacing: "0.08em",
              marginTop: 2,
            }}
          >
            {String(activeIdx + 1).padStart(2, "0")}/
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Wheel viewport ── */}
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            flex: 1,
            height: viewportH,
            position: "relative",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            WebkitMaskImage: `linear-gradient(to bottom,
              transparent 0%,
              black ${ITEM_HEIGHT * 1.2}px,
              black ${viewportH - ITEM_HEIGHT * 1.2}px,
              transparent 100%)`,
            maskImage: `linear-gradient(to bottom,
              transparent 0%,
              black ${ITEM_HEIGHT * 1.2}px,
              black ${viewportH - ITEM_HEIGHT * 1.2}px,
              transparent 100%)`,
          }}
        >
          {/* Active row highlight band */}
          <div
            style={{
              position: "absolute",
              zIndex: 1,
              pointerEvents: "none",
              top: ITEM_HEIGHT * Math.floor(VISIBLE_COUNT / 2),
              left: 0,
              right: 0,
              height: ITEM_HEIGHT,
              borderTop: `1px solid ${PRIMARY}20`,
              borderBottom: `1px solid ${PRIMARY}20`,
            }}
          />

          {/* Sliding list */}
          <div
            style={{
              transform: `translateY(${translateY}px)`,
              transition: isDragging
                ? "none"
                : "transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)",
              willChange: "transform",
            }}
          >
            {projects.map((proj, i) => {
              const { opacity, scale } = itemStyle(i);
              const isActive = i === activeIdx;
              return (
                <a
                  key={proj.id}
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: ITEM_HEIGHT,
                    padding: "0 4px",
                    textDecoration: "none",
                    color: "inherit",
                    opacity,
                    transform: `scale(${scale})`,
                    transformOrigin: "left center",
                    transition: "opacity 0.3s, transform 0.3s",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={(e) => {
                    if (!isActive) {
                      e.preventDefault();
                      setActiveIdx(i);
                    }
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          color: PRIMARY,
                          fontWeight: 600,
                        }}
                      >
                        {proj.id}
                      </span>
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: 24,
                          fontWeight: 800,
                          letterSpacing: "-0.03em",
                          color: isActive
                            ? hoveredIdx === i
                              ? PRIMARY
                              : fg
                            : muted,
                          transition: "color 0.2s",
                        }}
                      >
                        {proj.name}
                      </h3>
                    </div>
                    <div
                      style={{ display: "flex", gap: 10, alignItems: "center" }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: muted,
                        }}
                      >
                        {proj.tag}
                      </span>
                      <span style={{ color: border, fontSize: 10 }}>·</span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          color: muted,
                        }}
                      >
                        {proj.year}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <span
                      style={{
                        color: PRIMARY,
                        fontSize: 20,
                        opacity: hoveredIdx === i ? 1 : 0.5,
                        transition: "opacity 0.2s",
                      }}
                    >
                      ↗
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hint */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9,
          color: muted,
          letterSpacing: "0.12em",
          marginTop: 8,
          paddingLeft: 42,
          textTransform: "uppercase",
          opacity: 0.6,
        }}
      >
        Scroll · drag
      </div>

      {/* <ViewAll /> */}
    </div>
  );
}

// ── Shared sub-components ──────────────────────────────────

function ListHeader({ muted, border, count }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${border}`,
        paddingBottom: 16,
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: muted,
        }}
      >
        Projects
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: PRIMARY,
          fontWeight: 600,
        }}
      >
        01 — {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}

function FlatRow({
  proj,
  i,
  fg,
  muted,
  border,
  visible,
  hovered,
  onEnter,
  onLeave,
}) {
  return (
    <a
      href="#"
      className="project-row"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "26px 0",
        borderBottom: `1px solid ${border}`,
        textDecoration: "none",
        color: "inherit",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
        transition:
          "opacity 0.5s ease, transform 0.5s ease, padding 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: PRIMARY,
              fontWeight: 600,
            }}
          >
            {proj.id}
          </span>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              transition: "color 0.2s",
              color: hovered ? PRIMARY : fg,
            }}
          >
            {proj.name}
          </h3>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: muted,
            }}
          >
            {proj.tag}
          </span>
          <span style={{ color: border, fontSize: 10 }}>·</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: muted,
            }}
          >
            {proj.year}
          </span>
        </div>
      </div>
      <span className="project-arrow" style={{ color: PRIMARY, fontSize: 22 }}>
        ↗
      </span>
    </a>
  );
}

// function ViewAll() {
//   return (
//     <div style={{ marginTop: 24 }}>
//       <a
//         href="#"
//         style={{
//           display: "inline-flex",
//           alignItems: "center",
//           gap: 6,
//           fontFamily: "'Syne', sans-serif",
//           fontSize: 13,
//           fontWeight: 700,
//           letterSpacing: "0.04em",
//           color: PRIMARY,
//           textDecoration: "none",
//           transition: "gap 0.2s",
//         }}
//         onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
//         onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
//       >
//         View All Works <span style={{ fontSize: 16 }}>→</span>
//       </a>
//     </div>
//   );
// }
