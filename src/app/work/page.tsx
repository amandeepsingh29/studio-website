import React from 'react';
import Link from 'next/link';

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden flex flex-col items-center justify-center relative py-32">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-white/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center w-full max-w-5xl px-6">
        <span className="font-sans font-medium tracking-[0.5em] text-white/50 text-xs md:text-sm uppercase mb-8">Selected Case Studies</span>
        
        <h1 className="font-serif text-5xl md:text-8xl lg:text-[10vw] leading-[0.9] tracking-wide mb-12 drop-shadow-2xl">
          PUSHING<br/>BOUNDARIES
        </h1>
        
        <p className="font-sans font-light text-white/70 max-w-lg mb-20 text-sm md:text-base leading-relaxed">
          Our portfolio represents the bleeding edge of digital interaction. 
          We merge high-end cinematography, WebGL architectures, and timeless design to redefine what is possible in the browser.
        </p>

        {/* Minimalist Gallery / Links */}
        <div className="flex flex-col w-full border-t border-white/20 mb-20 text-left">
          {['Aethelgard', 'Monolith', 'Vanguard', 'Elysium'].map((project, idx) => (
            <div key={project} className="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-12 border-b border-white/20 hover:border-white/50 transition-colors duration-500 cursor-pointer">
              <div className="flex items-center gap-8 md:gap-16 mb-4 md:mb-0">
                <span className="font-sans text-xs tracking-widest text-white/30 group-hover:text-white/80 transition-colors duration-500">0{idx + 1}</span>
                <h2 className="font-serif text-4xl md:text-6xl text-white/60 group-hover:text-white group-hover:translate-x-4 transition-all duration-500">{project}</h2>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/0 group-hover:text-white/60 transition-colors duration-500 hidden md:block">View Project</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 transform -rotate-45 group-hover:rotate-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/" className="group flex items-center gap-6 border border-white/20 rounded-full px-10 py-5 hover:bg-white hover:text-black hover:border-white transition-all duration-500 backdrop-blur-md bg-white/5">
          <svg className="w-4 h-4 transform rotate-180 group-hover:-translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span className="font-sans text-xs tracking-[0.3em] uppercase font-medium">Return to Experience</span>
        </Link>
      </div>
      
    </main>
  );
}
