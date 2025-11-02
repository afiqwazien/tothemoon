"use client"
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselIndicators } from "@/components/ui/carousel";
import React from "react";
import AboutSection from "@/components/ui/AboutSection";
import ContactSection from "@/components/ui/ContactSection";
import catalog from "@/data/catalog.json";
import { motion } from "framer-motion";
import Header from "@/components/ui/Header";
import { FaArrowRight } from "react-icons/fa";

const backgroundSlides = [
  { src: "/bg-image1.jpg", alt: "Designer Wedding Cake" },
  { src: "/bg-image2.jpg", alt: "Engagement Cake" },
  { src: "/bg-image2.jpg", alt: "Birthday Cake" },
];

export default function HomePage() {
  return (
    <div className="">
      {/* Slider with Nav */}
      <section className="relative h-screen w-full">
        <Carousel className="h-full w-full" opts={{ loop: true }}>
          <CarouselContent>
            {backgroundSlides.map((slide, i) => (
              <CarouselItem key={i}>
                <div className="relative h-screen w-full">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    className="object-cover"
                  />
                  {/* Dark overlay, doesn't block arrows */}
                  <div className="pointer-events-none absolute inset-0 bg-black/40 z-10" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows as direct children of Carousel */}
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full cursor-pointer" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full cursor-pointer" />
          <CarouselIndicators />
        </Carousel>

        <Header/>

        {/* Centered CTA overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-100 z-10 space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold">Designer Cakes</h2>
          <p className="text-xl md:text-2xl">Crafted with Love by TastiePastry</p>
          <a
            href="#products"
            className="px-6 py-3 bg-slate-800 text-slate-100 font-semibold rounded-xl shadow hover:bg-opacity-90"
          >
            View Our Products
          </a>
        </div>
      </section>

      <AboutSection />

      {/* Catalog Sections */}
      <section id="products" className="space-y-16 p-8 w-full mx-auto max-w-7xl">

        {catalog.map((category) => (
          <motion.div key={category.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg"
          >
          <div key={category.id}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-100">{category.title}</h3>
              <a
                href={`/catalog?category=${category.id}`}
                className="text-slate-100 hover:underline font-medium"
              >
                {/* Show text on tablet/desktop */}
                <span className="hidden sm:inline">View More →</span>

                {/* Show arrow only on mobile */}
                <FaArrowRight className="w-4 h-4 sm:hidden" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {category.cakes.filter((item, index) => index < 3).map((cake) => (
                <a
                  key={cake.slug}
                  href={`/catalog/${cake.slug}`}
                  className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <div className="relative w-full h-50 md:h-60">
                    <Image
                      src={cake.image}
                      alt={cake.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* <div className="p-4 bg-white">
                    <h4 className="font-semibold text-lg text-gray-800">{cake.name}</h4>
                    <p className="text-pink-600 font-medium">{cake.price}</p>
                  </div> */}

                  <div className="relative p-5 flex flex-col gap-3 bg-white">
                    <h3
                      className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-pink-600
                      transition-colors duration-300 line-clamp-2 leading-snug"
                    >
                      {cake.name}
                    </h3>
                    
                    {/* Price with subtle background */}
                    <div className="flex items-center justify-between">
                      <span className="text-md font-bold text-pink-600">
                        {cake.price}
                      </span>
                      {/* <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                      </div> */}
                    </div>
                  </div>

                  
                </a>
              ))}
            </div>
          </div>
          </motion.div>
        ))}
      </section>

      <ContactSection />
    </div>
  );
}

