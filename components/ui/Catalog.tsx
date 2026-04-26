"use client";

import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import Header from "@/components/ui/Header";
import { Suspense, useState } from "react";
import { useCatalog } from "@/app/context/CatalogContext";
import { FullPageSkeleton } from "@/components/ui/LoadingSkeletons";

export default function Catalog({ onPriceChange }: { onPriceChange?: (price: number) => void }) {
  const params = useParams();
  const router = useRouter();

  const mainCategory = (params?.mainCategory as string) || "";
  const categoryId = (params?.categoryId as string) || "";
  const [maxPrice, setMaxPrice] = useState(3000);
  const { catalog: cakeCatalog, loading } = useCatalog();

  if (loading) {
    return (
      <div>
        <Header />
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-16 mt-4">
          <FullPageSkeleton />
        </main>
      </div>
    );
  }

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
      const priceMatch = cake.price.match(/[\d.]+/);
      const priceValue = priceMatch ? parseFloat(priceMatch[0]) : 0;
      
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
      <Header variant="dark" />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16 mt-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl font-extrabold text-[#312821] tracking-tight">
            {selectedCategory ? (
              <span className="text-[#312821] italic underline decoration-[#312821] underline-offset-8">{selectedCategory.title}</span>
            ) : (
              <>Our <span className="text-[#312821] italic underline decoration-[#312821] underline-offset-8">Catalog</span></>
            )}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-1/5 space-y-6">
            {/* Categories */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-black mb-4 text-[#312821] tracking-wide uppercase">
                {maintitle}
              </h2>
              <ul className="flex flex-col gap-2">
                {sidebarCategories.map((category) => (
                  <li key={category.id}>
                    <a
                      href={`/catalog/${mainCategory}/${category.id}`}
                      className={`block px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                        categoryId === category.id
                          ? "bg-[#312821] text-white font-bold shadow-lg transform scale-[1.02]"
                          : "text-slate-600 hover:bg-slate-100 hover:text-[#312821] hover:pl-5"
                      }`}
                    >
                      {category.title || toTitle(category.slug)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Slider */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-black mb-4 text-[#312821] tracking-wide uppercase">
                Price Range
              </h2>
              <input
                type="range"
                min={0}
                max={3000}
                value={maxPrice}
                onChange={(e) => handleChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#312821]"
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">RM 0</span>
                <span className="text-sm font-black text-[#312821]">RM {maxPrice}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">RM 3k</span>
              </div>
            </div>
          </aside>

          {/* Products */}
            <section className="md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleCakes.length === 0 ? (
                <p className="col-span-full text-center text-slate-400 mt-20">
                  No products found under RM {maxPrice}.
                </p>
              ) : (
                visibleCakes.map((cake) => (
                  <ProductCard
                    key={cake.slug}
                    slug={cake.slug}
                    name={cake.name}
                    price={cake.price}
                    image={cake.images?.[0] || cake.image || ''}
                  />
                ))
              )}
            </section>
        </div>
      </main>
    </div>
  );
}
