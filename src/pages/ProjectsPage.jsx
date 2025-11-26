import React, { useRef, useState } from "react";
import ieee from '../assets/ieee.jpg';
import movies from '../assets/movies.png';
import cc from '../assets/cc.png';
import seyal from '../assets/seyal.png';
import medlens from '../assets/medlens.png';
import eventoh from '../assets/eventoh.png';
import firebase from '../assets/firebase.png';
import flask from '../assets/flask.png';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

function ProjectsPage() {
  gsap.registerPlugin(ScrollTrigger);
  const [activeQuest, setActiveQuest] = useState(null);
  const containerRef = useRef(null);

  const projectData = [
    { src: movies, title: 'Movies-GS', description: 'A simple application developed using react springboot and mongodb to view and review movies', link: 'https://movies-gs.vercel.app', type: 'Main Quest' },
    { src: ieee, title: 'IEEE SMC', description: 'The website of IEEE SMC Student Branch Sairam', link: 'https://edu.ieee.org/sairamin-smc', type: 'Guild Quest' },
    { src: cc, title: 'Code Craft', description: 'The Website for 24 hours Code Craft Hackathon', link: 'https://code-craft.xyz', type: 'Event Quest' },
    { src: medlens, title: 'MedLens', description: 'An app to detect skin diseases from user photos and store data to help doctors', link: 'https://github.com/Ex-Rockstar/medlensv2', type: 'App Quest' },
    { src: seyal, title: 'Seyal Foundation', description: 'The Website for Seyal Foundation NGO', link: 'https://github.com/Ex-Rockstar/seyal.git', type: 'Side Quest' },
    { src: eventoh, title: 'Eventoh', description: 'An event managing service web application developed for a hackathon', link: 'https://eventoh.vercel.app', type: 'Event Quest' },
    { src: firebase, title: 'Firebase Analytics', description: 'A express server for getting the analytics from your firebase dashboard', link: 'https://github.com/gurusanjay2322/firebase-analytics-express', type: 'Tool Quest' },
    { src: flask, title: 'Speech To Text', description: 'A flask server for converting speech to text', link: 'https://github.com/gurusanjay2322/SpeechToText-Flask', type: 'Tool Quest' },
  ];

  useGSAP(() => {
    gsap.from(".quest-marker", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
      },
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
  }, { scope: containerRef });

  return (
    <section id="projects" ref={containerRef} className="min-h-screen bg-paper dark:bg-void relative py-20 transition-colors duration-500">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-gold mb-4 tracking-widest uppercase">Quest Board</h2>
          <div className="w-24 h-1 bg-silk mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projectData.map((project, index) => (
            <div 
              key={index}
              className="quest-marker group relative cursor-pointer"
              onClick={() => setActiveQuest(project)}
            >
              {/* Card Frame */}
              <div className="relative h-64 bg-white dark:bg-voidLight border border-gray-200 dark:border-mist/20 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(248,181,0,0.2)]">
                
                {/* Image */}
                <div className="absolute inset-0">
                  <img src={project.src} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-paper dark:from-void via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <span className="text-xs text-silk font-bold tracking-widest uppercase mb-1 block">{project.type}</span>
                  <h3 className="text-xl font-serif text-ink dark:text-text group-hover:text-gold transition-colors">{project.title}</h3>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Quest Modal (Boss Chamber Style) */}
      {activeQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setActiveQuest(null)}>
          <div 
            className="bg-white dark:bg-voidLight border border-gold/30 p-8 max-w-2xl w-full relative rounded-xl shadow-2xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-500 dark:text-mist hover:text-silk text-2xl"
              onClick={() => setActiveQuest(null)}
            >
              ×
            </button>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-mist/20">
                <img src={activeQuest.src} alt={activeQuest.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="text-silk text-sm font-bold tracking-widest uppercase">{activeQuest.type}</span>
                  <h3 className="text-3xl font-serif text-gold mt-2 mb-4">{activeQuest.title}</h3>
                  <p className="text-gray-600 dark:text-mist leading-relaxed">{activeQuest.description}</p>
                </div>

                {activeQuest.link && (
                  <a 
                    href={activeQuest.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 inline-block text-center py-3 px-6 border border-silk text-silk hover:bg-silk hover:text-white transition-all duration-300 uppercase tracking-widest font-bold text-sm"
                  >
                    Accept Quest
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectsPage;

