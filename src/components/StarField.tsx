"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  size: number;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const STAR_COLORS = [
  "rgba(255,255,255,",
  "rgba(165,184,252,",
  "rgba(217,70,239,",
  "rgba(245,158,11,",
  "rgba(99,102,241,",
];

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  const createStars = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / 4000);
    starsRef.current = Array.from({ length: Math.min(count, 350) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random(),
      px: 0,
      py: 0,
      size: Math.random() * 2 + 0.3,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));
  }, []);

  const spawnShootingStar = useCallback((width: number, height: number) => {
    if (shootingStarsRef.current.length >= 3) return;
    const angle = (Math.random() * Math.PI) / 4 + Math.PI / 6;
    const speed = Math.random() * 6 + 4;
    shootingStarsRef.current.push({
      x: Math.random() * width * 0.7,
      y: Math.random() * height * 0.4,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: Math.random() * 60 + 40,
      size: Math.random() * 2 + 1,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = (time: number) => {
      frameRef.current = time;
      const { width, height } = canvas;

      // Clear with trail effect
      ctx.fillStyle = "rgba(3,2,13,0.25)";
      ctx.fillRect(0, 0, width, height);

      // Nebula clouds
      const drawNebula = (
        x: number,
        y: number,
        r: number,
        colorA: string,
        colorB: string
      ) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, colorA);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      };

      drawNebula(
        width * 0.2 + Math.sin(time * 0.0001) * 50,
        height * 0.3,
        width * 0.3,
        "rgba(99,102,241,0.04)",
        "transparent"
      );
      drawNebula(
        width * 0.8,
        height * 0.6 + Math.cos(time * 0.0001) * 40,
        width * 0.25,
        "rgba(217,70,239,0.04)",
        "transparent"
      );
      drawNebula(width * 0.5, height * 0.1, width * 0.2, "rgba(245,158,11,0.025)", "transparent");

      // Draw stars
      starsRef.current.forEach((star) => {
        const twinkle =
          0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = 0.3 + 0.7 * twinkle;
        const size = star.size * (0.8 + 0.4 * twinkle);

        // Subtle parallax
        const dx = (mouseRef.current.x - width / 2) * star.z * 0.008;
        const dy = (mouseRef.current.y - height / 2) * star.z * 0.008;

        const sx = star.x + dx;
        const sy = star.y + dy;

        // Glow for brighter stars
        if (star.size > 1.5) {
          ctx.beginPath();
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 3);
          glow.addColorStop(0, star.color + alpha * 0.3 + ")");
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.arc(sx, sy, size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star body
        ctx.beginPath();
        ctx.fillStyle = star.color + alpha + ")";
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        const progress = s.life / s.maxLife;
        const alpha = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;

        const tailLength = 80;
        const grad = ctx.createLinearGradient(
          s.x - s.vx * tailLength,
          s.y - s.vy * tailLength,
          s.x,
          s.y
        );
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, `rgba(255,255,255,${alpha})`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.size;
        ctx.moveTo(s.x - s.vx * tailLength, s.y - s.vy * tailLength);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        return s.life < s.maxLife && s.x < width && s.y < height;
      });

      // Spawn shooting stars randomly
      if (Math.random() < 0.003) {
        spawnShootingStar(width, height);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [createStars, spawnShootingStar]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ background: "radial-gradient(ellipse at 20% 50%, #0d0b3f 0%, #03020d 60%, #07052a 100%)" }}
    />
  );
}
