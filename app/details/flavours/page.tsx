// File: app/details/flavours/page.tsx

import Link from "next/link";
import Header from "@/components/ui/Header";
import flavours from "@/data/flavours.json";

export default function FlavoursPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-slate-200 selection:text-slate-900 pb-16">
      <Header variant="light" /> {/* Stays light because of the dark hero banner below */}

      {/* Hero Banner with Background Image */}
      <div className="relative w-full h-[40vh] min-h-[300px]">
        <div
          className="absolute inset-0 bg-[url('/cakes/default-image2.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-slate-900/60" /> {/* Dark overlay for text readability */}

        <div className="absolute inset-0 flex items-center justify-center pt-16 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase drop-shadow-xl">
            Cake Flavours
          </h1>
        </div>
      </div>

      <main className="px-6 md:px-16 max-w-7xl mx-auto py-12">
        {/* Breadcrumb */}
        {/* <nav className="mb-12 flex items-center space-x-2 text-sm">
          <Link href="/" className="text-slate-400 hover:text-[#312821] transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <Link href="/details/flavours" className="text-slate-400 hover:text-[#312821] transition-colors">Details</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-bold">Flavours</span>
        </nav> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT COLUMN: Narrative & Call-to-Action Box */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <p className="text-slate-600 text-lg font-medium leading-relaxed italic">
                From timeless classics to adventurous combinations, our flavours are crafted with the finest ingredients to ensure a premium taste experience.
              </p>

              <div className="bg-[#f66187] text-white p-8 rounded-3xl shadow-xl transform rotate-2 max-w-md">
                <p className="text-base font-bold leading-relaxed">
                  Our cakes are made exclusively with pure butter for the finest butter cake indulgence and Swiss Meringue Buttercream as frosting.
                </p>
              </div>
            </div>

            <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-[#312821] mb-3">✨ Custom Flavours</h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                Looking for something unique? We can create custom combinations to match your special celebration.
                Contact us to discuss your vision!
              </p>
            </section>
          </div>

          {/* RIGHT COLUMN: Flavour Listing with Swatches */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-8">Cake Flavour</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {flavours.map((flavour) => (
                  <div key={flavour.name} className="flex flex-col gap-4 group">
                    {/* Artisanal Swatch Layout */}
                    <div className="flex items-start gap-4">
                      {/* 5-row vertical swatch */}
                      <div className="flex flex-col w-12 h-12 rounded-lg overflow-hidden border border-slate-100 shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
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

                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-black text-[#312821] tracking-tight group-hover:text-[#f66187] transition-colors focus:outline-none capitalize">
                          {flavour.name}
                        </h3>
                        <p className="text-sm font-semibold leading-relaxed tracking-tight text-slate-500 line-clamp-3">
                          {flavour.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-slate-50 max-w-7xl mx-auto rounded-3xl p-12 text-center border border-slate-100 mx-6 mb-16 shadow-inner">
        <h2 className="text-3xl font-black text-[#312821] mb-4">Ready to Order?</h2>
        <p className="text-slate-600 font-medium mb-8">Contact us today to select the perfect flavour for your next celebration.</p>
        <Link
          href="/#contact"
          className="inline-block bg-[#312821] text-white font-black px-12 py-4 rounded-2xl hover:bg-black transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}