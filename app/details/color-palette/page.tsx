// File: app/details/color-palette/page.tsx

import Link from "next/link";
import Header from "@/components/ui/Header";

export default function ColorPalettePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Header />
      
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-pink-600 transition">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/details/color-palette" className="hover:text-pink-600 transition">Details</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Color Palette</span>
          </div>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Color Palette
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Explore the beautiful colors we use to create your dream cakes. Our signature pink and purple tones bring elegance and joy to every celebration.
            </p>
          </div>

          {/* Primary Colors Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Primary Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Pink */}
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                <div className="w-full h-32 bg-pink-500 rounded-lg"></div>
                <div>
                  <h3 className="font-bold text-gray-900">Pink</h3>
                  <p className="text-sm text-gray-600">#EC4899</p>
                </div>
              </div>

              {/* Purple */}
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                <div className="w-full h-32 bg-purple-500 rounded-lg"></div>
                <div>
                  <h3 className="font-bold text-gray-900">Purple</h3>
                  <p className="text-sm text-gray-600">#A855F7</p>
                </div>
              </div>

              {/* Gradient */}
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                <div className="w-full h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg"></div>
                <div>
                  <h3 className="font-bold text-gray-900">Gradient</h3>
                  <p className="text-sm text-gray-600">Pink to Purple</p>
                </div>
              </div>
            </div>
          </section>

          {/* Background Colors Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Background Shades</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
                <div className="w-full h-20 bg-pink-50 rounded-lg border border-gray-200"></div>
                <p className="text-sm font-medium text-gray-700">Pink Light</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
                <div className="w-full h-20 bg-pink-100 rounded-lg"></div>
                <p className="text-sm font-medium text-gray-700">Pink Soft</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
                <div className="w-full h-20 bg-slate-800 rounded-lg"></div>
                <p className="text-sm font-medium text-gray-700">Dark Slate</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 space-y-3">
                <div className="w-full h-20 bg-white border-2 border-gray-300 rounded-lg"></div>
                <p className="text-sm font-medium text-gray-700">Pure White</p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Custom Colors Available</h2>
            <p className="mb-6 text-white/90">Want a specific color scheme for your cake? Let us know!</p>
            <Link 
              href="/#contact"
              className="inline-block bg-white text-pink-600 font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}