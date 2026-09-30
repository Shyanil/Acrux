"use client";
import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  isSplash?: boolean;
}

export default function WaterCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop/fine pointers to avoid interfering with mobile touch
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!canvas || !dot || !ring) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Cursor position and smooth ring interpolation
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHoveringInteractive = false;
    let isMouseDown = false;
    let isVisible = false;

    // Water ripple state
    const ripples: Ripple[] = [];
    let lastRippleX = 0;
    let lastRippleY = 0;
    let animId: number | null = null;

    const spawnRipple = (x: number, y: number, isSplash = false) => {
      ripples.push({
        x,
        y,
        radius: isSplash ? 3 : 2,
        maxRadius: isSplash ? 70 + Math.random() * 25 : 36 + Math.random() * 18,
        opacity: isSplash ? 0.7 : 0.42,
        speed: isSplash ? 2.2 : 1.35,
        isSplash,
      });

      // Keep ripple array light for 60fps performance
      if (ripples.length > 35) {
        ripples.shift();
      }

      startAnimIfNeeded();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Check distance from last ripple
      const dx = mouseX - lastRippleX;
      const dy = mouseY - lastRippleY;
      const dist = Math.hypot(dx, dy);

      // Spawn subtle water drop ripples as cursor glides
      if (dist > 32) {
        spawnRipple(mouseX, mouseY, false);
        lastRippleX = mouseX;
        lastRippleY = mouseY;
      }

      startAnimIfNeeded();
    };

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      spawnRipple(e.clientX, e.clientY, true);
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // Detect clickable elements for magnetic cursor enlargement
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest("a, button, input, select, textarea, [role='button'], .image-button, .hero-arrow, .hero-dot, .unit-pill, .enquiry-modal-close, .dialog-close, label.consent, .outline-button, .solid-button, .text-link");
      isHoveringInteractive = !!clickable;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    // Animation loop
    const render = () => {
      // 1. Update cursor positions
      if (isVisible) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        // Smooth spring-like lerp for outer ring
        const lerpFactor = 0.2;
        ringX += (mouseX - ringX) * lerpFactor;
        ringY += (mouseY - ringY) * lerpFactor;

        let scale = 1;
        if (isMouseDown) {
          scale = 0.75;
        } else if (isHoveringInteractive) {
          scale = 1.65;
        }

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
        if (isHoveringInteractive) {
          ring.classList.add("cursor-hover");
          dot.classList.add("cursor-hover");
        } else {
          ring.classList.remove("cursor-hover");
          dot.classList.remove("cursor-hover");
        }
      }

      // 2. Render water drop ripples
      ctx.clearRect(0, 0, width, height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity -= r.isSplash ? 0.016 : 0.014;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw primary concentric water ripple ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(173, 216, 235, ${r.opacity.toFixed(3)})`;
        ctx.lineWidth = Math.max(0.6, 1.8 * (r.opacity / 0.7));
        ctx.stroke();

        // Draw secondary harmonic echo ring for realistic water refraction
        if (r.radius > 9) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, Math.max(1, r.radius - 7), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${(r.opacity * 0.5).toFixed(3)})`;
          ctx.lineWidth = Math.max(0.5, 1.2 * (r.opacity / 0.7));
          ctx.stroke();
        }

        // For splash ripples, draw a subtle third wave
        if (r.isSplash && r.radius > 16) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, Math.max(1, r.radius - 15), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(173, 63, 60, ${(r.opacity * 0.35).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Continue animating if ripples remain or cursor is moving
      if (ripples.length > 0 || Math.abs(mouseX - ringX) > 0.5 || Math.abs(mouseY - ringY) > 0.5) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    const startAnimIfNeeded = () => {
      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };

    startAnimIfNeeded();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="water-ripple-canvas" aria-hidden="true" />
      <div ref={dotRef} className="luxury-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="luxury-cursor-ring" aria-hidden="true" />
    </>
  );
}
