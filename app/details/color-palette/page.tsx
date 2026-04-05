// File: app/details/color-palette/page.tsx

import Link from "next/link";
import Header from "@/components/ui/Header";

export default function ColorPalettePage() {
  return (
    <div className="min-h-screen">
      <Header variant="dark" />

      <main className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-[#312821] transition">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/details/color-palette" className="hover:text-[#312821] transition">Details</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-bold">Color Palette</span>
          </div>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Artisanal Palette
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Explore the sophisticated earth tones we use to craft our signature designs. Our palette is inspired by nature, featuring dark coffee accents and creamy foundations that bring timeless elegance to every cake.
            </p>
          </div>

          {/* Primary Colors Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Signature Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Dark Coffee */}
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                <div className="w-full h-32 bg-[#312821] rounded-lg shadow-inner"></div>
                <div>
                  <h3 className="font-bold text-gray-900">Dark Coffee</h3>
                  <p className="text-sm text-gray-600 uppercase tracking-widest font-mono">#312821</p>
                </div>
              </div>

              {/* Earth Cream */}
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                <div className="w-full h-32 bg-[#fefdf1] border border-slate-100 rounded-lg shadow-inner"></div>
                <div>
                  <h3 className="font-bold text-gray-900">Earth Cream</h3>
                  <p className="text-sm text-gray-600 uppercase tracking-widest font-mono">#fefdf1</p>
                </div>
              </div>

              {/* Earth Gradient */}
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                <div className="w-full h-32 bg-linear-to-r from-[#312821] to-[#604240] rounded-lg shadow-inner"></div>
                <div>
                  <h3 className="font-bold text-gray-900">Earth Gradient</h3>
                  <p className="text-sm text-gray-600 uppercase tracking-widest font-mono">Coffee to Mahogany</p>
                </div>
              </div>
            </div>
          </section>

          {/* Background Colors Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Supporting Tones</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
                <div className="w-full h-20 bg-slate-50 rounded-lg border border-slate-100"></div>
                <p className="text-sm font-bold text-[#312821]">Bone White</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
                <div className="w-full h-20 bg-[#D7CCC8] rounded-lg"></div>
                <p className="text-sm font-bold text-[#312821]">Sand</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
                <div className="w-full h-20 bg-[#A18E81] rounded-lg"></div>
                <p className="text-sm font-bold text-[#312821]">Taupe</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
                <div className="w-full h-20 bg-white border border-slate-200 rounded-lg"></div>
                <p className="text-sm font-bold text-[#312821]">Pure White</p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-linear-to-r from-[#312821] to-[#604240] rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Custom Palettes Available</h2>
            <p className="mb-6 text-white/90">Want a specific color scheme for your celebration? We can match any concept!</p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-[#312821] font-black px-8 py-3 rounded-xl hover:shadow-lg transition"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}