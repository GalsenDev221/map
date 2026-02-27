import { useEffect, useRef } from "react";

interface InteractiveGridProps {
  gridSize?: number;
  strokeWidth?: number;
  opacity?: number;
  animationSpeed?: number;
  className?: string;
}

export default function InteractiveGrid({
  gridSize = 60,
  strokeWidth = 1,
  opacity = 0.12,
  animationSpeed = 600,
  className = "",
}: InteractiveGridProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Find nearest grid intersection
      const col = Math.round(x / gridSize);
      const row = Math.round(y / gridSize);
      const cx = col * gridSize;
      const cy = row * gridSize;

      // Create ripple circle
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", String(cx));
      circle.setAttribute("cy", String(cy));
      circle.setAttribute("r", "0");
      circle.setAttribute("fill", "none");
      circle.setAttribute("stroke", "currentColor");
      circle.setAttribute("stroke-width", String(strokeWidth + 0.5));
      circle.setAttribute("opacity", "0.6");
      svg.appendChild(circle);

      circle.animate(
        [
          { r: "0", opacity: "0.6" },
          { r: String(gridSize * 0.8), opacity: "0" },
        ],
        { duration: animationSpeed, easing: "ease-out", fill: "forwards" }
      ).onfinish = () => circle.remove();
    };

    const parent = svg.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      return () => parent.removeEventListener("mousemove", handleMouseMove);
    }
  }, [gridSize, strokeWidth, animationSpeed]);

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0, opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width={gridSize}
          height={gridSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}
