// File: app/details/size-guide/page.tsx

import Link from "next/link";
import Header from "@/components/ui/Header";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <Header />
      
      <main className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-pink-600 transition">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/details/size-guide" className="hover:text-pink-600 transition">Details</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Size Guide</span>
          </div>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cake Size Guide
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Choose the perfect size for your celebration. Our cakes are designed to serve your guests beautifully.
            </p>
          </div>

          {/* Size Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Serving Sizes</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Cake Size</th>
                    <th className="px-6 py-4 text-left font-semibold">Diameter</th>
                    <th className="px-6 py-4 text-left font-semibold">Servings</th>
                    <th className="px-6 py-4 text-left font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-pink-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">4 inch</td>
                    <td className="px-6 py-4 text-gray-600">10 cm</td>
                    <td className="px-6 py-4 text-gray-600">4-6 people</td>
                    <td className="px-6 py-4 text-gray-600">Small gatherings</td>
                  </tr>
                  <tr className="hover:bg-pink-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">5 inch</td>
                    <td className="px-6 py-4 text-gray-600">13 cm</td>
                    <td className="px-6 py-4 text-gray-600">8-12 people</td>
                    <td className="px-6 py-4 text-gray-600">Small parties</td>
                  </tr>
                  <tr className="hover:bg-pink-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">6 inch</td>
                    <td className="px-6 py-4 text-gray-600">15 cm</td>
                    <td className="px-6 py-4 text-gray-600">12-18 people</td>
                    <td className="px-6 py-4 text-gray-600">Medium celebrations</td>
                  </tr>
                  <tr className="hover:bg-pink-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">8 inch</td>
                    <td className="px-6 py-4 text-gray-600">20 cm</td>
                    <td className="px-6 py-4 text-gray-600">24-30 people</td>
                    <td className="px-6 py-4 text-gray-600">Large events</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Cake Heights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Cake Heights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-24 bg-pink-200 rounded mr-4"></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Basic Height</h3>
                    <p className="text-gray-600">Standard 3-4 inch tall layers</p>
                  </div>
                </div>
                <p className="text-gray-700">Perfect for classic designs and traditional celebrations.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-32 bg-purple-200 rounded mr-4"></div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Tall Height</h3>
                    <p className="text-gray-600">Premium 5-6 inch tall layers</p>
                  </div>
                </div>
                <p className="text-gray-700">Impressive height for stunning centerpiece cakes.</p>
              </div>
            </div>
          </section>

          {/* Tiered Cakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tiered Cakes</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-gray-700 mb-6">
                Tiered cakes combine multiple sizes for grand occasions like weddings. Common combinations include:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="font-bold text-gray-900 mb-1">4" + 6"</p>
                  <p className="text-sm text-gray-600">20-25 servings</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="font-bold text-gray-900 mb-1">6" + 8"</p>
                  <p className="text-sm text-gray-600">40-50 servings</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="font-bold text-gray-900 mb-1">4" + 6" + 8"</p>
                  <p className="text-sm text-gray-600">60-70 servings</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Need Help Choosing?</h2>
            <p className="mb-6 text-white/90">Not sure which size is right for your event? We're here to help!</p>
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