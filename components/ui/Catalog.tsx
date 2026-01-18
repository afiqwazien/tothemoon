"use client";

import { useParams, useRouter } from "next/navigation";
import cakeCatalog from "@/data/catalog.json";
import ProductCard from "@/components/ui/ProductCard";
import Header from "@/components/ui/Header";
import { Suspense, useState } from "react";

export default function Catalog({ onPriceChange }: { onPriceChange?: (price: number) => void }) {
  const params = useParams();
  const router = useRouter();

  const mainCategory = (params?.mainCategory as string) || "";
  const categoryId = (params?.categoryId as string) || "";
  const [maxPrice, setMaxPrice] = useState(3000);
  // const maxPrice = Number(searchParams.get("maxPrice")) || 1000;

  // Find the selected category
  const selectedCategory = cakeCatalog.find(
    (cat) => cat.mainCategory === mainCategory && cat.id === categoryId
  );

  // Get categories for sidebar (same main category)
  const sidebarCategories = cakeCatalog.filter(
    (cat) => cat.mainCategory === mainCategory
  );

  // Filter to show selected category or all in main category
  const filteredCategory = selectedCategory ? [selectedCategory] : sidebarCategories;

  // Filter by price (apply to each cake)
  const visibleCakes = filteredCategory.flatMap((category) =>
    category.cakes.filter((cake) => {
      // Extract first numeric value from price string (e.g. "RM3.50 – RM3.80" → 3.50)
      const priceMatch = cake.price.match(/[\d.]+/);
      const priceValue = priceMatch ? parseFloat(priceMatch[0]) : 0;
      
      console.log(`${cake.name}: price string="${cake.price}", extracted=${priceValue}`); // Debug log
      
      return priceValue <= maxPrice;
    })
  );

  const handleChange = (value: number) => {
    setMaxPrice(value);
    if (onPriceChange) onPriceChange(value); // notify parent if needed
  };


  const toTitle = (slug: string) =>
    slug
      .replace(/-/g, " ")        // replace dashes with spaces
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const maintitle = toTitle(mainCategory);

  return (
      <div>
      <Header/>
      <main className="max-w-7xl mx-auto px-6 py-16 mt-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl font-extrabold text-white tracking-tight">
            {selectedCategory ? (
              <span className="text-pink-400 italic">{selectedCategory.title}</span>
            ) : (
              <>Our <span className="text-pink-400 italic">Catalog</span></>
            )}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-1/5 space-y-6">
            {/* Categories */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow-xl">
              <h2 className="text-sm font-bold mb-4 text-white/90 tracking-wide uppercase">
                {maintitle}
              </h2>
              <ul className="flex flex-col gap-2">
                {sidebarCategories.map((category) => (
                  <li key={category.id}>
                    <a
                      href={`/catalog/${mainCategory}/${category.id}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        categoryId === category.id
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md"
                          : "text-white/80 hover:bg-white/10 hover:text-white hover:pl-4"
                      }`}
                    >
                      {category.slug}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Slider */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow-xl">
              <h2 className="text-sm font-bold mb-4 text-white/90 tracking-wide uppercase">
                Price Range
              </h2>
              <input
                type="range"
                min={0}
                max={3000}
                value={maxPrice}
                onChange={(e) => handleChange(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-white/70">RM 0</span>
                <span className="text-sm font-bold text-white">RM {maxPrice}</span>
                <span className="text-xs text-white/70">RM 3000</span>
              </div>
            </div>
          </aside>

          {/* Products */}
            <section className="md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleCakes.length === 0 ? (
                <p className="col-span-full text-center text-gray-500 mt-20">
                  No products found under RM {maxPrice}.
                </p>
              ) : (
                visibleCakes.map((cake) => (
                  <ProductCard
                    key={cake.slug}
                    slug={cake.slug}
                    name={cake.name}
                    price={cake.price}
                    image={cake.image}
                  />
                ))
              )}
            </section>
        </div>
      </main>
    </div>
  );
}
