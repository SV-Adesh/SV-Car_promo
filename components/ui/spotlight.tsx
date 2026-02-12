"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type SpotlightProps = {
  className?: string;
  size?: number;
  spotlightColor?: string;
  fill?: boolean;
  children?: React.ReactNode;
};

export function Spotlight({
  className,
  size = 200,
  spotlightColor = "white",
  fill = false,
  children,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovered(true));
      container.addEventListener("mouseleave", () => setIsHovered(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovered(true));
        container.removeEventListener("mouseleave", () => setIsHovered(false));
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg",
        className
      )}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${size}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}15, transparent 40%)`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      />
    </div>
  );
}

