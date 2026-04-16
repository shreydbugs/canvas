import { useState } from "react";
import { getTheme } from "./theme";
import { useStaggeredReveal, useMounted } from "./hooks";
import { projects } from "./data";

import GlobalStyles from "./components/GlobalStyles";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectList from "./components/ProjectList";
import Footer from "./components/Footer";

export default function App() {
  const [dark, setDark] = useState(true);

  const theme = getTheme(dark);
  const mounted = useMounted(100);
  const visibleProjects = useStaggeredReveal(projects.length, 100);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.fg,
        fontFamily: "'Syne', sans-serif",
        transition: "background 0.4s, color 0.4s",
        overflowX: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GlobalStyles />
      <AmbientBackground dark={dark} />

      <Navbar
        theme={theme}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
      />

      <main
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: 120,
          paddingBottom: 80,
          paddingLeft: 48,
          paddingRight: 48,
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
          flex: 1,
        }}
      >
        <HeroSection theme={theme} mounted={mounted} />
        <ProjectList
          theme={theme}
          mounted={mounted}
          visibleProjects={visibleProjects}
        />
      </main>

      <Footer theme={theme} />
    </div>
  );
}
