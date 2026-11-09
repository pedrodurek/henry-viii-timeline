import { useEffect, useRef } from 'react';

interface Mote {
  x: number;
  y: number;
  r: number;
  v: number;
  s: number;
  dx: number;
  dy: number;
}

/** Drifting gold dust that scatters away from the cursor. Pauses while off screen. */
export function GoldDust({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const motes: Mote[] = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2.2 + 0.4,
      v: Math.random() * 0.0009 + 0.0002,
      s: Math.random() * Math.PI * 2,
      dx: 0,
      dy: 0,
    }));
    const mouse = { x: -999, y: -999 };
    let w = 0;
    let h = 0;
    let running = true;
    let frame = 0;

    const size = () => {
      const dpr = devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const tick = (t: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of motes) {
        p.y -= p.v;
        p.x += Math.sin(t / 2000 + p.s) * 0.0003;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        const px = p.x * w + p.dx;
        const py = p.y * h + p.dy;
        const ddx = px - mouse.x;
        const ddy = py - mouse.y;
        const dist = Math.hypot(ddx, ddy);
        if (dist < 120 && dist > 0) {
          p.dx += (ddx / dist) * 2;
          p.dy += (ddy / dist) * 2;
        }
        p.dx *= 0.96;
        p.dy *= 0.96;
        const twinkle = 0.45 + 0.55 * Math.sin(t / 400 + p.s * 3);
        const g = ctx.createRadialGradient(px, py, 0, px, py, p.r * 4);
        g.addColorStop(0, `rgba(255,226,150,${0.9 * twinkle})`);
        g.addColorStop(1, 'rgba(216,173,85,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(tick);
    };

    size();
    addEventListener('resize', size);
    const host = canvas.parentElement;
    host?.addEventListener('pointermove', onMove);
    const io = new IntersectionObserver(([entry]) => {
      const visible = !!entry?.isIntersecting;
      if (visible && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }
      running = visible;
    });
    io.observe(canvas);
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      removeEventListener('resize', size);
      host?.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
