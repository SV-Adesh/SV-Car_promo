"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Snowflake, Users, Shield, Zap } from "lucide-react";

export function Car() {
  const features = [
    {
      icon: Snowflake,
      title: "Climate Control",
      description: "Advanced AC system for maximum comfort in all weather conditions",
    },
    {
      icon: Users,
      title: "Comfortable Seating",
      description: "Spacious and ergonomic seats perfect for long journeys",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Equipped with modern safety features for your peace of mind",
    },
    {
      icon: Zap,
      title: "City & Highway Ready",
      description: "Perfect for both city tours and long-distance highway travel",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Your Travel Companion
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Toyota Glanza - Premium comfort for every journey
          </p>
        </motion.div>

        {/* Car Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900">
            <Image
              src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80"
              alt="Toyota Glanza"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Toyota Glanza
              </h3>
              <p className="text-gray-300 text-lg">
                Your premium travel partner
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

