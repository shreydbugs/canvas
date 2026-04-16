import { useEffect, useRef } from "react";
import { PRIMARY } from "../theme";

export default function AmbientBackground({ dark }) {
  const cursorGlowRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.1);
      currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.1);

      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate(${currentRef.current.x - 300}px, ${currentRef.current.y - 300}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Mouse-tracking glow — lerp smoothed */}
      <div
        ref={cursorGlowRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: dark
            ? `radial-gradient(circle, ${PRIMARY}40 0%, ${PRIMARY}18 35%, ${PRIMARY}08 60%, transparent 75%)`
            : `radial-gradient(circle, ${PRIMARY}70 0%, ${PRIMARY}38 35%, ${PRIMARY}18 60%, transparent 75%)`,
          filter: dark ? "blur(36px)" : "blur(28px)",
          willChange: "transform",
          transition: "filter 0.4s",
        }}
      />

      {/* Static ambient blobs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: dark
            ? `radial-gradient(circle, ${PRIMARY}20 0%, transparent 65%)`
            : `radial-gradient(circle, ${PRIMARY}35 0%, transparent 65%)`,
          filter: "blur(40px)",
          animation: "fadeIn 2s ease forwards",
          transition: "background 0.4s",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "-5%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: dark
            ? `radial-gradient(circle, ${PRIMARY}15 0%, transparent 65%)`
            : `radial-gradient(circle, ${PRIMARY}28 0%, transparent 65%)`,
          filter: "blur(50px)",
          transition: "background 0.4s",
        }}
      />
    </div>
  );
}
