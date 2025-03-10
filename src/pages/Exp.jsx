import React, { useRef, useEffect } from "react";
import { FaReact, FaCode, FaServer, FaDatabase } from "react-icons/fa";
import backgroundImage from '../assets/backgrounds/pattern2.png';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/all';
import SplitType from "split-type";
import { useRecoilState } from "recoil";
import darkmode from "../Atom";

function Exp() {
  const [isDark, setIsDark] = useRecoilState(darkmode);
  const expRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // Initial state for cards
    gsap.set(".exp-card", {
      opacity: 0,
      y: 50
    });

    // Title animation
    const text = new SplitType("#expText", { types: "chars" });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#Experience",
        start: "top 80%",
        end: "bottom center",
      },
    });

    timeline.to(".char", {
      y: 0,
      stagger: 0.05,
      delay: 0.1,
      duration: 0.1,
    });

    // Cards animation
    gsap.to(".exp-card", {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#Experience",
        start: "top 80%",
        end: "bottom center",
      },
    });
  }, []);

  const experienceData = [
    {
      id: 1,
      date: "Mar 2024 - Apr 2024",
      title: "Front End Developer",
      subtitle: "Sri Sairam Techno Incubator",
      description: "ReactJS, TailwindCSS, Sass, Integration, MySQL",
      icon: <FaReact />,
      skills: ["React", "TailwindCSS", "Sass", "MySQL", "Git"],
      achievements: [
        "Developed responsive web applications",
        "Implemented modern UI/UX designs",
        "Optimized application performance"
      ]
    },
    {
      id: 2,
      date: "Jul 2024 - Aug 2024",
      title: "Full Stack Developer",
      subtitle: "Genik Technologies",
      description: "ReactJS, NodeJS, ExpressJS, Firebase, Integration, Firestore",
      icon: <FaCode />,
      skills: ["React", "Node.js", "Express", "Firebase", "MongoDB"],
      achievements: [
        "Built full-stack applications",
        "Implemented real-time features",
        "Integrated third-party services"
      ]
    },
  ];

  return (
    <section id="Experience" ref={expRef} className="relative min-h-screen w-full bg-lightBackground dark:bg-background mt-16">
      <div
        className="absolute inset-0 bg-center bg-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
        
      <div className="relative z-0 w-full min-h-screen flex flex-col justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="expText" className="text-2xl md:text-5xl font-RockSalt text-lightPrimary dark:text-primary font-bold mb-4 leading-tight py-2">
              Experience
            </h2>
            <p className="text-lightText/80 dark:text-white/80 text-lg max-w-2xl mx-auto">
              My professional journey and contributions in the tech industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {experienceData && experienceData.length > 0 ? (
              experienceData.map((exp) => (
                <div
                  key={exp.id}
                  className="exp-card group bg-white/90 dark:bg-gray-900/90 rounded-2xl p-8 border border-lightAccent/30 dark:border-accent/30 shadow-xl hover:shadow-2xl hover:border-lightAccent/50 dark:hover:border-accent/50 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-lightAccent/30 dark:bg-accent/30 text-lightAccent dark:text-accent group-hover:scale-110 transition-transform duration-300">
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-lightPrimary dark:text-primary mb-1 group-hover:text-lightAccent dark:group-hover:text-accent transition-colors duration-300 leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-lightText/80 dark:text-white/80 mb-2">
                        {exp.subtitle}
                      </p>
                      <p className="text-sm text-lightAccent dark:text-accent mb-4">
                        {exp.date}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-lightPrimary dark:text-primary mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center gap-2 text-lightText/80 dark:text-white/80 group-hover:text-lightAccent dark:group-hover:text-accent transition-colors duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-lightAccent dark:bg-accent" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-lightPrimary dark:text-primary mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm bg-lightAccent/30 dark:bg-accent/30 text-lightAccent dark:text-accent group-hover:bg-lightAccent/50 dark:group-hover:bg-accent/50 transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-lightText/80 dark:text-white/80">
                No experience data available
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Exp;
