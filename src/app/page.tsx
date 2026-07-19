"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import VideoScroll from "@/components/VideoScroll";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderCounterRef = useRef<HTMLDivElement>(null);
  
  // Slide Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const techLeftRef = useRef<HTMLDivElement>(null);
  const techRightRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Custom Cursor
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline();
    
    tl.to(counter, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (preloaderCounterRef.current) {
          preloaderCounterRef.current.innerText = Math.round(counter.val).toString().padStart(3, '0');
        }
      }
    })
    .to(preloaderRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    })
    .fromTo(".hero-char", {
      y: 150,
      rotation: 15,
      autoAlpha: 0,
    }, {
      y: 0,
      rotation: 0,
      autoAlpha: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out"
    }, "-=0.6")
    .fromTo(".hero-sub", {
      autoAlpha: 0,
      y: 30
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.8");
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out"
      });
    };
    
    window.addEventListener("mousemove", moveCursor);

    // Cursor hover micro-interactions
    const interactables = document.querySelectorAll('.cursor-hover');
    
    const handleMouseEnter = () => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, { scale: 3, duration: 0.3, ease: 'power2.out' });
    };
    const handleMouseLeave = () => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  useGSAP(() => {
    // 22000px scroll duration for the ultimate cinematic pace
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=22000",
        scrub: 1,
        pin: true,
      }
    });

    // 1. Hero Exit
    tl.to(".hero-text", { y: -50, autoAlpha: 0, duration: 1 })
      .to(".hero-sub", { autoAlpha: 0, duration: 0.5 }, "-=0.5")
    
    // 2. Narrative Side Panel
      .fromTo(narrativeRef.current, { x: "-100%", autoAlpha: 0 }, { x: "0%", autoAlpha: 1, duration: 1.5, ease: "power3.out" })
      .fromTo(".narrative-text", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, stagger: 0.4, duration: 1 }, "-=0.5")
      .to(narrativeRef.current, { x: "-100%", autoAlpha: 0, duration: 1.5, ease: "power3.in" })

    // 3. Bento Grid
      .fromTo(bentoRef.current, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0, duration: 1.5 })
      .fromTo(".bento-card", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=1")
      .to(bentoRef.current, { autoAlpha: 0, scale: 0.95, duration: 1.5 })

    // 4. Selected Expertise (Floating Cards)
      .fromTo(expertiseRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
      .fromTo(".expertise-card:nth-child(1)", { autoAlpha: 0, x: -100, rotationY: -15 }, { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.5 })
      .fromTo(".expertise-card:nth-child(2)", { autoAlpha: 0, x: 100, rotationY: 15 }, { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.5 }, "-=0.5")
      .fromTo(".expertise-card:nth-child(3)", { autoAlpha: 0, x: -100, rotationY: -15 }, { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.5 }, "-=0.5")
      .to(expertiseRef.current, { autoAlpha: 0, y: -100, duration: 1.5 })

    // 5. Tech Stack (Infinite Vertical Marquee)
      .fromTo(techStackRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
      .fromTo(techLeftRef.current, { yPercent: 10 }, { yPercent: -40, duration: 4, ease: "none" }, "<")
      .fromTo(techRightRef.current, { yPercent: -40 }, { yPercent: 10, duration: 4, ease: "none" }, "<")
      .to(techStackRef.current, { autoAlpha: 0, duration: 1 }, "-=0.5")

    // 6. The Manifesto (Clip Path Text Reveal)
      .fromTo(manifestoRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
      .fromTo(".manifesto-line", { autoAlpha: 0, y: 100, clipPath: "inset(0 0 100% 0)" }, { autoAlpha: 1, y: 0, clipPath: "inset(0 0 0% 0)", stagger: 0.3, duration: 2, ease: "power4.out" })
      .to(manifestoRef.current, { autoAlpha: 0, scale: 1.05, duration: 1.5 })

    // 7. Showcase Marquee
      .fromTo(marqueeRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
      .fromTo(marqueeInnerRef.current, { xPercent: 10 }, { xPercent: -50, duration: 4, ease: "none" }, "<")
      .to(marqueeRef.current, { autoAlpha: 0, duration: 1 }, "-=0.5")

    // 8. Global Team
      .fromTo(teamRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
      .fromTo(".team-member", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, stagger: 0.2, duration: 1.5, ease: "power3.out" }, "-=0.5")
      .to(teamRef.current, { autoAlpha: 0, duration: 1 }, "+=1")

    // 9. Footer
      .fromTo(footerRef.current, { autoAlpha: 0, y: "100%" }, { autoAlpha: 1, y: "0%", duration: 1.5, ease: "power3.out" });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-transparent text-white w-full cursor-none">
      
      {/* Custom Cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out flex items-center justify-center">
      </div>

      {/* Background Video */}
      <VideoScroll totalFrames={423} />

      {/* Pinned Wrapper */}
      <div ref={wrapperRef} className="relative w-full h-screen overflow-hidden z-10">
        {/* --- GLOBAL CINEMATIC OVERLAYS --- */}
        <div className="film-grain" />
        <div className="vignette" />

        {/* --- PRELOADER --- */}
        <div ref={preloaderRef} className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center pointer-events-none">
           <div className="overflow-hidden">
             <div ref={preloaderCounterRef} className="font-serif text-[15vw] md:text-[10vw] text-white leading-none tracking-tight">000</div>
           </div>
           <div className="absolute bottom-12 font-sans text-[10px] uppercase tracking-[0.5em] text-white/50 animate-pulse">Loading Assets</div>
        </div>

        {/* --- PROLOGUE: HERO --- */}
        <div ref={heroRef} className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 md:px-12 lg:px-24">
          <div className="z-10 w-full max-w-7xl flex flex-col relative h-full justify-center py-20">
            
            {/* Top Left / Top Right Asymmetric Elements */}
            <div className="hero-sub flex justify-between w-full mb-auto mt-12 invisible">
               <div className="text-white/50 font-sans font-medium text-[10px] tracking-[0.4em] uppercase space-y-1">
                 <p>40° 42' 46" N</p>
                 <p>74° 0' 21" W</p>
               </div>
               <div className="w-16 h-16 md:w-20 md:h-20 border border-white/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite] shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <span className="text-white/70 font-sans text-[8px] md:text-[10px] tracking-[0.2em] uppercase">EST 2026</span>
               </div>
            </div>

            {/* Massive Staggered Text */}
            <div className="overflow-hidden py-4 -ml-2 md:-ml-4">
              <h1 className="hero-text font-serif text-[18vw] md:text-[20vw] leading-[0.75] tracking-tighter text-white drop-shadow-2xl flex mix-blend-screen">
                {"STUDIO".split('').map((char, i) => (
                  <span key={i} className="hero-char inline-block invisible text-outline hover:text-white transition-colors duration-500 cursor-hover pointer-events-auto">{char}</span>
                ))}
              </h1>
            </div>
            
            {/* Bottom Right Description */}
            <div className="hero-sub self-end mt-auto max-w-xs md:max-w-sm text-right invisible">
              <p className="text-white/80 font-sans font-light tracking-[0.2em] uppercase text-xs md:text-sm leading-relaxed mix-blend-screen">
                We craft digital excellence through cinematic motion and architectural precision.
              </p>
            </div>
          </div>

          <div className="hero-sub absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center invisible">
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] mb-4 text-white mix-blend-screen">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/80 to-transparent" />
          </div>
        </div>

        {/* --- CHAPTER I: NARRATIVE PANEL --- */}
        <div ref={narrativeRef} className="absolute inset-y-0 left-0 w-full md:w-[35vw] flex flex-col justify-center px-12 md:px-20 pointer-events-none invisible bg-black/40 backdrop-blur-2xl border-r border-white/10 shadow-2xl">
          <div className="space-y-12">
            <h2 className="narrative-text text-4xl md:text-5xl font-sans font-light tracking-tight text-white leading-tight cursor-hover pointer-events-auto">
              Immersive <br/><span className="font-serif text-white/80">Storytelling</span>
            </h2>
            <p className="narrative-text font-sans text-white/60 font-light text-sm md:text-base leading-relaxed tracking-wide">
              We transcend traditional interfaces. By combining cutting-edge technology with cinematic visuals, we create digital environments that captivate and inspire.
            </p>
            <div className="narrative-text w-12 h-[1px] bg-white/30" />
            <h2 className="narrative-text text-4xl md:text-5xl font-sans font-light tracking-tight text-white leading-tight cursor-hover pointer-events-auto">
              Meticulous <br/><span className="font-serif text-white/80">Detail</span>
            </h2>
          </div>
        </div>

        {/* --- CHAPTER II: BENTO GRID --- */}
        <div ref={bentoRef} className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-12 lg:px-24 invisible pointer-events-none perspective-[1200px]">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* The Vision - Large Hero Card */}
            <div className="bento-card md:col-span-8 rounded-3xl p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-3xl border border-white/20 hover:border-white/30 transition-all duration-700 cursor-hover pointer-events-auto group overflow-hidden relative shadow-2xl">
              <div className="absolute -right-12 -bottom-12 text-[30vw] md:text-[20vw] font-serif text-white/[0.05] pointer-events-none group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-1000 leading-none">
                V
              </div>
              <div className="flex justify-between items-start w-full relative z-10">
                <span className="font-sans font-medium text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/70">Our Vision</span>
                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-[10px] text-white/70 font-sans tracking-widest bg-black/20">01</span>
              </div>
              <div className="mt-12 md:mt-16 relative z-10">
                <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1] mb-4 tracking-wide drop-shadow-xl">Redefining <br/>Digital Space</h3>
                <p className="font-sans font-light text-white/80 max-w-md text-xs md:text-sm leading-relaxed tracking-wide">
                  We blend high-end cinematography with timeless architectural design principles to craft web experiences that evoke profound emotional resonance.
                </p>
              </div>
            </div>

            {/* Always Active - Dynamic Card */}
            <div className="bento-card md:col-span-4 rounded-3xl p-6 md:p-8 flex flex-col justify-between items-center text-center bg-black/60 backdrop-blur-3xl border border-white/20 cursor-hover pointer-events-auto relative overflow-hidden group hover:border-white/30 transition-colors duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <span className="font-sans font-medium text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/70 self-start relative z-10">Status</span>
              <div className="flex-1 flex items-center justify-center w-full my-6 relative z-10">
                <div className="relative flex items-center justify-center w-24 h-24 group-hover:scale-110 transition-transform duration-1000">
                  <div className="absolute inset-0 rounded-full border-[1px] border-white/30 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border-[1px] border-white/20 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="absolute inset-4 rounded-full border-[1px] border-white/10 animate-[spin_8s_linear_infinite]" />
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_25px_8px_rgba(255,255,255,0.8)]" />
                </div>
              </div>
              <h3 className="font-sans text-[10px] md:text-xs font-medium tracking-[0.4em] text-white/90 uppercase relative z-10">Always Active</h3>
            </div>

            {/* Process - Structural Card */}
            <div className="bento-card md:col-span-5 rounded-3xl p-6 md:p-8 bg-white/10 backdrop-blur-2xl border border-white/20 cursor-hover pointer-events-auto flex flex-col justify-between hover:bg-white/15 transition-colors duration-700">
              <span className="font-sans font-medium text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/70 mb-8">Methodology</span>
              <div className="space-y-4 md:space-y-6">
                <div className="group/item flex items-center gap-6 cursor-none">
                  <span className="font-serif text-xl md:text-2xl text-white/40 group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300">01</span>
                  <div className="h-[1px] flex-1 bg-white/20 group-hover/item:bg-white/60 transition-colors duration-300" />
                  <span className="font-sans font-medium text-xs md:text-sm tracking-[0.2em] uppercase text-white/70 group-hover/item:text-white transition-colors duration-300">Research</span>
                </div>
                <div className="group/item flex items-center gap-6 cursor-none">
                  <span className="font-serif text-xl md:text-2xl text-white/40 group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300">02</span>
                  <div className="h-[1px] flex-1 bg-white/20 group-hover/item:bg-white/60 transition-colors duration-300" />
                  <span className="font-sans font-medium text-xs md:text-sm tracking-[0.2em] uppercase text-white/70 group-hover/item:text-white transition-colors duration-300">Prototype</span>
                </div>
                <div className="group/item flex items-center gap-6 cursor-none">
                  <span className="font-serif text-xl md:text-2xl text-white/40 group-hover/item:text-white group-hover/item:scale-110 transition-all duration-300">03</span>
                  <div className="h-[1px] flex-1 bg-white/20 group-hover/item:bg-white/60 transition-colors duration-300" />
                  <span className="font-sans font-medium text-xs md:text-sm tracking-[0.2em] uppercase text-white/70 group-hover/item:text-white transition-colors duration-300">Execute</span>
                </div>
              </div>
            </div>

            {/* Pushing Boundaries - Action Card (NOW A LINK) */}
            <Link href="/work" className="bento-card md:col-span-7 rounded-3xl p-6 md:p-8 flex flex-col justify-center items-start pointer-events-auto bg-black/80 backdrop-blur-3xl border border-white/20 cursor-hover hover:border-white/40 transition-all duration-700 group relative overflow-hidden block">
              <div className="absolute inset-0 bg-white/[0.05] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
              <div className="relative z-10 w-full flex items-center justify-between">
                <div className="max-w-[70%]">
                  <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-4 group-hover:translate-x-4 transition-transform duration-500 ease-out drop-shadow-xl">
                    Pushing<br/>Boundaries
                  </h2>
                  <span className="text-[10px] md:text-xs font-sans font-medium tracking-[0.4em] uppercase text-white/50 group-hover:text-white/90 transition-colors duration-500">
                    Explore Our Work
                  </span>
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* --- CHAPTER III: SELECTED EXPERTISE --- */}
        <div ref={expertiseRef} className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-0 invisible pointer-events-none perspective-[1000px]">
          <h2 className="absolute top-24 font-serif text-3xl md:text-5xl text-white/90">Core Expertise</h2>
          <div className="flex flex-col gap-8 w-full max-w-4xl mt-16">
            <div className="expertise-card w-3/4 self-start bg-black/30 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-2xl flex items-center justify-between cursor-hover pointer-events-auto">
              <h3 className="font-serif text-4xl text-white">Cinematography</h3>
              <span className="font-sans font-light text-white/50 tracking-widest">01</span>
            </div>
            <div className="expertise-card w-3/4 self-end bg-black/30 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-2xl flex items-center justify-between cursor-hover pointer-events-auto">
              <span className="font-sans font-light text-white/50 tracking-widest">02</span>
              <h3 className="font-serif text-4xl text-white">Creative Direction</h3>
            </div>
            <div className="expertise-card w-3/4 self-start bg-black/30 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-2xl flex items-center justify-between cursor-hover pointer-events-auto">
              <h3 className="font-serif text-4xl text-white">WebGL / 3D</h3>
              <span className="font-sans font-light text-white/50 tracking-widest">03</span>
            </div>
          </div>
        </div>

        {/* --- CHAPTER IV: TECH STACK (VERTICAL MARQUEE) --- */}
        <div ref={techStackRef} className="absolute inset-0 flex flex-row items-center justify-between px-10 md:px-32 invisible pointer-events-none overflow-hidden mix-blend-overlay">
          <div className="w-1/2 flex flex-col h-[200vh] justify-center items-start">
            <div ref={techLeftRef} className="flex flex-col gap-16 font-sans font-black text-6xl md:text-8xl text-white/10 uppercase whitespace-nowrap">
              <span>React • Next.js • GSAP</span>
              <span>Three.js • WebGL</span>
              <span>TailwindCSS • Framer</span>
              <span>React • Next.js • GSAP</span>
            </div>
          </div>
          <div className="w-1/2 flex flex-col h-[200vh] justify-center items-end">
            <div ref={techRightRef} className="flex flex-col gap-16 font-serif text-6xl md:text-8xl text-white/10 uppercase whitespace-nowrap text-right">
              <span>Vercel • WebRTC</span>
              <span>WebAudio API • Node</span>
              <span>PostgreSQL • Redis</span>
              <span>Vercel • WebRTC</span>
            </div>
          </div>
        </div>

        {/* --- CHAPTER V: THE MANIFESTO --- */}
        <div ref={manifestoRef} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center invisible pointer-events-none">
          <div className="max-w-6xl overflow-hidden py-4 cursor-hover pointer-events-auto">
            <h2 className="manifesto-line font-serif text-5xl md:text-[6vw] leading-tight text-white drop-shadow-xl">
              We don't just build websites.
            </h2>
          </div>
          <div className="max-w-6xl overflow-hidden py-4 cursor-hover pointer-events-auto">
            <h2 className="manifesto-line font-serif text-5xl md:text-[6vw] leading-tight text-white drop-shadow-xl">
              We forge immersive digital legacies
            </h2>
          </div>
          <div className="max-w-6xl overflow-hidden py-4 cursor-hover pointer-events-auto">
            <h2 className="manifesto-line font-serif text-5xl md:text-[6vw] leading-tight text-white/70 drop-shadow-xl">
              that define the future of the web.
            </h2>
          </div>
        </div>

        {/* --- CHAPTER VI: SHOWCASE MARQUEE --- */}
        <div ref={marqueeRef} className="absolute inset-0 flex items-center overflow-hidden invisible pointer-events-none bg-black/20 backdrop-blur-sm cursor-hover pointer-events-auto">
          <div className="w-full flex whitespace-nowrap">
            <div ref={marqueeInnerRef} className="flex gap-32 px-12 items-center">
              <div className="flex flex-col">
                <span className="font-sans text-xs tracking-[0.4em] text-white/50 uppercase mb-4">Project 01</span>
                <span className="font-serif text-[12vw] text-white leading-none">Aethelgard</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs tracking-[0.4em] text-white/50 uppercase mb-4">Project 02</span>
                <span className="font-serif text-[12vw] text-white leading-none">Monolith</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs tracking-[0.4em] text-white/50 uppercase mb-4">Project 03</span>
                <span className="font-serif text-[12vw] text-white leading-none">Vanguard</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs tracking-[0.4em] text-white/50 uppercase mb-4">Project 04</span>
                <span className="font-serif text-[12vw] text-white leading-none">Elysium</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- CHAPTER VII: GLOBAL TEAM (LEADERSHIP) --- */}
        <div ref={teamRef} className="absolute inset-0 flex flex-col items-center justify-center invisible pointer-events-none px-4 md:px-12">
          
          {/* Massive Background Typography */}
          <div className="absolute left-[-15vw] top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none opacity-[0.03]">
            <h2 className="font-serif text-[25vw] leading-none whitespace-nowrap drop-shadow-2xl">LEADERSHIP</h2>
          </div>

          <div className="relative z-10 w-full max-w-7xl flex flex-col gap-6 md:gap-8 mt-12 md:mt-0">
            {/* Top Row: Marcus (Large) & Elena (Tall) */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full h-auto md:h-[45vh]">
              
              {/* Marcus Chen */}
              <div className="team-member flex-1 bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group cursor-hover pointer-events-auto transition-all duration-700 hover:border-white/30">
                <div className="absolute -right-20 -top-20 w-96 h-96 border-[0.5px] border-white/10 rounded-full group-hover:scale-110 transition-transform duration-1000 animate-[spin_30s_linear_infinite]" />
                <div className="absolute -right-32 -top-32 w-96 h-96 border-[0.5px] border-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000 animate-[spin_40s_linear_infinite_reverse]" />
                
                <div className="h-full flex flex-col justify-end relative z-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-sans font-medium text-[10px] tracking-[0.4em] uppercase text-white/50 mb-4 group-hover:text-white/80 transition-colors">Lead Architect</p>
                      <h3 className="font-serif text-4xl md:text-6xl text-white group-hover:translate-x-2 transition-transform duration-500">Marcus Chen</h3>
                    </div>
                    <span className="font-serif text-4xl text-white/10 group-hover:text-white/30 transition-colors duration-500">01</span>
                  </div>
                </div>
              </div>

              {/* Elena Rostova */}
              <div className="team-member w-full md:w-[35%] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group cursor-hover pointer-events-auto transition-all duration-700 hover:border-white/30">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 transform -translate-x-full group-hover:translate-x-0" />
                
                <div className="h-full flex flex-col justify-end relative z-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-sans font-medium text-[10px] tracking-[0.4em] uppercase text-white/50 mb-4 group-hover:text-white/80 transition-colors">Creative Director</p>
                      <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight group-hover:translate-x-2 transition-transform duration-500">Elena<br/>Rostova</h3>
                    </div>
                    <span className="font-serif text-4xl text-white/10 group-hover:text-white/30 transition-colors duration-500">02</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Sarah (Full width narrow) */}
            <div className="team-member w-full h-auto md:h-[25vh] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group cursor-hover pointer-events-auto transition-all duration-700 hover:bg-white/10 hover:border-white/20">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                 <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              
              <div className="h-full flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
                <div className="flex items-center gap-8 md:gap-16 mb-8 md:mb-0">
                  <span className="font-serif text-4xl text-white/10 group-hover:text-white/30 transition-colors duration-500">03</span>
                  <div>
                    <p className="font-sans font-medium text-[10px] tracking-[0.4em] uppercase text-white/50 mb-2 group-hover:text-white/80 transition-colors">Head of Motion</p>
                    <h3 className="font-serif text-4xl md:text-5xl text-white group-hover:translate-x-2 transition-transform duration-500">Sarah Jenkins</h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group/btn">
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/40 group-hover/btn:text-white transition-colors duration-300">View Profile</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-300 transform -rotate-45 group-hover/btn:rotate-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- EPILOGUE: FOOTER MINIMALIST --- */}
        <div ref={footerRef} className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/90 to-transparent invisible pointer-events-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end p-12 md:p-24 z-10 w-full max-w-screen-2xl mx-auto">
            <div className="max-w-md cursor-hover">
              <h4 className="font-sans font-light text-2xl md:text-4xl mb-6 text-white/90 leading-tight">
                Let's build something <br/><span className="font-serif text-white">extraordinary</span> together.
              </h4>
              <a href="mailto:hello@studio.com" className="font-sans font-light tracking-widest text-sm text-white/60 hover:text-white transition-colors uppercase">
                hello@studio.com
              </a>
            </div>
            
            <div className="flex gap-16 font-sans font-light text-xs tracking-widest uppercase text-white/60 mt-12 md:mt-0">
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors cursor-hover">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-hover">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-hover">LinkedIn</a></li>
              </ul>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors cursor-hover">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-hover">Work</a></li>
                <li><a href="#" className="hover:text-white transition-colors cursor-hover">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="w-full text-center pb-8 opacity-20 overflow-hidden">
            <h1 className="font-serif text-[18vw] leading-none tracking-tighter text-white pointer-events-none translate-y-12">
              STUDIO
            </h1>
          </div>
        </div>

      </div>
    </main>
  );
}
