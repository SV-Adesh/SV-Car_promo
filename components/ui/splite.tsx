"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

let splineInitialized = false;
let splineFatal = false;

export interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * SplineScene (re-architected)
 *
 * - Does NOT render <Spline /> from @splinetool/react-spline at all.
 * - Uses @splinetool/runtime imperatively on a canvas after browser idle.
 * - React never re-initializes WASM; no retries, no remounts.
 * - If WASM fails once, permanently shows a static fallback image.
 */
export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [fatal, setFatal] = React.useState<boolean>(() => splineFatal);

  // One-shot idle-time initialization of Spline WASM via @splinetool/runtime.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (splineInitialized || splineFatal) return;
    if (!containerRef.current) return;

    let cancelled = false;

    const schedule = (cb: () => void) => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(cb);
      } else {
        setTimeout(cb, 0);
      }
    };

    const init = async () => {
      try {
        if (cancelled) return;
        const host = containerRef.current;
        if (!host) return;

        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        host.innerHTML = "";
        host.appendChild(canvas);

        const { Application } = await import("@splinetool/runtime");
        const app = new Application(canvas as HTMLCanvasElement);

        await app.load(scene);
        if (cancelled) {
          app.dispose?.();
          return;
        }

        splineInitialized = true;
      } catch {
        splineFatal = true;
        setFatal(true);
      }
    };

    schedule(init);

    return () => {
      cancelled = true;
      // Do NOT dispose globally here to avoid implicit retries.
    };
  }, [scene]);

  // Global fatal trap: once the known WASM error occurs, never retry.
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleError = (ev: ErrorEvent) => {
      const msg = String(ev.message || "");
      if (msg.includes("Data read, but end of buffer not reached")) {
        splineFatal = true;
        setFatal(true);
      }
    };

    const handleRejection = (ev: PromiseRejectionEvent) => {
      const msg = String(ev.reason?.message || ev.reason || "");
      if (msg.includes("Data read, but end of buffer not reached")) {
        splineFatal = true;
        setFatal(true);
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  if (fatal) {
    return (
      <div className={cn("relative w-full h-full min-h-[400px]", className)}>
        <Image
          src="/spline-fallback.svg"
          alt="3D experience unavailable"
          fill
          priority
          className="object-cover"
        />
      </div>
    );
  }

  // SSR + hydration-safe placeholder. WASM only attaches after idle effect.
  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full min-h-[400px] rounded-lg border border-white/10 bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden",
        className,
      )}
    />
  );
}

