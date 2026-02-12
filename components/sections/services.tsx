"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, MapPin, Route, Clock } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Plane,
      title: "Airport Pickup & Drop",
      description: "Reliable and timely airport transfers. We ensure you reach your flight on time or welcome you with comfort after a long journey.",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: MapPin,
      title: "Tourist Packages",
      description: "Customized tour packages for popular destinations. Explore the city and nearby attractions with our guided travel services.",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: Route,
      title: "Local & Outstation Travel",
      description: "Whether it's a short city ride or a long-distance journey, we provide comfortable and safe travel solutions for all your needs.",
      color: "from-orange-600 to-red-600",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock service availability. Book anytime, anywhere. We're always ready to serve you, day or night.",
      color: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive travel solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all hover:shadow-2xl h-full group">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

