"use client";

import { motion } from "framer-motion";
import * as React from "react";
import { SplineScene } from "@/components/ui/splite";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

// Stable scene URL - never changes, preventing Spline remounts.
const SPLINE_SCENE_URL = "https://prod.spline.design/6Wq1Q7YGyM-iab9p/scene.splinecode";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
      
      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Premium Car Booking for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Comfortable Journeys
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl"
            >
              Experience the ultimate comfort and safety with our premium{" "}
              <span className="font-semibold text-white">Toyota Glanza</span>. 
              Perfect for city tours, highway travel, and family trips. 
              Your trusted travel partner for memorable journeys.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-lg backdrop-blur-sm"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>Premium Service</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[500px] lg:h-[700px] rounded-lg overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl -z-10" />
            <SplineScene
              scene={SPLINE_SCENE_URL}
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

