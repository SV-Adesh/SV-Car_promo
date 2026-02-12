"use client";

import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Heart, Award } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Shield,
      title: "Trustworthy",
      description: "Your reliable travel partner with years of experience",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We prioritize your comfort and satisfaction above all",
    },
    {
      icon: Award,
      title: "Premium Service",
      description: "Excellence in every journey, every time",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About Yatra Tours & Travels
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your trusted travel partner for memorable journeys
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <Spotlight className="p-8">
            <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-white text-center">
                  Yatra Tours & Travels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed text-center">
                  We are a premium travel company dedicated to providing exceptional 
                  car booking services for tourists, families, and business travelers. 
                  With our fleet of well-maintained Toyota Glanza vehicles, we ensure 
                  every journey is comfortable, safe, and memorable.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed text-center">
                  Our commitment to excellence and customer satisfaction has made us 
                  a trusted name in the travel industry. Whether you need airport transfers, 
                  city tours, or outstation travel, we're here to make your journey seamless.
                </p>
              </CardContent>
            </Card>
          </Spotlight>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all text-center">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

