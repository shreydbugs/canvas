import { useState, useEffect, useRef } from "react";
import { getTheme } from "./theme";
import { useMounted } from "./hooks";

import GlobalStyles from "./components/GlobalStyles";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WorksSection from "./components/WorksSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function useSectionReveal(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return visible;
}

export default function App() {
  const [dark, setDark] = useState(true);

  const worksRef   = useRef(null);
  const aboutRef   = useRef(null);
  const contactRef = useRef(null);

  const theme          = getTheme(dark);
  const mounted        = useMounted(100);
  const worksVisible   = useSectionReveal(worksRef);
  const aboutVisible   = useSectionReveal(aboutRef);
  const contactVisible = useSectionReveal(contactRef);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.bg,
      color: theme.fg,
      fontFamily: "'Syne', sans-serif",
      transition: "background 0.4s, color 0.4s",
      overflowX: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    }}>
      <GlobalStyles />
      <AmbientBackground dark={dark} />

      <Navbar
        theme={theme}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        onAboutClick={()   => scrollTo(aboutRef)}
        onWorksClick={()   => scrollTo(worksRef)}
        onContactClick={()  => scrollTo(contactRef)}
      />

      <div className="hero-wrap" style={{ position: "relative", zIndex: 1 }}>
        <HeroSection theme={theme} mounted={mounted} />
      </div>

      <div ref={worksRef} style={{ width: "100%" }}>
        <WorksSection theme={theme} visible={worksVisible} />
      </div>

      <div ref={aboutRef} style={{ width: "100%" }}>
        <AboutSection theme={theme} visible={aboutVisible} />
      </div>

      <div ref={contactRef} style={{ width: "100%" }}>
        <ContactSection theme={theme} visible={contactVisible} />
      </div>

      <Footer theme={theme} />
    </div>
  );
}
