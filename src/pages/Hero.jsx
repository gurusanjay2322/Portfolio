import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import hornetShoe from "../assets/hornetshoe.png";
import adinoAudio from "../assets/voicelines/adino_hornet.mp3";
import garamaAudio from "../assets/voicelines/garama_hornet.mp3";
import hegaleAudio from "../assets/voicelines/hegale_hornet.mp3";
import shawAudio from "../assets/voicelines/shaw_hornet.mp3";

function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Split text
    const title = new SplitType("#hero-title", { types: "chars" });
    const subtitle = new SplitType("#hero-subtitle", { types: "words" });

    const tl = gsap.timeline();

    // Initial black screen fade out
    tl.to(".overlay-intro", {
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
      pointerEvents: "none"
    })
    // Title Reveal
    .from(title.chars, {
      opacity: 0,
      y: 100,
      rotateX: -90,
      stagger: 0.05,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.5")
    // Subtitle Reveal
    .from(subtitle.words, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    // CTA Button
    .from(".hero-cta", {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "back.out(1.5)"
    }, "-=0.2");

    // Parallax Effect on Mouse Move
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(".hero-parallax", {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
    // Needle Scroll Animation
    const scrollTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    scrollTl.to(".needle-scroll", {
      y: 30,
      duration: 0.5,
      ease: "power4.in"
    })
    .to(".scroll-impact", {
      scale: 1.5,
      opacity: 1,
      duration: 0.1,
      ease: "power1.out"
    })
    .to(".scroll-impact", {
      scale: 2,
      opacity: 0,
      duration: 0.3
    }, "+=0.05")
    .to(".scroll-impact-2", {
      scale: 1.5,
      opacity: 0.8,
      duration: 0.1
    }, "-=0.4")
    .to(".scroll-impact-2", {
      scale: 0,
      opacity: 0,
      duration: 0.3
    }, "-=0.3")
    .to(".needle-scroll", {
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.2
    });

  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-paper dark:bg-void transition-colors duration-500">
      
      {/* Cinematic Intro Overlay */}
      <div className="overlay-intro absolute inset-0 bg-black z-50 pointer-events-none"></div>

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-silk/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[80px] animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="hero-parallax relative z-10 text-center flex flex-col items-center gap-6">
        <div className="relative">
          <h1 id="hero-title" className="font-serif text-6xl md:text-8xl lg:text-9xl text-ink dark:text-text font-bold tracking-tighter">
            GURU SANJAY
          </h1>
          <div className="absolute -top-10 -right-10 w-20 h-20 border-t-2 border-r-2 border-silk opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 border-b-2 border-l-2 border-silk opacity-50"></div>
        </div>

        <p id="hero-subtitle" className="font-sans text-xl md:text-2xl text-mistDark dark:text-mist tracking-[0.5em] uppercase mt-4">
          Weaving Code Into Worlds
        </p>

        <button 
          onClick={() => window.lenis ? window.lenis.scrollTo('#About') : document.getElementById('About').scrollIntoView({ behavior: 'smooth' })}
          className="hero-cta mt-12 px-8 py-3 border border-silk text-silk hover:bg-silk hover:text-white transition-all duration-300 tracking-widest uppercase text-sm font-bold relative group overflow-hidden"
        >
          <span className="relative z-10">Enter the Journey</span>
          <div className="absolute inset-0 bg-silk transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      </div>

      {/* Floating Particles (CSS Animation) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Hornet Image & Easter Egg */}
      <div 
        className="absolute bottom-0 right-5 md:right-20 z-20 cursor-pointer group"
        onClick={(e) => {
          // Easter Egg Logic
          const shouts = [
            { text: "SHAW!", audio: shawAudio },
            { text: "GARAMA!", audio: garamaAudio },
            { text: "ADINO!", audio: adinoAudio },
            { text: "HEGALE!", audio: hegaleAudio }
          ];
          const randomShout = shouts[Math.floor(Math.random() * shouts.length)];
          
          // Play Audio
          const audio = new Audio(randomShout.audio);
          audio.volume = 0.4;
          audio.play().catch(e => console.error("Audio play failed:", e));
          
          // Create shout element
          const shoutEl = document.createElement("div");
          shoutEl.innerText = randomShout.text;
          shoutEl.className = "absolute -top-16 left-1/2 transform -translate-x-1/2 text-2xl md:text-4xl font-serif font-bold text-white drop-shadow-[0_0_10px_#ed213a] pointer-events-none z-50 select-none";
          e.currentTarget.appendChild(shoutEl);

          // Animate Shout
          gsap.fromTo(shoutEl, 
            { scale: 0, opacity: 0, y: 20 },
            { scale: 1.5, opacity: 1, y: -40, duration: 0.4, ease: "back.out(1.7)", onComplete: () => {
              gsap.to(shoutEl, { opacity: 0, y: -80, duration: 0.3, delay: 0.2, onComplete: () => shoutEl.remove() });
            }}
          );

          // Shake Image
          gsap.fromTo(e.currentTarget.querySelector("img"), 
            { x: -3 }, 
            { x: 3, duration: 0.05, repeat: 5, yoyo: true, ease: "sine.inOut", onComplete: () => {
              gsap.to(e.currentTarget.querySelector("img"), { x: 0, duration: 0.1 });
            }}
          );
        }}
      >
        {/* Glow effect behind */}
        <div className="absolute inset-0 blur-3xl bg-silk/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Main Hornet Image */}
        <img 
          src={hornetShoe} 
          alt="Hornet" 
          className="relative w-40 h-auto md:w-56 lg:w-72 object-contain drop-shadow-[0_0_15px_rgba(237,33,58,0.5)] transition-transform duration-300"
        />
        
        {/* Tooltip hint */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-mist text-xs tracking-widest uppercase whitespace-nowrap">
          Click to Challenge
        </div>
      </div>

      {/* Needle Down Strike Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30 cursor-pointer" onClick={() => window.lenis ? window.lenis.scrollTo('#About') : document.getElementById('About').scrollIntoView({ behavior: 'smooth' })}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-mistDark/70 dark:text-mist/70 mb-4 animate-pulse">Descend</span>
        
        <div className="relative w-8 h-16 flex justify-center">
          {/* The Needle */}
          <div className="needle-scroll absolute top-0">
            <svg width="20" height="40" viewBox="0 0 20 40" fill="none">
              <path d="M10 40 L0 10 L10 0 L20 10 L10 40 Z" fill="#ed213a" className="drop-shadow-[0_0_8px_rgba(237,33,58,0.8)]" />
            </svg>
          </div>
          
          {/* Impact Shockwave */}
          <div className="scroll-impact absolute bottom-0 w-12 h-4 border border-silk/50 rounded-[50%] opacity-0"></div>
          <div className="scroll-impact-2 absolute bottom-0 w-8 h-2 bg-silk/30 rounded-[50%] opacity-0 blur-sm"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;



