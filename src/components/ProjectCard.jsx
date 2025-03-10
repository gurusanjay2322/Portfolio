import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function ProjectCard({ src, title, description, link }) {
  const cardRef = useRef(null);

  useGSAP(() => {
    // Initial animation when card comes into view
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });

    // Hover animations
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a 
      ref={cardRef}
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className='group h-[260px] w-[240px] flex flex-col rounded-xl bg-white/5 dark:bg-black/5 backdrop-blur-sm border border-white/10 dark:border-white/5 hover:border-primary/50 dark:hover:border-primary/30 transition-all duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-primary/20 overflow-hidden'
    >
      <div className='relative h-[140px] overflow-hidden'>
        <img 
          src={src} 
          alt={title} 
          className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500' 
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>
      <div className='flex flex-col flex-grow p-3'>
        <h3 className='font-DmSerif text-lg text-lightPrimary dark:text-primary font-bold mb-1.5 group-hover:text-primary transition-colors duration-300'>
          {title}
        </h3>
        <p className='text-xs text-gray-600 dark:text-gray-300 line-clamp-3 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300'>
          {description}
        </p>
      </div>
    </a>
  );
}

export default ProjectCard;
