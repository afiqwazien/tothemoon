"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/ui/Header";
import cakeCatalog from "@/data/catalog.json";
import flavours from "@/data/flavours.json";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useCart } from "@/app/context/CartContext";



export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [selectedFlavour, setSelectedFlavour] = useState(flavours[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeFlavour, setActiveFlavour] = useState<string | null>(null);

  const handleFlavourClick = (flavourName: string) => {
    setSelectedFlavour(flavourName);
    setActiveFlavour((prev) => (prev === flavourName ? null : flavourName)); // toggle tooltip for mobile
  };


  // Find the product by slug
  let product = null;
  let category = null;

  for (const cat of cakeCatalog) {
    const foundCake = cat.cakes.find((cake) => cake.slug === slug);
    if (foundCake) {
      product = foundCake;
      category = cat;
      break;
    }
  }

  if (!product) {
    notFound();
  }
  const sizeKeys = Object.keys(product.sizes);
  const [selectedSize, setSelectedSize] = useState(sizeKeys[0]);

  // Mock additional product data (you can extend your JSON structure)
  const productDetails = {
    description: "A deliciously crafted cake made with the finest ingredients. Perfect for celebrations and special occasions. Our expert bakers ensure every cake is made fresh to order with attention to detail.",
    ingredients: ["Premium flour", "Fresh eggs", "Real butter", "Vanilla extract", "Fresh cream"],
    sizes: [
      { name: "Small", price: "RM 45", serves: "4-6 people" },
      { name: "Regular", price: product.price, serves: "8-10 people" },
      { name: "Large", price: "RM 85", serves: "12-15 people" }
    ],
    availability: "Available for order",
    deliveryTime: "2-3 business days"
  };

  const { addToCart } = useCart();

  const handleAddToCart = () => {
  addToCart({
    id: product.slug,
    name: product.name,
    image: product.image,
    size: selectedSize,
    flavour: selectedFlavour,
    quantity,
    price: Number(product.sizes[selectedSize as keyof typeof product.sizes]),
  });
};

  return (
    <div>
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-16 mt-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-slate-300 hover:text-pink-500 transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-500">/</span>

            <Link
              href="/catalog"
              className="text-slate-300 hover:text-pink-500 transition-colors"
            >
              Catalog
            </Link>
            <span className="text-slate-500">/</span>

            <Link
              href={`/catalog?category=${encodeURIComponent(category?.id || "")}`}
              className="text-slate-300 hover:text-pink-500 transition-colors"
            >
              {category?.title}
            </Link>
            <span className="text-slate-500">/</span>

            <span className="text-slate-500">{product.name}</span>
          </div>
        </nav>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image - Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            
            {/* Additional product images could go here */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    fill
                    className="object-cover opacity-60 hover:opacity-100 transition cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Information - Right Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Product Title and Category */}
            <div>
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4">
                {category?.title}
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-100 mb-4">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="text-2xl font-semibold text-pink-600">
              RM {product.sizes[selectedSize as keyof typeof product.sizes]}
            </div>


            {/* Description */}
            <div className="space-y-4">
              <p className="text-slate-100 leading-relaxed">
                {productDetails.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-200">Size</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(product.sizes).map(([sizeName, price]) => (
                  <button
                    key={sizeName}
                    onClick={() => setSelectedSize(sizeName)}
                    className={`p-3 rounded-lg border-2 text-center transition cursor-pointer ${
                      selectedSize === sizeName
                        ? "bg-pink-100 text-pink-700 shadow-md scale-105"
                        : "border-gray-600 text-slate-100 hover:border-pink-300"
                    }`}
                  >
                    <div className="font-medium">{sizeName.replace("_", " ")}</div>
                    <div className="text-sm font-semibold text-pink-600">RM {price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Flavour Selection */}
            <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-200">Flavour</h3>
            <TooltipProvider>
              <div className="flex flex-wrap gap-3">
                {flavours.map((flavour) => {
                  const isSelected = selectedFlavour === flavour.name;
                  const isActive = activeFlavour === flavour.name;

                  return (
                    <div key={flavour.name} className="relative">
                      <Tooltip open={isActive ? true : undefined}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => handleFlavourClick(flavour.name)}
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium transition cursor-pointer ${
                              isSelected
                                ? "bg-pink-100 text-pink-700 shadow-md scale-105"
                                : "bg-white text-slate-700 hover:bg-pink-100 hover:text-pink-600"
                            }`}
                          >
                            {flavour.name}
                          </button>
                        </TooltipTrigger>

                        <TooltipContent
                          className="max-w-xs bg-slate-800 text-slate-100 border border-slate-600 rounded-lg p-3 shadow-lg z-50"
                          side="top"
                        >
                          <div className="flex items-start gap-3">
                            {/* Swatch Preview */}
                            <div className="flex flex-col w-16 h-16 rounded overflow-hidden border border-slate-700">
                              {Array.from({ length: 5 }).map((_, i) => {
                                const [color1, color2] = flavour.colors;
                                return (
                                  <div
                                    key={i}
                                    className={`flex-1 ${i % 2 === 0 ? color1 : color2}`}
                                  />
                                );
                              })}
                            </div>

                            {/* Description */}
                            <p className="text-sm leading-relaxed">{flavour.description}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  );
                })}
              </div>
            </TooltipProvider>
          </div>


            {/* Quantity Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-100">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 text-slate-100 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer"
                >
                  -
                </button>
                <span className="text-xl font-medium px-4 text-slate-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 text-slate-100 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-pink-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:bg-pink-700 transition shadow-lg cursor-pointer"
            >
              Add to Cart
            </button>

            {/* Product Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 shadow">
                <h4 className="font-semibold text-pink-400 mb-1">Availability</h4>
                <p className="text-slate-200">{productDetails.availability}</p>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 border border-slate-600 shadow">
                <h4 className="font-semibold text-pink-400 mb-1">Delivery Time</h4>
                <p className="text-slate-200">{productDetails.deliveryTime}</p>
              </div>

              <div className="sm:col-span-2 bg-slate-800 rounded-lg p-4 border border-slate-600 shadow">
                <h4 className="font-semibold text-pink-400 mb-2">Key Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {productDetails.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-200 border border-slate-600"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {category && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-100 mb-8">More from {category.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {category.cakes
                .filter((cake) => cake.slug !== product.slug)
                .slice(0, 4)
                .map((cake) => (
                  <Link
                    key={cake.slug}
                    href={`/catalog/${cake.slug}`}
                    className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={cake.image}
                        alt={cake.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h4 className="font-semibold text-gray-800">{cake.name}</h4>
                      <p className="text-pink-600 font-medium">{cake.price}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}