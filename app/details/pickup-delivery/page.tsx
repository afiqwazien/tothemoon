import Header from "@/components/ui/Header";

const deliveryAreas = [
  { place: "Sumai / Primula / Permai", standard: "RM 20", tiered: "RM 25" },
  { place: "Wedding Place by Villapadu", standard: "RM 12", tiered: "RM 17" },
  { place: "Taman Tamadun Islam / Muzium", standard: "RM 20", tiered: "RM 25" },
  { place: "Rumah Abang Jamil", standard: "RM 35", tiered: "RM 40" },
  { place: "Homestay Ayah Wan", standard: "RM 18", tiered: "RM 23" },
  { place: "Noor Arfa Batik Craft", standard: "RM 15", tiered: "RM 20" },
  { place: "Rembulan Event Space", standard: "RM 18", tiered: "RM 23" },
  { place: "PB Sentral", standard: "RM 20", tiered: "RM 25" },
  { place: "Edani's River Cottage", standard: "RM 13", tiered: "RM 18" },
  { place: "Serai Cottage", standard: "RM 27", tiered: "RM 32" },
  { place: "The Payang Scout Hotel / Wan Kay Homestay", standard: "RM 30", tiered: "RM 35" },
  { place: "TER / Ombak Deru / Che Beach", standard: "RM 20", tiered: "RM 25" },
  { place: "Maecon D'River", standard: "RM 13", tiered: "RM 16" },
  { place: "Ulu Garden Kuala Berang", standard: "RM 37", tiered: "RM 40" },
  { place: "Duyong Marina", standard: "RM 20", tiered: "RM 25" },
];

export default function PickupDeliveryPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-slate-200 selection:text-slate-900 pb-16">
      <Header variant="light" />

      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] min-h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/cakes/bg-image2.jpg')" }}
        />
        <div className="absolute inset-0 bg-slate-900/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase drop-shadow-xl">
            Pickup &amp; Delivery
          </h1>
          <p className="text-white/70 font-medium mt-3 text-sm md:text-base tracking-widest uppercase">
            Guide
          </p>
        </div>
      </div>

      <main className="px-6 md:px-16 max-w-5xl mx-auto py-12 space-y-16">

        {/* ====== PICKUP SECTION ====== */}
        <section>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-6 uppercase">Pickup</h2>

          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-5 w-36 font-black text-slate-500 uppercase text-xs tracking-widest align-top">Location</td>
                  <td className="p-5 text-slate-700 font-medium space-y-1 text-[15px]">
                    <p>Waze / Maps <span className="font-bold text-slate-900">Tastie Pastry</span></p>
                    <p>Shop is located behind Pasaraya Seri Intan, Bukit Payong</p>
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-black text-slate-500 uppercase text-xs tracking-widest align-top">Pick Up<br />Time</td>
                  <td className="p-5 text-slate-700 font-medium space-y-2 text-[15px]">
                    <p>Operation Hour for Pickup</p>
                    <p className="font-bold text-slate-900">( 9.30 am – 5.00 pm )</p>
                    <p className="font-black text-[#312821]">CLOSED EVERY FRIDAY</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div className="mt-6 flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-[2] bg-slate-50 border border-slate-100 rounded-2xl p-5 text-[15px] text-slate-600 font-medium leading-relaxed">
              <span className="font-black text-slate-900 block mb-2 text-[15px]">Note:</span>
              Note that, any cake damage is no longer our responsibility once your order left our premise.
              Please inspect your order upon collection and let us know immediately if the cake is defective,
              damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
            </div>
            <p className="flex-1 text-[15px] text-slate-500 font-medium italic leading-relaxed sm:pt-2">
              ( After 5pm, please Whatsapp us to rearrange )
            </p>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* ====== DELIVERY SECTION ====== */}
        <section>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-6 uppercase">Delivery</h2>

          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="p-5 w-36 font-black text-slate-500 uppercase text-xs tracking-widest align-top">Coverage<br />Area</td>
                  <td className="p-5 text-slate-700 font-medium text-[15px]">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Marang</li>
                      <li>Kuala Terengganu</li>
                      <li>Kuala Nerus</li>
                      <li>Certain Hulu Terengganu area</li>
                    </ul>
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-5 font-black text-slate-500 uppercase text-xs tracking-widest align-top">Delivery<br />Price</td>
                  <td className="p-5 text-slate-700 font-medium text-[15px] space-y-3">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>RM 10 Flat Rate for first 5km from TastiePastry</li>
                      <li>Next 5km : RM 1.50 per km</li>
                      <li>For Tiered Cake : RM 2 per km</li>
                    </ul>
                    <p className="mt-3 text-[15px] font-medium text-slate-700 leading-relaxed">
                      Enjoy <span className="font-black text-[#312821]">FREE DELIVERY</span> for all orders worth RM 1000 and above
                      <span className="text-slate-500"> ( Valid within the first 15km from our store. Extra distance charged RM 1.50/km )</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="p-5 font-black text-slate-500 uppercase text-xs tracking-widest align-top">Delivery<br />Time</td>
                  <td className="p-5 text-slate-700 font-medium text-[15px]">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>9.30am runner will start delivering</li>
                      <li>5pm last runner will delivered from shop</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* ====== DELIVERY RATE TABLE ====== */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Delivery Rate</h2>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Estimated delivery fee by area</p>
          </div>

          <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-slate-400">
                    <th className="px-5 py-4 text-left font-black uppercase text-[9px] tracking-widest">Place</th>
                    <th className="px-5 py-4 text-center font-black uppercase text-[9px] tracking-widest">Standard Cake</th>
                    <th className="px-5 py-4 text-center font-black uppercase text-[9px] tracking-widest">
                      Tiered Cake<br /><span className="normal-case tracking-normal font-normal">( including Setup )</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {deliveryAreas.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                    >
                      <td className="px-5 py-4 font-medium text-slate-800 text-[15px]">{row.place}</td>
                      <td className="px-5 py-4 text-center font-bold text-slate-700 text-[15px]">{row.standard}</td>
                      <td className="px-5 py-4 text-center font-bold text-[#312821] text-[15px]">{row.tiered}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3 Note Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 text-[15px] text-slate-700 font-medium leading-relaxed text-center">
              <p className="font-bold text-slate-900">Rm 10 Flat Rate for first 5km from TastiePastry</p>
              <p className="mt-3">Next 5km : Rm1.50 per km</p>
              <p>For Tiered Cake : Rm 2.00 per km</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 text-[15px] text-slate-700 font-medium leading-relaxed text-center">
              <p className="font-bold text-slate-900">Enjoy Free Delivery for all orders worth Rm 1000 and above.</p>
              <p className="mt-3">Valid within first 15km from our bake house. Extra distance charged Rm 1.50 per km</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 text-[15px] text-slate-700 font-medium leading-relaxed text-center">
              <p>Provide your full address and we will check the rate for delivery to your place</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
