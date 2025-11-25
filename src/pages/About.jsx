import React, { useRef } from "react";
import photo from '../assets/me.jpg';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';

function About() {
  gsap.registerPlugin(ScrollTrigger);
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play reverse play reverse"
      }
    });

    // Reveal the "Scroll" container
    tl.from(".lore-scroll", {
      scaleY: 0,
      opacity: 0,
      duration: 1,
      ease: "power3.inOut"
    })
    // Reveal content inside
    .from(".lore-content > *", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Image parallax
    gsap.to(".lore-image", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <section id="About" ref={containerRef} className="min-h-screen bg-paper dark:bg-voidLight relative py-20 overflow-hidden transition-colors duration-500">
      
      {/* Background Runes */}
      <div className="absolute top-10 right-10 text-9xl text-ink/5 dark:text-white/5 font-rune select-none pointer-events-none rotate-12">
        A B C
      </div>
      <div className="absolute bottom-10 left-10 text-9xl text-ink/5 dark:text-white/5 font-rune select-none pointer-events-none -rotate-12">
        X Y Z
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Character Portrait */}
          <div className="md:w-1/3 relative group">
            <div className="absolute inset-0 bg-silk blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative overflow-hidden rounded-t-full border-2 border-gold/30 lore-image">
              <img 
                src={photo} 
                alt="The Weaver" 
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paper dark:from-void via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Lore Scroll Content */}
          <div className="md:w-2/3 relative">
            <div className="lore-scroll absolute -inset-6 bg-white dark:bg-void border border-gold/20 opacity-90 -z-10 transform origin-top shadow-lg dark:shadow-none"></div>
            
            <div className="lore-content space-y-6 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-silk"></div>
                <h2 className="text-gold font-serif text-3xl tracking-widest uppercase">The Weaver</h2>
                <div className="h-[1px] w-full bg-gradient-to-r from-silk to-transparent"></div>
              </div>

              <p className="text-mistDark dark:text-mist text-lg leading-relaxed font-serif italic">
                "In the vast expanse of the digital void, I weave threads of logic into tapestries of interaction."
              </p>

              <div className="space-y-4 text-gray-700 dark:text-textDim font-sans leading-loose">
                <p>
                  I am a passionate artisan of the web, dedicated to crafting user-centric artifacts. 
                  My journey involves mastering the arcane arts of front-end development and system architecture.
                </p>
                <p>
                  With a needle of curiosity and thread of persistence, I stitch together seamless experiences, 
                  always seeking to unlock new abilities and conquer greater challenges in the ever-expanding kingdom of code.
                </p>
              </div>

              <div className="pt-8 flex gap-6">
                <div className="flex flex-col">
                  <span className="text-gold font-serif text-sm uppercase tracking-widest mb-1">Class</span>
                  <span className="text-ink dark:text-white font-bold">Full Stack Weaver</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gold font-serif text-sm uppercase tracking-widest mb-1">Level</span>
                  <span className="text-ink dark:text-white font-bold">Junior</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gold font-serif text-sm uppercase tracking-widest mb-1">Origin</span>
                  <span className="text-ink dark:text-white font-bold">Earth Realm</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;

