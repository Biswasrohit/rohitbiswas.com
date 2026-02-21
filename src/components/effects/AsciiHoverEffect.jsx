import { useRef, useEffect, useCallback } from 'react';

const COL_GAP = 22;
const ROW_GAP = 18;
const REVEAL_RADIUS = 180;
const PEAK_OPACITY = 0.30;
const BOOST_AMOUNT = 0.06;
const DECAY_FACTOR = 0.97;
const FONT_SIZE = 13;

const charSets = ['>', '>', '>', '-', '-', '-', '_', '_', '_'];

const AsciiHoverEffect = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const hasHoverRef = useRef(true);
  const gridRef = useRef(null);
  const dimsRef = useRef({ cols: 0, rows: 0 });

  const getChar = useCallback((col, row) => {
    const bandIndex = (row + Math.floor(col / 3)) % charSets.length;
    return charSets[bandIndex];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    hasHoverRef.current = window.matchMedia('(hover: hover)').matches;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(rect.width / COL_GAP) + 1;
      const rows = Math.ceil(rect.height / ROW_GAP) + 1;
      dimsRef.current = { cols, rows };
      gridRef.current = new Float32Array(cols * rows);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', onMouseMove);
    parent.addEventListener('mouseleave', onMouseLeave);

    const draw = (timestamp) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const { cols, rows } = dimsRef.current;
      const grid = gridRef.current;

      if (!grid) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Determine cursor position (phantom on mobile)
      let mx, my;
      if (!hasHoverRef.current) {
        const t = timestamp * 0.001;
        mx = w * 0.5 + Math.sin(t * 0.4) * w * 0.28;
        my = h * 0.4 + Math.cos(t * 0.25) * h * 0.22;
      } else {
        mx = mouseRef.current.x;
        my = mouseRef.current.y;
      }

      // Boost cells near cursor
      const radiusSq = REVEAL_RADIUS * REVEAL_RADIUS;
      const colMin = Math.max(0, Math.floor((mx - REVEAL_RADIUS) / COL_GAP));
      const colMax = Math.min(cols - 1, Math.ceil((mx + REVEAL_RADIUS) / COL_GAP));
      const rowMin = Math.max(0, Math.floor((my - REVEAL_RADIUS) / ROW_GAP));
      const rowMax = Math.min(rows - 1, Math.ceil((my + REVEAL_RADIUS) / ROW_GAP));

      for (let row = rowMin; row <= rowMax; row++) {
        for (let col = colMin; col <= colMax; col++) {
          const x = col * COL_GAP;
          const y = row * ROW_GAP;
          const dx = x - mx;
          const dy = y - my;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const t = 1 - dist / REVEAL_RADIUS;
            const boost = BOOST_AMOUNT * t * t;
            const idx = row * cols + col;
            grid[idx] = Math.min(PEAK_OPACITY, grid[idx] + boost);
          }
        }
      }

      // Decay all cells and draw
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;
      ctx.textBaseline = 'middle';

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;

          // Decay
          grid[idx] *= DECAY_FACTOR;

          // Skip nearly invisible cells for perf
          if (grid[idx] < 0.005) {
            grid[idx] = 0;
            continue;
          }

          const x = col * COL_GAP;
          const y = row * ROW_GAP;
          const char = getChar(col, row);
          ctx.fillStyle = `rgba(255, 255, 255, ${grid[idx]})`;
          ctx.fillText(char, x, y);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      parent.removeEventListener('mousemove', onMouseMove);
      parent.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [getChar]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default AsciiHoverEffect;
