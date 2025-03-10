import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import genik from "./assets/genik.jpeg";
import techno from "./assets/techno.jpeg";
import ProjectsPage from "./pages/ProjectsPage";
import Contact from "./pages/Contact";
import Lenis from 'lenis';
import Exp from "./pages/Exp";

function App() {

  const experiences = [
    {
      logo: techno,
      company: "Sairam Techno Incubator Foundation",
      role: "Software Developer Intern",
      description: "Worked on developing the frontend of a web application",
      duration: "Mar 2024 - Apr 2024",
    },
    {
      logo: genik,
      company: "Genik Technologies",
      role: "Full Stack Developer Intern",
      description:
        "Worked on developing a web application and creating the server for the backend of the application",
      duration: "Jul 2024 - Aug 2024",
    },
  ];

  const components = [
    <Hero key="hero" />,
    <About key="about" />,
    <ProjectsPage key="projects" />,
    // <Experience key="experience" experiences={experiences} />,
    <Exp key="experience"/>,
    <Contact key="contact" />,
  ];

  useEffect(() => {
    const lenis = new Lenis();


    lenis.on("scroll", (e) => {
      console.log(e);
    });

   
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); 
    };
  }, []);

  return (
    <div className="bg-lightBackground dark:bg-background h-screen">
      <Navbar />
      <div className="bg-lightBackground dark:bg-background">
        {components.map((Component, index) => (
          <div key={index} className={`${alternateColor(index)}`}>
            {Component}
          </div>
        ))}
      </div>
    </div>
  );
}


const alternateColor = (index) =>
  index % 2 === 0
    ? "bg-lightBackground dark:bg-background"
    : "bg-lightBackground2 dark:bg-background2";

export default App;
