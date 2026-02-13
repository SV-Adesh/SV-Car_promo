"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, User } from "lucide-react";

export function Contact() {
  const contacts = [
    {
      name: "Satyaprasad",
      phone: "+91 7019675494",
      email: "abhisatyashetty420@gmail.com",
      icon: User,
    },
    {
      name: "Sushant",
      phone: "+91 8073637606",
      email: "sushant@gmail.com",
      icon: User,
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
            Get In Touch
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Contact us for bookings, inquiries, or any assistance you need
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all h-full">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">{contact.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="h-5 w-5 text-blue-400" />
                    <a 
                      href={`tel:${contact.phone.replace(/\s/g, '')}`}
                      className="hover:text-white transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <a 
                      href={`mailto:${contact.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-2xl">Office Address</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg">
                123 Travel Street,<br />
                Tourist District,<br />
                City - 123456,<br />
                State, Country
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

