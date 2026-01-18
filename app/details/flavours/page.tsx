// File: app/details/flavours/page.tsx

import Link from "next/link";
import Header from "@/components/ui/Header";
import flavours from "@/data/flavours.json";

export default function FlavoursPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Header />
      
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-pink-600 transition">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/details/flavours" className="hover:text-pink-600 transition">Details</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Flavours</span>
          </div>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Flavours
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Discover our delicious range of cake flavours. Each one is crafted with premium ingredients to create unforgettable taste experiences.
            </p>
          </div>

          {/* Flavours Grid */}
          <section className="mb-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flavours.map((flavour) => (
                <div 
                  key={flavour.name}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Color Swatch */}
                  <div className="h-24 flex">
                    {flavour.colors.map((color, idx) => (
                      <div 
                        key={idx}
                        className={`flex-1 ${color}`}
                      ></div>
                    ))}
                  </div>

                  {/* Flavour Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {flavour.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {flavour.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Combinations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Combinations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Classic Elegance</h3>
                <p className="text-gray-700 mb-4">
                  Vanilla sponge with vanilla buttercream - timeless and universally loved.
                </p>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">Weddings</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Birthdays</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Chocolate Lover's Dream</h3>
                <p className="text-gray-700 mb-4">
                  Rich chocolate sponge with chocolate ganache - indulgent and decadent.
                </p>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">Celebrations</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Parties</span>
                </div>
              </div>
            </div>
          </section>

          {/* Custom Flavours Notice */}
          <section className="bg-pink-50 rounded-xl p-8 mb-12 border border-pink-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">✨ Custom Flavours Available</h2>
            <p className="text-gray-700">
              Don't see your favorite flavour? We can create custom combinations to match your preferences. 
              Contact us to discuss your unique flavor ideas!
            </p>
          </section>

          {/* Contact CTA */}
          <section className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Questions About Flavours?</h2>
            <p className="mb-6 text-white/90">We'd love to help you choose the perfect taste for your celebration!</p>
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