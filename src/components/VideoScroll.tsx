"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoScrollProps {
  totalFrames: number;
}

export default function VideoScroll({ totalFrames }: VideoScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const renderFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const loadImages = () => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const paddedIndex = i.toString().padStart(4, "0");
        img.src = `/frames/frame_${paddedIndex}.jpg`;

        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / totalFrames) * 100));
          if (loadedCount === totalFrames) {
            setLoaded(true);
            drawFrame(0);
          }
        };
        img.onerror = () => {
          loadedCount++; 
          console.error(`Failed to load frame ${i}`);
          if (loadedCount === totalFrames) {
            setLoaded(true);
            drawFrame(0);
          }
        };
        images.push(img);
      }
      imagesRef.current = images;
    };

    loadImages();

    return () => {
      imagesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames]);

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img) return;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    if (renderFrameRef.current !== null) {
      cancelAnimationFrame(renderFrameRef.current);
    }

    renderFrameRef.current = requestAnimationFrame(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(currentFrameRef.current);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    // Use document.body to map the ENTIRE page scroll to the video scrub
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1, // Smooth interpolation
      onUpdate: (self) => {
        const frameIndex = Math.min(
          totalFrames - 1,
          Math.floor(self.progress * totalFrames)
        );
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      },
    });

    return () => {
      trigger.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, totalFrames]);

  return (
    <>
      {/* Loading Screen - Covers everything until loaded */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
          <div className="text-4xl font-light tracking-widest mb-4 font-sans">LOADING</div>
          <div className="w-64 h-1 bg-gray-800 rounded overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out" 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="mt-4 text-sm text-gray-500 font-mono">{loadingProgress}%</div>
        </div>
      )}

      {/* Fixed Canvas Background Layer */}
      <div className="fixed inset-0 w-full h-screen bg-black z-0 overflow-hidden pointer-events-none">
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover opacity-80" 
          aria-hidden="true"
        />
        {/* Subtle overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Accessible fallback */}
      <div className="sr-only">
        This section contains an interactive video that scrubs forward and backward as you scroll down the page.
      </div>
    </>
  );
}
