"use client";
import { useEffect, useRef } from "react";

/**
 * ProxWebGL — animated aurora/plasma backdrop rendered with raw WebGL.
 *
 * Renders a fullscreen fragment shader (domain-warped FBM) tinted in
 * indigo/violet/fuchsia to match the PROX brand. Pointer position and
 * scroll subtly bias the flow, giving the section a cinematic, living feel.
 *
 * No external deps — vanilla WebGL1 for broad compatibility. Falls back
 * silently to a CSS gradient if WebGL is unavailable.
 */
export default function ProxWebGL({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl =
      (canvas.getContext("webgl", { antialias: true, premultipliedAlpha: true }) as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const vertSrc = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // Soft aurora — slow domain-warped FBM, tuned for a calm PROX backdrop.
    const fragSrc = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      // Lighter FBM — 4 octaves is plenty for a soft backdrop.
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.55;
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p = p * 2.0 + vec2(11.3, 7.7);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
        float t = u_time * 0.04;                       // slower drift

        // Single domain warp — keeps the look fluid without overcooking it.
        vec2 q = vec2(fbm(uv * 1.1 + t), fbm(uv * 1.1 + vec2(3.2, 1.7) - t));
        float f = fbm(uv * 1.3 + 1.8 * q + (u_mouse - 0.5) * 0.35);
        f = smoothstep(0.05, 0.95, f);

        // PROX palette — smoother stops, more black space for breathing room.
        vec3 c1 = vec3(0.03, 0.02, 0.08);              // near-black ink
        vec3 c2 = vec3(0.20, 0.18, 0.55);              // deep indigo
        vec3 c3 = vec3(0.55, 0.30, 0.92);              // violet
        vec3 c4 = vec3(0.94, 0.38, 0.78);              // soft fuchsia
        vec3 col = mix(c1, c2, smoothstep(0.10, 0.55, f));
        col = mix(col, c3, smoothstep(0.45, 0.80, f));
        col = mix(col, c4, smoothstep(0.78, 1.00, f));

        // Centre breathing glow + outer vignette
        float d = length(uv);
        col += 0.22 * vec3(0.6, 0.5, 1.0) * smoothstep(0.95, 0.0, d) * (0.7 + 0.3 * sin(u_time * 0.35));
        col *= smoothstep(1.7, 0.25, d);

        // Whisper of grain to mask banding
        col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.015;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, vertSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const a_pos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(a_pos);
    gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

    const u_res = gl.getUniformLocation(prog, "u_res");
    const u_time = gl.getUniformLocation(prog, "u_time");
    const u_mouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", onMove);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let visible = true;
    let docVisible =
      typeof document === "undefined" ? true : !document.hidden;
    const start = performance.now();
    const drawOnce = (t: number) => {
      gl.uniform2f(u_res, canvas.width, canvas.height);
      gl.uniform1f(u_time, t);
      gl.uniform2f(u_mouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    const render = () => {
      const t = (performance.now() - start) / 1000;
      drawOnce(t);
      raf = requestAnimationFrame(render);
    };
    const startLoop = () => {
      if (raf || !visible || !docVisible) return;
      if (reduceMotion) {
        // Render a single static frame instead of animating.
        drawOnce((performance.now() - start) / 1000);
        return;
      }
      raf = requestAnimationFrame(render);
    };
    const stopLoop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Only animate when the canvas is on-screen.
    const vio = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startLoop();
        else stopLoop();
      },
      { threshold: 0 }
    );
    vio.observe(canvas);

    const onVisibility = () => {
      docVisible = !document.hidden;
      if (docVisible) startLoop();
      else stopLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    startLoop();

    return () => {
      stopLoop();
      ro.disconnect();
      vio.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block h-full w-full ${className}`}
      style={{
        background:
          "radial-gradient(closest-side, rgba(99,102,241,0.5), rgba(15,12,30,1) 75%)",
      }}
    />
  );
}
