"use client";

import { useSearchParams, useRouter } from "next/navigation";
import cakeCatalog from "../../app/data/catalog.json";
import ProductCard from "@/components/ui/ProductCard";
import Header from "@/components/ui/Header";
import { Suspense, useState } from "react";

export default function Catalog({ onPriceChange }: { onPriceChange?: (price: number) => void }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedSlug = searchParams.get("category") || "All";
  const selectedId = searchParams.get("category") || "All";
  const [maxPrice, setMaxPrice] = useState(3000);
  // const maxPrice = Number(searchParams.get("maxPrice")) || 1000;

  // Filter products
  const filteredCategory = cakeCatalog.filter((x) => {
    const idMatch = selectedId === "All" || x.id === selectedSlug;
    return idMatch;
  });

  // Filter by price (apply to each cake)
  const visibleCakes = filteredCategory.flatMap((category) =>
    category.cakes.filter((cake) => {
      // Extract numeric value from price string (e.g. "RM 120" → 120)
      const priceValue = Number(cake.price.replace(/[^\d.]/g, ""));
      return priceValue <= maxPrice;
    })
  );

  const updateCategory = (slug: string, id: string = "") => {
    const params = new URLSearchParams(searchParams);
    if (slug === "All") {
      params.delete("category");
    } else {
      params.set("category", id);
    }
    router.push(`/catalog?${params.toString()}`);
  };


  const handleChange = (value: number) => {
    setMaxPrice(value);
    if (onPriceChange) onPriceChange(value); // notify parent if needed
  };

  return (
      <div>
      <Header/>
      <main className="max-w-7xl mx-auto px-6 py-16 mt-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl font-extrabold text-white tracking-tight">
            Our <span className="text-pink-400 italic">Wedding Cakes</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="md:w-1/4 bg-pink-50 rounded-3xl p-6 shadow-lg h-fit space-y-8">
            {/* Categories */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-slate-600">Categories</h2>
              <ul className="flex flex-col gap-3">
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-xl transition ${
                      selectedId === "All"
                        ? "bg-pink-200 font-semibold shadow-inner"
                        : "hover:bg-pink-100"
                    }`}
                    onClick={() => updateCategory("All")}
                  >
                    All
                  </button>
                </li>
                {cakeCatalog.map((category) => (
                  <li key={category.id}>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-xl transition cursor-pointer ${
                        selectedId === category.id
                          ? "bg-pink-200 font-semibold shadow-inner"
                          : "hover:bg-pink-100"
                      }`}
                      onClick={() => updateCategory(category.slug, category.id)}
                    >
                      {category.slug}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Slider */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-slate-600">Max Price</h2>
              <input
                type="range"
                min={0}
                max={3000}
                value={maxPrice}
                onChange={(e) => handleChange(Number(e.target.value))}
                className="w-full"
              />
              <p className="mt-2 text-gray-700 font-medium">RM {maxPrice}</p>
            </div>
          </aside>

          {/* Products */}
            <section className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
