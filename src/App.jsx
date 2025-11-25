import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import ProjectsPage from "./pages/ProjectsPage";
import Contact from "./pages/Contact";
import Lenis from 'lenis';
import Exp from "./pages/Exp";
import Cursor from "./components/Cursor";
import gsap from "gsap";

function App() {
  const mainRef = useRef(null);

  const components = [
    <Hero key="hero" />,
    <About key="about" />,
    <ProjectsPage key="projects" />,
    <Exp key="experience"/>,
    <Contact key="contact" />,
  ];

  useEffect(() => {
    // Initialize Lenis with "Silk Physics"
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Dash Distortion Effect
    lenis.on('scroll', ({ velocity }) => {
      // Skew based on velocity (clamped)
      const skewAmount = Math.min(Math.max(velocity * 0.25, -5), 5);
      // Blur based on absolute velocity
      const blurAmount = Math.min(Math.abs(velocity * 0.1), 3);

      gsap.to(mainRef.current, {
        skewY: skewAmount,
        filter: `blur(${blurAmount}px)`,
        duration: 0.1,
        ease: "power1.out",
        overwrite: true
      });
    });

    window.lenis = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); 
      gsap.killTweensOf(mainRef.current);
    };
  }, []);

  return (
    <div className="bg-paper dark:bg-void min-h-screen text-ink dark:text-text selection:bg-silk selection:text-white overflow-hidden perspective-1000 transition-colors duration-500">
      <Cursor />
      <Navbar />
      
      {/* Main Content Wrapper for Distortion */}
      <main ref={mainRef} className="relative z-10 transform-gpu will-change-transform origin-center">
        {components.map((Component, index) => (
          <div key={index} className="relative">
            {Component}
          </div>
        ))}
      </main>
      
      {/* Global Atmosphere Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      {/* Speed Lines Overlay (Visible on high velocity) */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-0 transition-opacity duration-300 speed-lines bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
    </div>
  );
}

export default App;
