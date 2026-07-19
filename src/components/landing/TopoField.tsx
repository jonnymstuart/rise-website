"use client";

import { useEffect, useRef, useState } from "react";
import { TOPO_FRAG, TOPO_VERT } from "./topoShaders";
import { TopoFallback } from "./TopoFallback";

type GLState = {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  loc: Record<string, WebGLUniformLocation | null>;
  buffer: WebGLBuffer;
};

/**
 * Full-viewport WebGL topographic contour field.
 * The pointer warps the noise domain; `revealRef` (0..1.15) is written by the
 * intro timeline and read every frame — no React state in the render loop.
 */
export function TopoField({
  revealRef,
  interactive = true,
}: {
  revealRef: React.MutableRefObject<number>;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const s = {
      glState: null as GLState | null,
      raf: 0,
      running: false,
      inView: true,
      pageVisible: !document.hidden,
      reduced: false,
      time: 0,
      lastT: 0,
      resScale: 1,
      frameAvg: 16,
      target: { x: 0, y: 0 },
      cursor: { x: 0, y: 0 },
      lastTarget: { x: 0, y: 0 },
      warp: 0,
      targetWarp: 0,
      hovered: false,
      cssW: 0,
      cssH: 0,
    };

    function initGL(): GLState | null {
      const gl = canvas!.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      });
      if (!gl) return null;
      gl.getExtension("OES_standard_derivatives");

      const compile = (type: number, src: string) => {
        const sh = gl.createShader(type)!;
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          gl.deleteShader(sh);
          return null;
        }
        return sh;
      };
      const vs = compile(gl.VERTEX_SHADER, TOPO_VERT);
      const fs = compile(gl.FRAGMENT_SHADER, TOPO_FRAG);
      if (!vs || !fs) return null;

      const program = gl.createProgram()!;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
      gl.useProgram(program);

      const buffer = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const aPos = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const loc: GLState["loc"] = {};
      for (const name of [
        "u_resolution",
        "u_time",
        "u_cursor",
        "u_warp",
        "u_reveal",
        "u_seed",
      ]) {
        loc[name] = gl.getUniformLocation(program, name);
      }
      gl.uniform1f(loc.u_seed, Math.random() * 100);
      return { gl, program, loc, buffer };
    }

    function size() {
      const st = s.glState;
      if (!st) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * s.resScale;
      const w = Math.max(1, Math.round(s.cssW * dpr));
      const h = Math.max(1, Math.round(s.cssH * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        st.gl.viewport(0, 0, w, h);
      }
    }

    function toBuffer(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * s.resScale;
      return {
        x: (clientX - rect.left) * dpr,
        y: canvas!.height - (clientY - rect.top) * dpr, // GL y-up
      };
    }

    function draw(now: number) {
      const st = s.glState;
      if (!st) return;
      const dt = Math.min((now - s.lastT) / 1000, 0.05);
      s.lastT = now;
      s.time += dt;

      // Adaptive quality: sustained slow frames -> drop internal resolution.
      s.frameAvg = s.frameAvg * 0.95 + dt * 1000 * 0.05;
      if (s.frameAvg > 24 && s.resScale === 1) {
        s.resScale = 0.75;
        s.frameAvg = 16;
        size();
      }

      const kPos = 1 - Math.exp(-dt * 9);
      s.cursor.x += (s.target.x - s.cursor.x) * kPos;
      s.cursor.y += (s.target.y - s.cursor.y) * kPos;

      const moved = Math.hypot(
        s.target.x - s.lastTarget.x,
        s.target.y - s.lastTarget.y,
      );
      s.lastTarget.x = s.target.x;
      s.lastTarget.y = s.target.y;
      const velNorm = Math.min(moved / dt / 1200, 1);
      s.targetWarp = s.hovered ? Math.max(velNorm, 0.12) : 0;

      const rising = s.targetWarp > s.warp;
      const kWarp = 1 - Math.exp(-dt * (rising ? 8 : 2.2));
      s.warp += (s.targetWarp - s.warp) * kWarp;

      const { gl, loc } = st;
      gl.uniform2f(loc.u_resolution, canvas!.width, canvas!.height);
      gl.uniform1f(loc.u_time, s.time);
      gl.uniform2f(loc.u_cursor, s.cursor.x, s.cursor.y);
      gl.uniform1f(loc.u_warp, s.warp);
      gl.uniform1f(loc.u_reveal, revealRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function loop(now: number) {
      draw(now);
      if (s.running) s.raf = requestAnimationFrame(loop);
    }

    function updateRunState() {
      const should =
        !s.reduced && s.inView && s.pageVisible && !!s.glState;
      if (should && !s.running) {
        s.running = true;
        s.lastT = performance.now();
        s.raf = requestAnimationFrame(loop);
      } else if (!should && s.running) {
        s.running = false;
        cancelAnimationFrame(s.raf);
      }
    }

    function drawStaticFrame() {
      // Reduced motion: one calm, fully revealed frame.
      s.time = 7;
      s.warp = 0;
      const keep = revealRef.current;
      revealRef.current = 1.15;
      s.lastT = performance.now();
      draw(performance.now());
      revealRef.current = keep === 0 ? 1.15 : keep;
    }

    const rect = canvas.getBoundingClientRect();
    s.cssW = rect.width;
    s.cssH = rect.height;
    s.target = { x: rect.width / 2, y: rect.height / 2 };

    s.glState = initGL();
    if (!s.glState) {
      setFallback(true);
      return;
    }
    size();
    s.cursor = { ...s.target };
    s.lastTarget = { ...s.target };

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    s.reduced = mql.matches;

    const onMql = () => {
      s.reduced = mql.matches;
      if (s.reduced) {
        updateRunState();
        drawStaticFrame();
      } else {
        updateRunState();
      }
    };
    mql.addEventListener("change", onMql);

    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        s.cssW = e.contentRect.width;
        s.cssH = e.contentRect.height;
      }
      size();
      if (s.reduced) drawStaticFrame();
    });
    ro.observe(canvas.parentElement ?? canvas);

    const io = new IntersectionObserver((entries) => {
      s.inView = entries[0]?.isIntersecting ?? true;
      updateRunState();
    });
    io.observe(canvas);

    const onVis = () => {
      s.pageVisible = !document.hidden;
      updateRunState();
    };
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: PointerEvent) => {
      if (!interactive) return;
      s.hovered = true;
      const p = toBuffer(e.clientX, e.clientY);
      s.target.x = p.x;
      s.target.y = p.y;
    };
    const onDown = (e: PointerEvent) => {
      if (!interactive) return;
      s.hovered = true;
      const p = toBuffer(e.clientX, e.clientY);
      s.target.x = p.x;
      s.target.y = p.y;
      // Let the cursor snap toward taps so touch feels immediate.
      s.cursor.x += (p.x - s.cursor.x) * 0.4;
      s.cursor.y += (p.y - s.cursor.y) * 0.4;
    };
    const onLeave = () => {
      s.hovered = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointercancel", onLeave);

    const onLost = (e: Event) => {
      e.preventDefault();
      s.running = false;
      cancelAnimationFrame(s.raf);
      s.glState = null;
    };
    const onRestored = () => {
      s.glState = initGL();
      if (!s.glState) {
        setFallback(true);
        return;
      }
      size();
      if (s.reduced) drawStaticFrame();
      updateRunState();
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    if (s.reduced) {
      drawStaticFrame();
    } else {
      updateRunState();
    }

    return () => {
      s.running = false;
      cancelAnimationFrame(s.raf);
      mql.removeEventListener("change", onMql);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointercancel", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      const gl = s.glState?.gl;
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      s.glState = null;
    };
  }, [revealRef, interactive]);

  if (fallback) return <TopoFallback />;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
