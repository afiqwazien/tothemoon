"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/ui/Header";
import flavours from "@/data/flavours.json";
import { useCatalog } from "@/app/context/CatalogContext";
import { FullPageSkeleton } from "@/components/ui/LoadingSkeletons";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useCart } from "@/app/context/CartContext";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";




export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [selectedFlavour, setSelectedFlavour] = useState(flavours[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeFlavour, setActiveFlavour] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { catalog: cakeCatalog, loading } = useCatalog();
  const { addToCart } = useCart();

  const handleFlavourClick = (flavourName: string) => {
    setSelectedFlavour(flavourName);
    setActiveFlavour((prev) => (prev === flavourName ? null : flavourName)); // toggle tooltip for mobile
  };

  if (loading) {
    return (
      <div>
        <Header variant="dark" />
        <main className="max-w-7xl mx-auto px-6 py-16 mt-4">
          <FullPageSkeleton />
        </main>
      </div>
    );
  }

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

  // Handle Firebase array->object conversion or standard arrays
  let parsedSizes: any[] = [];
  if (Array.isArray(product.sizes)) {
    parsedSizes = product.sizes;
  } else if (product.sizes && typeof product.sizes === 'object') {
    const vals = Object.values(product.sizes);
    if (vals.length > 0 && typeof vals[0] === 'object' && vals[0] !== null) {
      // Firebase parsed it as { "0": {...}, "1": {...} }
      parsedSizes = vals as any[];
    } else {
      // Old structure { "5_Tall": 230 }
      parsedSizes = Object.entries(product.sizes).map(([key, val]) => ({
        name: key.replace(/_/g, " "),
        price: Number(val)
      }));
    }
  }

  // Normalize final format to {name, price}
  const normalizedSizes = parsedSizes.map((s: any) => {
    // If it's the old mapped one, it already has name and price
    if (s.name !== undefined && s.price !== undefined && !s.variant) return s;

    return {
      name: s.variant ? `${s.height ? s.height + '" ' : ''}${s.variant}` : s.name || 'Standard',
      price: Number(s.price || 0)
    };
  });

  const activeSizeIndex = selectedSize ? parseInt(selectedSize) : 0;
  const activeSizeObj = normalizedSizes[activeSizeIndex] || normalizedSizes[0];

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

  const handleAddToCart = () => {
    addToCart({
      id: product.slug,
      name: product.name,
      slug: product.slug,
      image: product.images?.[0] || product.image || '',
      size: activeSizeObj?.name || 'Standard',
      flavour: selectedFlavour,
      quantity,
      price: activeSizeObj?.price || 0,
    });

    // Show success toast
    toast.success("Added to cart!", {
      description: "Item successfully added to your shopping cart 🛍️",
      icon: <ShoppingCart className="w-5 h-5" />,
      duration: 3000,
    })
  };

  return (
    <div>
      <Header variant="dark" />

      <main className="max-w-7xl mx-auto px-6 py-16 mt-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-slate-400 hover:text-[#312821] transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-400">/</span>

            <Link
              href={`/catalog/${category?.mainCategory || 'wedding-cakes'}/${category?.id || ''}`}
              className="text-slate-400 hover:text-[#312821] transition-colors"
            >
              {category?.title}
            </Link>
            <span className="text-slate-400">/</span>

            <span className="text-slate-500 font-medium">{product.name}</span>
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
                src={mainImage || product.images?.[0] || product.image || ''}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Additional product images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((imgUrl, i) => (
                  <div key={i} className="relative w-full h-24 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={imgUrl}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      onClick={() => setMainImage(imgUrl)}
                      className={`object-cover transition cursor-pointer ${(mainImage || product.images?.[0]) === imgUrl
                          ? "opacity-100 ring-2 ring-[#312821]"
                          : "opacity-60 hover:opacity-100"
                        }`}
                    />
                  </div>
                ))}
              </div>
            )}
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
              <span className="inline-block px-3 py-1 bg-slate-100 text-[#312821] rounded-full text-sm font-bold mb-4">
                {category?.title}
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="text-2xl font-black text-[#312821]">
              RM {activeSizeObj?.price}
            </div>


            {/* Description */}
            <div className="space-y-4">
              <p className="text-slate-700 leading-relaxed text-lg">
                {productDetails.description}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Size</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {normalizedSizes.map((sizeObj, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(index.toString())}
                    className={`p-3 rounded-xl border-2 text-center transition cursor-pointer group ${activeSizeIndex === index
                        ? "bg-[#312821] text-white shadow-md scale-105 border-[#312821]"
                        : "border-slate-100 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                  >
                    <div className="font-bold text-lg">{sizeObj.name}</div>
                    <div className={`text-sm font-black ${activeSizeIndex === index ? 'text-white/90' : 'text-[#312821]'}`}>
                      RM {sizeObj.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Flavour Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Flavour</h3>
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
                              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold transition cursor-pointer ${isSelected
                                  ? "bg-[#312821] text-white shadow-lg scale-105"
                                  : "bg-white text-slate-700 border border-slate-100 hover:border-[#312821] hover:text-[#312821] shadow-sm"
                                }`}
                            >
                              {flavour.name}
                            </button>
                          </TooltipTrigger>

                          <TooltipContent
                            className="max-w-xs bg-[#fefdf1] text-[#312821] border border-slate-200 rounded-xl p-4 shadow-2xl z-50"
                            side="top"
                            sideOffset={10}
                          >
                            <div className="flex items-start gap-3">
                              {/* Swatch Preview */}
                              <div className="flex flex-col w-16 h-16 rounded overflow-hidden border border-slate-200">
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
                              <p className="text-sm font-semibold leading-relaxed tracking-tight text-[#312821]">
                                {flavour.description}
                              </p>
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
              <h3 className="text-lg font-bold text-slate-900">Quantity</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition cursor-pointer font-bold text-xl shadow-sm"
                >
                  -
                </button>
                <span className="text-2xl font-bold px-4 text-slate-900 min-w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition cursor-pointer font-bold text-xl shadow-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#312821] text-white py-3 px-6 rounded-xl font-bold text-lg hover:bg-black transition shadow-lg cursor-pointer"
            >
              Add to Cart
            </button>

            {/* Product Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h4 className="font-bold text-[#312821] mb-1">Availability</h4>
                <p className="text-slate-600 font-medium">{productDetails.availability}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h4 className="font-bold text-[#312821] mb-1">Delivery Time</h4>
                <p className="text-slate-600 font-medium">{productDetails.deliveryTime}</p>
              </div>

              <div className="sm:col-span-2 bg-slate-50 rounded-2xl p-5 border border-slate-100 shadow-sm">
                <h4 className="font-bold text-[#312821] mb-3">Key Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {productDetails.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-white rounded-full text-sm text-[#312821] border border-slate-100 font-semibold shadow-sm"
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
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-10">More from {category.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {category.cakes
                .filter((cake) => cake.slug !== product.slug)
                .slice(0, 4)
                .map((cake) => (
                  <Link
                    key={cake.slug}
                    href={`/product/${cake.slug}`}
                    className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={cake.images?.[0] || cake.image || ''}
                        alt={cake.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h4 className="font-bold text-slate-900">{cake.name}</h4>
                      <p className="text-[#312821] font-black">{cake.price}</p>
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