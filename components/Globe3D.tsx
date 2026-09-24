"use client";
import { useEffect, useRef } from "react";

export default function Globe3D({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 500);

    // Globe parameters
    const globeRadius = Math.min(width, height) * 0.45;
    const center = { x: width / 2, y: height * 0.65 }; // Half-globe positioning down the bottom half

    let rotationX = 0.2;
    let rotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    // Generate latitude/longitude dot grid
    const points: { x: number; y: number; z: number; lat: number; lon: number }[] = [];
    const latStep = 12;
    const lonStep = 15;

    for (let lat = -80; lat <= 80; lat += latStep) {
      const phi = ((90 - lat) * Math.PI) / 180;
      const radiusAtLat = Math.sin(phi);

      for (let lon = -180; lon < 180; lon += lonStep) {
        const theta = (lon * Math.PI) / 180;
        points.push({
          x: radiusAtLat * Math.cos(theta),
          y: Math.cos(phi),
          z: radiusAtLat * Math.sin(theta),
          lat,
          lon,
        });
      }
    }

    // Key Hub Cities
    const hubs = [
      { name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
      { name: "London", lat: 51.5074, lon: -0.1278 },
      { name: "New York", lat: 40.7128, lon: -74.006 },
      { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
      { name: "San Francisco", lat: 37.7749, lon: -122.4194 },
      { name: "Berlin", lat: 52.52, lon: 13.405 },
    ];

    const convertLatLonTo3D = (lat: number, lon: number) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lon + 180) * Math.PI) / 180;
      return {
        x: -Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    };

    const hubPoints = hubs.map((h) => ({
      ...h,
      pos: convertLatLonTo3D(h.lat, h.lon),
    }));

    // Generate connecting arcs between hubs
    const connections = [
      { from: 0, to: 1 }, // Bengaluru -> London
      { from: 1, to: 2 }, // London -> NY
      { from: 2, to: 4 }, // NY -> SF
      { from: 0, to: 3 }, // Bengaluru -> Tokyo
      { from: 1, to: 5 }, // London -> Berlin
    ];

    let arcProgress = 0;

    // Mouse Controls
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationY += deltaX * 0.005;
      rotationX += deltaY * 0.005;

      rotationX = Math.max(-1, Math.min(1, rotationX));
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const canvasEl = canvas;
    canvasEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 550;
      center.x = width / 2;
      center.y = height * 0.65;
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;

    const render = () => {
      if (!isDragging) {
        rotationY += 0.003; // Smooth continuous auto-rotation
      }

      arcProgress = (arcProgress + 0.008) % 1;

      ctx.clearRect(0, 0, width, height);

      // Atmospheric Halo Glow behind Globe
      const gradient = ctx.createRadialGradient(
        center.x,
        center.y,
        globeRadius * 0.4,
        center.x,
        center.y,
        globeRadius * 1.3
      );
      gradient.addColorStop(0, "rgba(184, 194, 207, 0.15)");
      gradient.addColorStop(0.5, "rgba(120, 140, 170, 0.08)");
      gradient.addColorStop(1, "rgba(6, 8, 11, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(center.x, center.y, globeRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Outer Wireframe Ring
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(center.x, center.y, globeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotate and Project 3D Points
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      const projectedPoints: { x: number; y: number; z: number }[] = [];

      points.forEach((p) => {
        // Y-axis rotation
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        // X-axis rotation
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        projectedPoints.push({
          x: center.x + x1 * globeRadius,
          y: center.y + y2 * globeRadius,
          z: z2,
        });
      });

      // Render Globe Grid Dots
      projectedPoints.forEach((pt) => {
        if (pt.z > -0.2) {
          const alpha = (pt.z + 0.2) / 1.2;
          const size = Math.max(1, (pt.z + 1) * 1.4);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.45})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Project Hub Cities & Render Connecting Arcs
      const projectedHubs = hubPoints.map((h) => {
        let x1 = h.pos.x * cosY - h.pos.z * sinY;
        let z1 = h.pos.x * sinY + h.pos.z * cosY;
        let y2 = h.pos.y * cosX - z1 * sinX;
        let z2 = h.pos.y * sinX + z1 * cosX;

        return {
          name: h.name,
          x: center.x + x1 * globeRadius,
          y: center.y + y2 * globeRadius,
          z: z2,
        };
      });

      // Draw Connection Arcs
      connections.forEach((conn) => {
        const p1 = projectedHubs[conn.from];
        const p2 = projectedHubs[conn.to];

        if (p1.z > -0.2 || p2.z > -0.2) {
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2 - 60; // Curve elevation

          // Arc line
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
          ctx.strokeStyle = "rgba(184, 194, 207, 0.35)";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Animated Traveling Pulse along Arc
          const t = arcProgress;
          const px = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * midX + t * t * p2.x;
          const py = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * midY + t * t * p2.y;

          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset blur
        }
      });

      // Draw Hub Pins & Labels
      projectedHubs.forEach((h) => {
        if (h.z > -0.1) {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(h.x, h.y, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.font = "11px sans-serif";
          ctx.fillText(h.name, h.x + 8, h.y + 4);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
