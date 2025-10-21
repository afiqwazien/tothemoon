"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-slate-300 py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        {/* Left side image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/default-image2.jpg"
            alt="Baking at TastiePastry"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Right side text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-slate-700"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Our Story
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            <span className="font-semibold text-pink-600 mr-1">TastiePastry</span>  
            is built on one belief. That every moment worth remembering deserves a cake that's just as meaningful - and
            beautifully designed.
          </p>
          <p className="text-lg leading-relaxed">
            From rustic ruffles to elegant wedding cakes, we believe in crafting 
            desserts that not only taste amazing, but also tell a story. 
            Because for us, it’s never just about the cake — it’s about the moment.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
