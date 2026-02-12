"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SplineScene } from "@/components/ui/splite";
import { motion } from "framer-motion";

// Stable scene URL - never changes, preventing Spline remounts.
const SPLINE_SCENE_URL = "https://prod.spline.design/6Wq1Q7YGyM-iab9p/scene.splinecode";

export function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Spotlight className="p-6">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-white">
                    Premium Car Booking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg">
                    Experience luxury and comfort with our premium car booking service.
                    Perfect for tourists, families, and business travelers.
                  </p>
                </CardContent>
              </Card>
            </Spotlight>
          </motion.div>

          {/* Right side - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[500px] lg:h-[600px] rounded-lg overflow-hidden"
          >
            <SplineScene
              scene={SPLINE_SCENE_URL}
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

