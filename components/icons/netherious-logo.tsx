// app/components/icons/netherious-logo.tsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function NetheriousLogo({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: { x: number; y: number; dx: number; dy: number; r: number }[] = [];
    const numParticles = 200;

    const width = canvas.width = 200;
    const height = canvas.height = 200;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.5 + 0.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const update = () => {
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
    };

    const animate = () => {
      draw();
      update();
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className={cn('relative w-20 h-20', className)}>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold"
      >
        N
      </motion.div>
    </div>
  );
}
