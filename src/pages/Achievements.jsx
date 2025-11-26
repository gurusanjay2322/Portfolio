import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

function Achievements() {
  const containerRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  const achievements = [
    {
      id: 1,
      title: "Solveathon & Innovathon",
      subtitle: "E-PDS Project Awards",
      org: "Sri Sairam Engineering College",
      year: "2023-2024",
      desc: [
        "Awarded for E-PDS project's real-world impact under SDG 2 - Zero Hunger",
        "Secured 2nd and 1st place among 100+ projects in innovation showcases"
      ]
    },
    {
      id: 2,
      title: "CSI Best Project Award",
      subtitle: "E-PDS",
      org: "CSI Kancheepuram Chapter",
      year: "2024",
      desc: [
        "Recognized by Computer Society of India for technical innovation and social impact"
      ]
    },
    {
      id: 3,
      title: "APPWIZ 2.0",
      subtitle: "SDG Mobile App Runner-Up",
      org: "Sri Sairam Engineering College",
      year: "2023",
      desc: [
        "Secured 2nd place for E-PDS mobile app using Flutter and Firebase"
      ]
    },
    {
      id: 4,
      title: "Rajyapuraskar Scout Award",
      subtitle: "Highest State Honor",
      org: "Bharat Scouts and Guides",
      year: "2018",
      desc: [
        "Highest state-level Scout award in India, conferred by national leadership"
      ]
    }
  ];

  useGSAP(() => {
    // Fade in cards on scroll
    gsap.from(".achievement-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 100,
      stagger: 0.3,
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <section id="achievements" ref={containerRef} className="min-h-screen bg-paper dark:bg-void relative py-20 transition-colors duration-500">
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-serif text-gold mb-6 tracking-widest uppercase drop-shadow-lg">Hall of Records</h2>
          <p className="text-mistDark dark:text-mist font-serif italic text-xl">"Honors bestowed upon the traveler"</p>
          <div className="w-1 h-16 bg-gradient-to-b from-silk to-transparent mx-auto mt-8"></div>
        </div>
      </div>

      {/* Achievements Container */}
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-24">
          {achievements.map((item, index) => (
            <div key={item.id} className="achievement-card relative">
              {/* Background Number */}
              <div className="absolute -top-20 left-0 text-[15rem] font-serif text-gray-200/10 dark:text-mist/5 pointer-events-none select-none leading-none">
                {index + 1}
              </div>

              {/* Card */}
              <div className="relative bg-white/90 dark:bg-voidLight/90 backdrop-blur-xl border border-gold/30 p-8 md:p-12 rounded-2xl shadow-2xl transform transition-all duration-500 hover:border-gold hover:shadow-[0_0_50px_rgba(248,181,0,0.2)] group">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-silk to-transparent opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-silk to-transparent opacity-50"></div>
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-30"></div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-serif text-ink dark:text-text mb-2 group-hover:text-gold transition-colors">{item.title}</h3>
                    <p className="text-silk font-bold tracking-[0.2em] uppercase text-base">{item.subtitle}</p>
                  </div>
                  
                  {/* Year Badge */}
                  <div className="flex items-center justify-center border-2 border-silk/30 rounded-full px-6 py-2 bg-silk/5 min-w-[120px]">
                    <span className="text-xl font-serif text-silk font-bold">{item.year}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-lg text-gray-500 dark:text-mist italic font-serif border-l-4 border-gold pl-4">{item.org}</p>
                  
                  <ul className="space-y-3 mt-6">
                    {item.desc.map((point, idx) => (
                      <li key={idx} className="flex items-start text-base text-gray-700 dark:text-mist/90 leading-relaxed">
                        <span className="text-gold mr-3 text-lg mt-0.5">❖</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
