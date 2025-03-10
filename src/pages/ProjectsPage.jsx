import React, { useRef, useEffect } from "react";
import ieee from '../assets/ieee.jpg';
import movies from '../assets/movies.png';
import ProjectCard from '../components/ProjectCard';
import cc from '../assets/cc.png';
import seyal from '../assets/seyal.png';
import innovatia from '../assets/innovatia.png';
import valo from '../assets/valo.jpg';
import firebase from '../assets/firebase.png';
import flask from '../assets/flask.png';
import backgroundImage from '../assets/backgrounds/axiom-pattern.png';
import SplitType from "split-type";
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import '../css/projects.css'
import {ScrollTrigger} from 'gsap/all'

function MarqueeRow({ children, speed = 1, reverse = false, onHover }) {
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);
  let animationFrameId = null;
  let isPaused = false;

  useEffect(() => {
    const marquee = marqueeRef.current;
    const content = contentRef.current;
    if (!marquee || !content) return;

    const contentWidth = content.offsetWidth;
    let position = 0;

    const animate = () => {
      if (!isPaused) {
        position += reverse ? speed : -speed;
        if (Math.abs(position) >= contentWidth / 2) {
          position = 0;
        }
        content.style.transform = `translateX(${position}px)`;
        content.style.transition = 'none';
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    content.style.transition = 'none';
    content.style.transform = 'translateX(0)';
    
    // Force a reflow
    content.offsetHeight;
    
    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed, reverse]);

  return (
    <div 
      ref={marqueeRef} 
      className="overflow-hidden w-full"
      onMouseEnter={() => {
        isPaused = true;
        onHover?.(true);
      }}
      onMouseLeave={() => {
        isPaused = false;
        onHover?.(false);
      }}
    >
      <div ref={contentRef} className="flex">
        {children}
        {children}
      </div>
    </div>
  );
}

function ProjectsPage() {
  gsap.registerPlugin(ScrollTrigger);
  
  useGSAP(() => {
    const text = new SplitType("#myproj", { types: "chars" });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top center",
        end: "bottom center",
      },
    });
    timeline.to(".char", {
      y: 0,
      stagger: 0.05,
      delay: 0.1,
      duration: 0.1,
    });
  });

  const projectData = [
    {
      src: movies,
      title: 'Movies-GS',
      description: 'A simple application developed using react springboot and mongodb to view and review movies',
      link: 'https://movies-gs.vercel.app',
    },
    {
      src: ieee,
      title: 'IEEE SMC Student Branch Sairam',
      description: 'The website of IEEE SMC Student Branch Sairam',
      link: 'https://edu.ieee.org/sairamin-smc',
    },
    {
      src: cc,
      title: 'Code Craft Hackathon',
      description: 'The Website for 24 hours Code Craft Hackathon of Department Of Mtech CSE',
      link: 'https://code-craft.xyz', 
    },
    {
      src: innovatia,
      title: 'Innovatia 23',
      description: 'The Website for Innovatia 23 of Department Of Mtech CSE',
      link: 'https://innovatia23.tech',
    },
    {
      src: seyal,
      title: 'Seyal Foundation',
      description: 'The Website for Seyal Foundation NGO',
      link: '',
    },
    {
      src: valo,
      title: 'Valobot',
      description: 'A chatbot based on valorant developed using botpress and react',
      link: 'https://gurusanjay2322.github.io/Valobot-botpress/',
    },
    {
      src: firebase,
      title: 'Firebase Analytics Setup',
      description: 'A express server for getting the analytics from your firebase dashboard',
      link: 'https://github.com/gurusanjay2322/firebase-analytics-express',
    },
    {
      src: flask,
      title: 'Speech To Text Server',
      description: 'A flask server for converting speech to text',
      link: 'https://github.com/gurusanjay2322/SpeechToText-Flask',
    },
  ];

  return (
    <section id="projects" className="relative min-h-screen">
      <div
        className="min-h-screen bg-center bg-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Add a subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/10" />
        
        <div className="relative z-0 h-screen flex flex-col justify-center">
          <div className="px-4">
            <div className="flex justify-center pb-8">
              <h2 id="myproj" className="text-2xl md:text-5xl font-RockSalt text-lightPrimary dark:text-primary font-bold">
                My Projects
              </h2>
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <MarqueeRow speed={0.3} reverse={false}>
                  {projectData.map((project, index) => (
                    <div key={index} className="w-[250px] flex-shrink-0 px-1.5">
                      <ProjectCard
                        src={project.src}
                        title={project.title}
                        description={project.description}
                        link={project.link}
                      />
                    </div>
                  ))}
                </MarqueeRow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsPage;
