"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-slate-50/50 py-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-4 md:px-6">
        {/* Left side image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[900px] md:h-[900px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
        >
          <Image
            src="/cakes/Emelia&Firdaus.jpg"
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
          className="text-slate-700 space-y-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Our <em>Story</em>
            </h2>
            <p className="text-[16px] leading-relaxed text-slate-600 font-medium">
              What started as a small dream in 2019 has grown into something far beyond what we once imagined.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative border-l-2 border-[#312821]/20 pl-6 space-y-8 mt-6">

            {/* 2019 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-[#312821] ring-4 ring-slate-50"></span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2019 <span className="text-sm font-medium text-slate-500 ml-2">— The Beginning</span></h3>
              <p className="text-[15px] leading-relaxed text-slate-600">
                Back then, we were just a part-time home baker, balancing a passion for baking while working in the healthcare sector. Late nights, early mornings, and countless trials in the kitchen - all driven by one simple goal : to create something meaningful through every bite.
              </p>
            </div>

            {/* 2022 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-[#312821] ring-4 ring-slate-50"></span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2022 <span className="text-sm font-medium text-slate-500 ml-2">— A Bold Leap</span></h3>
              <p className="text-[15px] leading-relaxed text-slate-600">
                In 2022, we made a bold decision to turn passion into purpose. We stepped into business full-time and opened our very first shop in Bukit Payong - a milestone that marked the beginning of a new chapter.
              </p>
            </div>

            {/* Today */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-[#312821] ring-4 ring-slate-50"></span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Today <span className="text-sm font-medium text-slate-500 ml-2">— Crafting Experiences</span></h3>
              <p className="text-[15px] leading-relaxed text-slate-600">
                Our journey began with a single product - our signature Brownies Truffles. Today, we've evolved into a brand that specializes in custom cakes, especially wedding cakes. With a growing team of five dedicated individuals, we continue to push boundaries, refine our craft, and deliver not just cakes, but experiences that last a lifetime.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mt-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
            <p className="text-[15px] italic text-slate-700 leading-relaxed relative z-10">
              "This is more than just a business. It's a journey built on passion, courage, and belief that small beginnings can lead to extraordinary things."
            </p>
            <p className="font-bold text-slate-900 mt-4 relative z-10">— Love, Tastie Pastry.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
