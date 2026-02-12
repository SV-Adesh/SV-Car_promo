"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import { cn } from "@/lib/utils";

// CRITICAL: Global singleton to track initialized Spline instances.
// This prevents React Strict Mode double-mount from corrupting WASM buffers.
// Key: scene URL, Value: true if initialized
const initializedScenes = new Set<string>();

// Dynamic import with ssr:false ensures NO WebGL/WASM runs during SSR.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineLoader />,
});

export interface SplineSceneProps {
  scene: string;
  className?: string;
}

function SplineLoader() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[400px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="text-white/60 text-sm">Loading 3D scene...</p>
      </div>
    </div>
  );
}

function SplineErrorFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[400px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center gap-4 text-center px-4">
        <p className="text-red-400 text-sm font-semibold">3D Scene Error</p>
        <p className="text-gray-400 text-xs">
          Unable to load 3D scene. Please refresh the page.
        </p>
      </div>
    </div>
  );
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  // Hard client-only check: ensure we're in browser, not SSR.
  const [isClient, setIsClient] = React.useState(false);
  
  // Track if Spline should be rendered for this instance.
  const [shouldRender, setShouldRender] = React.useState(false);
  
  // Error state for error boundary pattern.
  const [error, setError] = React.useState<Error | null>(null);
  
  // Ref to track if this component instance has attempted initialization.
  const initAttemptedRef = React.useRef(false);

  // Step 1: Ensure we're client-side only.
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  // Step 2: Mount guard - ensure we only mount Spline once per scene URL.
  // This prevents React Strict Mode double-mount from corrupting WASM buffers.
  React.useEffect(() => {
    if (!isClient) return;
    
    // Prevent multiple initialization attempts for the same scene.
    if (initAttemptedRef.current) return;
    
    // If this scene is already initialized globally, skip.
    if (initializedScenes.has(scene)) {
      setShouldRender(true);
      return;
    }

    // Mark that this instance has attempted initialization.
    initAttemptedRef.current = true;

    // Defer actual mount by 2 frames to ensure:
    // 1. React hydration is complete
    // 2. DOM is stable
    // 3. WebGL context can be created safely
    // 4. React Strict Mode double-mount cycle has completed
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        // Mark scene as initialized BEFORE rendering Spline.
        // This prevents other instances from initializing the same scene.
        initializedScenes.add(scene);
        setShouldRender(true);
      });
      
      return () => cancelAnimationFrame(raf2);
    });

    return () => {
      cancelAnimationFrame(raf1);
      // DO NOT remove from initializedScenes on unmount.
      // This prevents re-initialization if component remounts due to Strict Mode.
    };
  }, [isClient, scene]);

  // Step 3: Reset initialization attempt if scene URL changes.
  React.useEffect(() => {
    return () => {
      // Reset attempt flag when scene changes, but keep initializedScenes entry.
      initAttemptedRef.current = false;
      setShouldRender(false);
    };
  }, [scene]);

  // Error boundary handler for WASM/WebGL errors.
  React.useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      if (
        event.message.includes("buffer") ||
        event.message.includes("WASM") ||
        event.message.includes("Data read")
      ) {
        console.error("Spline WASM error detected:", event.message);
        setError(new Error(event.message));
        // Clear initialization state to allow retry on next mount.
        initializedScenes.delete(scene);
      }
    };

    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      if (
        event.reason?.message?.includes("buffer") ||
        event.reason?.message?.includes("WASM") ||
        event.reason?.message?.includes("Data read")
      ) {
        console.error("Spline WASM promise rejection:", event.reason);
        setError(new Error(event.reason?.message || "Spline initialization failed"));
        initializedScenes.delete(scene);
      }
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", unhandledRejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", unhandledRejectionHandler);
    };
  }, [scene]);

  // If error occurred, show fallback.
  if (error) {
    return (
      <div className={cn("w-full h-full", className)}>
        <SplineErrorFallback />
      </div>
    );
  }

  // If not client-side, show loader (will be replaced after hydration).
  if (!isClient) {
    return (
      <div className={cn("w-full h-full", className)}>
        <SplineLoader />
      </div>
    );
  }

  // If not ready to render, show loader.
  if (!shouldRender) {
    return (
      <div className={cn("w-full h-full", className)}>
        <SplineLoader />
      </div>
    );
  }

  // CRITICAL: Use a STABLE key that never changes once mounted.
  // This prevents React from remounting the Spline component.
  // The key is based on scene URL only, ensuring same scene = same key.
  const stableKey = `spline-scene-${scene}`;

  return (
    <div className={cn("w-full h-full", className)}>
      <Spline key={stableKey} scene={scene} />
    </div>
  );
}
