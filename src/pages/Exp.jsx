import React, { useRef } from "react";
import { FaReact, FaNodeJs, FaDatabase, FaCode } from "react-icons/fa";
import { SiTailwindcss, SiFirebase, SiMongodb, SiExpress } from "react-icons/si";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

function Exp() {
  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  const abilities = [
    {
      id: 1,
      name: "Frontend Mastery",
      icon: <FaReact />,
      level: "Expert",
      desc: "Crafting responsive interfaces with React & Tailwind",
      skills: [
        { name: "React", icon: <FaReact /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
      ]
    },
    {
      id: 2,
      name: "Backend Sorcery",
      icon: <FaNodeJs />,
      level: "Advanced",
      desc: "Building robust APIs with Node & Express",
      skills: [
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "Express", icon: <SiExpress /> },
      ]
    },
    {
      id: 3,
      name: "Data Alchemy",
      icon: <FaDatabase />,
      level: "Intermediate",
      desc: "Managing data with MongoDB & Firebase",
      skills: [
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Firebase", icon: <SiFirebase /> },
      ]
    }
  ];

  useGSAP(() => {
    // Charm notch animation
    gsap.from(".charm-notch", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
      },
      scale: 0,
      rotation: -180,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Connecting lines animation
    gsap.from(".ability-line", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
      },
      scaleX: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.inOut"
    });
  }, { scope: containerRef });

  return (
    <section id="Experience" ref={containerRef} className="min-h-screen bg-paper dark:bg-voidLight relative py-20 overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif text-gold mb-4 tracking-widest uppercase">Abilities</h2>
          <p className="text-mistDark dark:text-mist font-serif italic">"Charms equipped for the journey ahead"</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-silk to-transparent ability-line transform -translate-y-1/2 opacity-30"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {abilities.map((ability) => (
              <div key={ability.id} className="charm-notch group relative">
                
                {/* Charm Container */}
                <div className="w-40 h-40 mx-auto bg-white dark:bg-void border-2 border-gold/30 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-silk group-hover:shadow-[0_0_30px_rgba(237,33,58,0.3)]">
                  
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-silk/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon */}
                  <div className="text-5xl text-gray-400 dark:text-mist group-hover:text-gold transition-colors duration-300 transform group-hover:scale-110">
                    {ability.icon}
                  </div>

                  {/* Orbiting Particles */}
                  <div className="absolute inset-0 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 left-1/2 w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_#f8b500]"></div>
                  </div>
                </div>

                {/* Tooltip / Details */}
                <div className="text-center mt-8 opacity-50 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-[-5px]">
                  <h3 className="text-xl font-serif text-gold mb-2">{ability.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-mist mb-4">{ability.desc}</p>
                  
                  {/* Mini Skills */}
                  <div className="flex justify-center gap-3">
                    {ability.skills.map((skill, idx) => (
                      <div key={idx} className="text-xl text-gray-500 dark:text-textDim hover:text-silk transition-colors" title={skill.name}>
                        {skill.icon}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Exp;

