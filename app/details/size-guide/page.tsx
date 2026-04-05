// File: app/details/size-guide/page.tsx

import Link from "next/link";
import Header from "@/components/ui/Header";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen font-sans selection:bg-slate-200 selection:text-slate-900 pb-16">
      <Header variant="light" /> {/* Stays light because of the dark hero banner below */}

      {/* Hero Banner with Background Image */}
      <div className="relative w-full h-[40vh] min-h-[300px]">
        {/* Placeholder beautiful cake image from Unsplash, can be replaced by your own local asset later */}
        <div
          className="absolute inset-0 bg-[url('/cakes/bg-image2.jpg')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-slate-900/60" /> {/* Dark overlay for text readability */}

        <div className="absolute inset-0 flex items-center justify-center pt-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase drop-shadow-xl">
            Cake Sizing
          </h1>
        </div>
      </div>

      <main className="px-6 md:px-16 max-w-7xl mx-auto py-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">

          {/* LEFT COLUMN: Pink Cake Cylinder & Height Info */}
          <div className="lg:col-span-5 space-y-10">
            <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-md italic">
              How to Measure the size of the cake, you can use ruler or measuring tools to measure your desire cake.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 sm:items-end">
              {/* Pink Cylinder Container */}
              <div className="relative w-64 h-64 mx-auto sm:mx-0">
                <svg width="100%" height="100%" viewBox="0 0 200 200" className="overflow-visible">
                  <defs>
                    <linearGradient id="artisanalCake" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FDE2D3" />
                      <stop offset="50%" stopColor="#FBCEB1" />
                      <stop offset="100%" stopColor="#D7A9A9" />
                    </linearGradient>
                  </defs>
                  {/* Cylinder Body */}
                  <path d="M 10 60 L 10 180 A 90 25 0 0 0 190 180 L 190 60 Z" fill="url(#artisanalCake)" />
                  {/* Top Face */}
                  <ellipse cx="100" cy="60" rx="90" ry="25" fill="#FDE2D3" />

                  {/* Horizontal Arrow & Text (These look fine as black text/lines because they sit on top of the bright pink SVG) */}
                  <g className="text-[#2c1e19] font-bold text-[10px] text-center" textAnchor="middle">
                    {/* Left Arrow Pointing Left */}
                    <line x1="75" y1="60" x2="20" y2="60" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />

                    <text x="100" y="44">4 Inch</text>
                    <text x="100" y="55">5 Inch</text>
                    <text x="100" y="66">6 Inch</text>
                    <text x="100" y="77">7 Inch</text>

                    {/* Right Arrow Pointing Right */}
                    <line x1="125" y1="60" x2="180" y2="60" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
                  </g>

                  {/* Vertical Arrow & Text */}
                  <g className="text-[#2c1e19] font-bold text-[12px] text-center" textAnchor="middle">
                    {/* Top Arrow Pointing Up */}
                    <line x1="100" y1="115" x2="100" y2="90" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />

                    <text x="100" y="130">Petite</text>
                    <text x="100" y="145">Basic</text>
                    <text x="100" y="160">Tall</text>

                    {/* Bottom Arrow Pointing Down */}
                    <line x1="100" y1="165" x2="100" y2="192" stroke="#000" strokeWidth="2" markerEnd="url(#arrow)" />
                  </g>

                  {/* Marker definitions */}
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
                    </marker>
                  </defs>
                </svg>
              </div>

              {/* Explanatory Tags and Lists */}
              <div className="flex flex-col gap-4 mt-6 sm:mt-0 flex-1">

                <div className="bg-[#312821] text-white rounded-lg px-3 py-2 text-sm font-bold text-center leading-tight shadow-sm inline-block self-start">
                  Size 4/5/6/7 Inch is referring<br />to the diameter of the cake
                </div>

                <div className="bg-[#604240] text-white rounded-lg px-3 py-2 text-sm font-semibold text-center leading-tight shadow-sm inline-block self-start">
                  Petite/Basic/Tall is referring<br />to the Height of the cake
                </div>

                <div className="text-sm mt-4 space-y-5">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 text-base">Petite</h3>
                    <ul className="list-disc pl-5 text-slate-600 font-medium">
                      <li>2 Layers of cake</li>
                      <li>Around (3 Inch +) Height</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 text-base">Basic</h3>
                    <ul className="list-disc pl-5 text-slate-600 font-medium">
                      <li>3 Layers of cake</li>
                      <li>Around (4.5 Inch +) Height</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 text-base">Tall</h3>
                    <ul className="list-disc pl-5 text-slate-600 font-medium">
                      <li>4 Layers of cake</li>
                      <li>Around (6 Inch +) Height</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: Layers Graphic & Size Guide Pink Box */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-12 lg:pt-[100px]">

            <div className="w-full">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Layers of cake</h3>
              <div className="flex items-center gap-2">
                {/* Labels */}
                <div className="flex flex-col justify-between h-[60px] text-sm font-bold text-right w-16">
                  <div className="text-slate-500">Cake</div>
                  <div className="text-amber-600">Filling</div>
                  <div className="text-slate-500">Cake</div>
                </div>
                {/* Arrows */}
                <div className="flex flex-col justify-between h-[60px] w-6">
                  <div className="flex items-center"><div className="w-full h-px bg-slate-400"></div><div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-slate-400"></div></div>
                  <div className="flex items-center"><div className="w-full h-px bg-slate-400"></div><div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-slate-400"></div></div>
                  <div className="flex items-center"><div className="w-full h-px bg-slate-400"></div><div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-slate-400"></div></div>
                </div>
                {/* Layered Cake SVG */}
                <svg width="120" height="80" viewBox="0 0 120 80">
                  <path d="M 5 45 L 5 65 A 55 15 0 0 0 115 65 L 115 45 Z" fill="#FDE2D3" />
                  <path d="M 5 35 L 5 45 A 55 15 0 0 0 115 45 L 115 35 Z" fill="#D9D7D1" />
                  <path d="M 5 25 L 5 35 A 55 15 0 0 0 115 35 L 115 25 Z" fill="#C4BDC9" />
                  <ellipse cx="60" cy="25" rx="55" ry="15" fill="#FDE2D3" />
                  <text x="60" y="29" fill="black" fontSize="12" fontWeight="bold" textAnchor="middle">(2 layers of cake)</text>
                </svg>
              </div>
            </div>

            <div className="bg-[#f66187] text-white p-8 rounded-3xl shadow-xl w-72 transform rotate-2">
              <h2 className="font-extrabold text-3xl text-white mb-2">Size Guide</h2>
              <p className="text-sm italic mb-4 opacity-90">Please allow +- for height & weight.</p>
              <p className="text-sm font-bold">Price is subject to decoration/design.</p>
            </div>

          </div>

          {/* RIGHT COLUMN: Description Text */}
          <div className="lg:col-span-3 lg:pt-[80px]">
            <div className="text-slate-200 text-[80px] leading-[0.5] font-serif mb-6">&ldquo;</div>
            <p className="text-[16px] leading-relaxed mb-8 text-slate-600 font-medium">
              Please take note, each of our cake are uniquely handcrafted. As every piece is made by hand, they might be slightly different from the reference picture or sample provided. Rest assured, we will ensure your cake is crafted with the utmost care and closely matches your desired design.
            </p>
            <div className="font-extrabold text-xl text-slate-900 tracking-tight">
              — <br /> <span className="text-[#312821]">Tastie Pastry</span>
            </div>
          </div>
        </div>

        {/* --- NEW CATALOGUE SECTION --- */}
        <hr className="my-16 border-slate-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">

          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Bento <span className="text-lg font-bold text-slate-400 block sm:inline">( Extra Small )</span></h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pl-2 sm:pl-4">
              <LayerDiagram layers={2} />

              <div className="flex items-center gap-6">
                <Cylinder w={50} h={40} topColor="#FDE2D3" stop1="#FDE2D3" stop2="#D7A9A9" label={"4 inch\nBento"} />
                <div className="text-sm">
                  <h3 className="font-bold text-slate-900 mb-2">Bento</h3>
                  <p className="text-slate-600">Height : 2.5 Inch+</p>
                  <p className="text-slate-600">Weight : approx. 250gram</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for 2-3 pax</p>
                </div>
              </div>
            </div>
            <hr className="mt-4 border-slate-100" />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Basic <span className="text-lg font-bold text-slate-400 block sm:inline">( Medium )</span></h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pl-2 sm:pl-4">
              <LayerDiagram layers={3} />

              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <Cylinder w={60} h={55} topColor="#FDE2D3" stop1="#FDE2D3" stop2="#D7A9A9" label={"5 inch\nBasic"} />
                  <div className="text-sm">
                    <h3 className="font-bold text-slate-900 mb-2">5 Inch Basic</h3>
                    <p className="text-slate-600">Height : 4.5 inch+</p>
                    <p className="text-slate-600">Weight : approx. 1 kilo</p>
                    <p className="text-amber-600 font-bold mt-1">Approximately for 12 pax</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <Cylinder w={75} h={60} topColor="#FDE2D3" stop1="#FDE2D3" stop2="#D7A9A9" label={"6 inch\nBasic"} />
                  <div className="text-sm">
                    <h3 className="font-bold text-slate-900 mb-2">6 Inch Basic</h3>
                    <p className="text-slate-600">Height : 4.5 inch+</p>
                    <p className="text-slate-600">Weight : approx. 1.5 kilo</p>
                    <p className="text-amber-600 font-bold mt-1">Approximately for 14pax</p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-4 border-slate-100" />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Petite <span className="text-lg font-bold text-slate-400 block sm:inline">( Small )</span></h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pl-2 sm:pl-4">
              <LayerDiagram layers={2} />

              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <Cylinder w={60} h={50} topColor="#FDE2D3" stop1="#FDE2D3" stop2="#D7A9A9" label={"5 inch\nPetite"} />
                  <div className="text-sm">
                    <h3 className="font-bold text-slate-900 mb-2">5 Inch Petite</h3>
                    <p className="text-slate-600">Height : 3 Inch+</p>
                    <p className="text-slate-600">Weight : approx. 550gram</p>
                    <p className="text-amber-600 font-bold mt-1">Approximately for 4-6 pax</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <Cylinder w={75} h={55} topColor="#FDE2D3" stop1="#FDE2D3" stop2="#D7A9A9" label={"6 inch\nPetite"} />
                  <div className="text-sm">
                    <h3 className="font-bold text-slate-900 mb-2">6 Inch Petite</h3>
                    <p className="text-slate-600">Height : 3 Inch+</p>
                    <p className="text-slate-600">Weight : approx. 800gram</p>
                    <p className="text-amber-600 font-bold mt-1">Approximately for 8-10 pax</p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-4 border-slate-100" />
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Tall <span className="text-lg font-bold text-slate-400 block sm:inline">( Large )</span></h2>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pl-2 sm:pl-4">
              <LayerDiagram layers={4} />

              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <Cylinder w={60} h={75} topColor="#FDE2D3" stop1="#FDE2D3" stop2="#D7A9A9" label={"5 inch\nTall"} />
                  <div className="text-sm">
                    <h3 className="font-bold text-slate-900 mb-2">5 Inch Tall</h3>
                    <p className="text-slate-600">Height : 6 Inch+</p>
                    <p className="text-slate-600">Weight : approx. 1.5 kilo</p>
                    <p className="text-amber-600 font-bold mt-1">Approximately for 14 pax</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <Cylinder w={75} h={85} topColor="#FDE2D3" stop1="#FDE2D3" stop2="#D7A9A9" label={"6 inch\nTall"} />
                  <div className="text-sm">
                    <h3 className="font-bold text-slate-900 mb-2">6 Inch Tall</h3>
                    <p className="text-slate-600">Height : 6 Inch+</p>
                    <p className="text-slate-600">Weight : approx. 2 kilo</p>
                    <p className="text-amber-600 font-bold mt-1">Approximately for 18 pax</p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-4 border-slate-100" />
          </div>

        </div>

        {/* --- TIERED CAKE SIZE SECTION --- */}
        <hr className="my-10 border-slate-100" />
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-8 uppercase">Tiered Cake Size</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">

          {/* 2 TIERED BASIC */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900">2 TIERED BASIC</h3>
              <p className="text-slate-400 font-bold text-sm">( 1 Flavour )</p>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-4 sm:hidden">
              <div className="flex justify-around gap-4">
                <div className="flex flex-col items-center">
                  <TieredStack idPrefix="m2b-a" tiers={[
                    { w: 56, h: 32, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "4 inch" },
                    { w: 80, h: 38, topColor: "#D9D7D1", stop1: "#D9D7D1", stop2: "#C4BDC9", label: "6 inch" },
                  ]} />
                  <div className="text-sm text-center mt-4">
                    <p className="font-bold text-slate-900 mb-1">6&quot; + 4&quot; inch</p>
                    <p className="text-slate-600">Height : 8 inch+ · Weight : 2.5 kg</p>
                    <p className="text-amber-600 font-bold mt-1">~20 pax</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <TieredStack idPrefix="m2b-b" tiers={[
                    { w: 64, h: 38, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "5 inch" },
                    { w: 92, h: 44, topColor: "#D7A9A9", stop1: "#D7A9A9", stop2: "#C4A4A4", label: "7 inch" },
                  ]} />
                  <div className="text-sm text-center mt-4">
                    <p className="font-bold text-slate-900 mb-1">7&quot; + 5&quot; inch</p>
                    <p className="text-slate-600">Height : 10 inch+ · Weight : 3.5 kg</p>
                    <p className="text-amber-600 font-bold mt-1">~35 pax</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f66187] text-white p-6 rounded-2xl shadow-lg mt-6 transform rotate-2">
                <h4 className="font-extrabold text-xl text-white mb-2">Size Guide</h4>
                <p className="text-sm italic mb-4 opacity-90">Please allow +- for height & weight.</p>
                <p className="text-sm font-bold">Price is subject to decoration/design.</p>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0">
                <TieredStack idPrefix="d2b-a" tiers={[
                  { w: 56, h: 32, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "4 inch" },
                  { w: 80, h: 38, topColor: "#D9D7D1", stop1: "#D9D7D1", stop2: "#C4BDC9", label: "6 inch" },
                ]} />
                <div className="text-sm text-center mt-6">
                  <p className="font-bold text-slate-900 mb-1">6&quot; + 4&quot; inch</p>
                  <p className="text-slate-600">Height : 8 inch+</p>
                  <p className="text-slate-600">Weight : approx. 2.5 kg</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for up to 20 pax</p>
                </div>
              </div>
              <div className="bg-[#f66187] text-white p-6 rounded-2xl shadow-lg w-44 shrink-0 mt-2 transform rotate-2">
                <h4 className="font-extrabold text-xl text-white mb-2">Size Guide</h4>
                <p className="text-xs italic mb-4 opacity-90">Please allow +- for height & weight.</p>
                <p className="text-xs font-bold">Price is subject to decoration/design.</p>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <TieredStack idPrefix="d2b-b" tiers={[
                  { w: 64, h: 38, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "5 inch" },
                  { w: 92, h: 44, topColor: "#D7A9A9", stop1: "#D7A9A9", stop2: "#C4A4A4", label: "7 inch" },
                ]} />
                <div className="text-sm text-center mt-6">
                  <p className="font-bold text-slate-900 mb-1">7&quot; + 5&quot; inch</p>
                  <p className="text-slate-600">Height : 10 inch+</p>
                  <p className="text-slate-600">Weight : approx. 3.5 kg</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for up to 35 pax</p>
                </div>
              </div>
            </div>
            <hr className="mt-4 border-slate-100" />
          </div>

          {/* 2 TIERED TALL */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900">2 TIERED TALL</h3>
              <p className="text-slate-400 font-bold text-sm">( 2 Flavours )</p>
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-8 sm:hidden">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <TieredStack idPrefix="m2t-a" tiers={[
                    { w: 56, h: 48, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "4 inch" },
                    { w: 80, h: 56, topColor: "#C4BDC9", stop1: "#C4BDC9", stop2: "#B4ABC7", label: "6 inch" },
                  ]} />
                </div>
                <div className="text-sm mt-2">
                  <p className="font-bold text-slate-900 mb-1">6&quot; + 4&quot; inch</p>
                  <p className="text-slate-600">Height : 12 inch+</p>
                  <p className="text-slate-600">Weight : approx. 3.5 kg</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for up to 35pax</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <TieredStack idPrefix="m2t-b" tiers={[
                    { w: 64, h: 54, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "5 inch" },
                    { w: 92, h: 62, topColor: "#D7A9A9", stop1: "#D7A9A9", stop2: "#C4A4A4", label: "7 inch" },
                  ]} />
                </div>
                <div className="text-sm mt-2">
                  <p className="font-bold text-slate-900 mb-1">7&quot; + 5&quot; inch</p>
                  <p className="text-slate-600">Height : 14 inch+</p>
                  <p className="text-slate-600">Weight : approx. 4.5 kg</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for up to 45 pax</p>
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex items-start gap-6">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <TieredStack idPrefix="d2t-a" tiers={[
                  { w: 56, h: 48, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "4 inch" },
                  { w: 80, h: 56, topColor: "#C4BDC9", stop1: "#C4BDC9", stop2: "#B4ABC7", label: "6 inch" },
                ]} />
              </div>
              <div className="flex flex-col gap-6 text-sm flex-1">
                <div>
                  <p className="font-bold text-slate-900 mb-1">6&quot; + 4&quot; inch</p>
                  <p className="text-slate-600">Height : 12 inch+</p>
                  <p className="text-slate-600">Weight : approx. 3.5 kg</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for up to 35pax</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 shrink-0">
                <TieredStack idPrefix="d2t-b" tiers={[
                  { w: 64, h: 54, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "5 inch" },
                  { w: 92, h: 62, topColor: "#D7A9A9", stop1: "#D7A9A9", stop2: "#C4A4A4", label: "7 inch" },
                ]} />
                <div className="text-sm">
                  <p className="font-bold text-slate-900 mb-1">7&quot; + 5&quot; inch</p>
                  <p className="text-slate-600">Height : 14 inch+</p>
                  <p className="text-slate-600">Weight : approx. 4.5 kg</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for up to 45 pax</p>
                </div>
              </div>
            </div>
            <hr className="mt-4 border-slate-100" />
          </div>

          {/* 3 TIERED BASIC */}
          <div className="flex flex-col gap-6">
            <div className="sm:text-right">
              <h3 className="text-2xl font-black text-slate-900">3 TIERED BASIC</h3>
              <p className="text-slate-400 font-bold text-sm">( 1-3 Flavours )</p>
            </div>

            {/* Mobile */}
            <div className="flex flex-col items-center gap-6 sm:hidden">
              <TieredStack idPrefix="m3b" tiers={[
                { w: 50, h: 28, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "4 inch" },
                { w: 72, h: 34, topColor: "#D9D7D1", stop1: "#D9D7D1", stop2: "#CAC8C0", label: "6 inch" },
                { w: 100, h: 40, topColor: "#f3d9dc", stop1: "#f3d9dc", stop2: "#f3d9dc", label: "8 inch" },
              ]} />
              <div className="flex flex-col gap-4 text-sm w-full">
                <div>
                  <p className="font-bold text-slate-900 mb-1">8&quot; + 6&quot; + 4&quot; inch</p>
                  <p className="text-slate-600">Height : 15 inch+</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for up to 55 pax</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">9&quot; + 7&quot; + 5&quot; inch</p>
                  <p className="text-slate-600">Height : 16 inch+</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for up to 80 pax</p>
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex items-start gap-6">
              <div className="flex items-start gap-4 ml-auto">
                <div className="flex flex-col gap-6 text-sm">
                  <div>
                    <p className="font-bold text-slate-900 mb-1">8&quot; + 6&quot; + 4&quot; inch</p>
                    <p className="text-slate-600">Height : 15 inch+</p>
                    <p className="text-amber-600 font-bold mt-1">Approximately for up to 55 pax</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">9&quot; + 7&quot; + 5&quot; inch</p>
                    <p className="text-slate-600">Height : 16 inch+</p>
                    <p className="text-amber-600 font-bold mt-1">Approximately for up to 80 pax</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <TieredStack idPrefix="d3b" tiers={[
                    { w: 50, h: 28, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "4 inch" },
                    { w: 72, h: 34, topColor: "#D9D7D1", stop1: "#D9D7D1", stop2: "#CAC8C0", label: "6 inch" },
                    { w: 100, h: 40, topColor: "#f3d9dc", stop1: "#f3d9dc", stop2: "#f3d9dc", label: "8 inch" },
                  ]} />
                </div>
              </div>
            </div>
            <hr className="mt-4 border-slate-100" />
          </div>

          {/* 3 TIERED TALL */}
          <div className="flex flex-col gap-6">
            <div className="sm:text-right">
              <h3 className="text-2xl font-black text-slate-900">3 TIERED TALL</h3>
              <p className="text-slate-400 font-bold text-sm">( 1-3 Flavours )</p>
            </div>

            {/* Mobile */}
            <div className="flex flex-col items-center gap-6 sm:hidden">
              <TieredStack idPrefix="m3t" tiers={[
                { w: 50, h: 44, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "5 inch" },
                { w: 72, h: 52, topColor: "#C4BDC9", stop1: "#C4BDC9", stop2: "#B4ABC7", label: "7 inch" },
                { w: 100, h: 60, topColor: "#f3d9dc", stop1: "#f3d9dc", stop2: "#f3d9dc", label: "9 inch" },
              ]} />
              <div className="flex flex-col gap-4 text-sm w-full">
                <p className="text-slate-400 text-xs italic">Same sizes as 3 Tiered Basic but Tall height</p>
                <div>
                  <p className="font-bold text-slate-900 mb-1">8&quot; + 6&quot; + 4&quot; inch</p>
                  <p className="text-slate-600">Height : 18 inch+</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for up to 55 pax</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">9&quot; + 7&quot; + 5&quot; inch</p>
                  <p className="text-slate-600">Height : 20 inch+</p>
                  <p className="text-amber-600 font-bold mt-1">Approximately for up to 80 pax</p>
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden sm:flex items-start gap-6">
              <div className="flex items-start gap-4 ml-auto">
                <div className="flex flex-col gap-6 text-sm">
                  <p className="text-slate-400 text-xs italic">Same sizes as 3 Tiered Basic but Tall height</p>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">8&quot; + 6&quot; + 4&quot; inch</p>
                    <p className="text-slate-600">Height : 18 inch+</p>
                    <p className="text-amber-600 font-bold mt-1">Approximately for up to 55 pax</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 mb-1">9&quot; + 7&quot; + 5&quot; inch</p>
                    <p className="text-slate-600">Height : 20 inch+</p>
                    <p className="text-amber-600 font-bold mt-1">Approximately for up to 80 pax</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <TieredStack idPrefix="d3t" tiers={[
                    { w: 50, h: 44, topColor: "#FDE2D3", stop1: "#FDE2D3", stop2: "#FBCEB1", label: "5 inch" },
                    { w: 72, h: 52, topColor: "#C4BDC9", stop1: "#C4BDC9", stop2: "#B4ABC7", label: "7 inch" },
                    { w: 100, h: 60, topColor: "#f3d9dc", stop1: "#f3d9dc", stop2: "#f3d9dc", label: "9 inch" },
                  ]} />
                </div>
              </div>
            </div>
            <hr className="mt-4 border-slate-100" />
          </div>

        </div>

        {/* NOTES */}
        <div className="mt-10">
          <p className="text-slate-900 font-black text-xl mb-4 tracking-tight">NOTES :</p>
          <div className="bg-[#f66187] text-white rounded-3xl px-8 py-6 text-base font-bold leading-relaxed max-w-2xl shadow-xl">
            Our cakes are made exclusively with pure butter for the finest butter cake indulgence and Swiss Meringue Buttercream as frosting.
          </div>
        </div>

      </main>
    </div>
  );
}

{/* HELPER COMPONENTS */ }
function Cylinder({ w, h, topColor, stop1, stop2, label }: { w: number, h: number, topColor: string, stop1: string, stop2: string, label: string }) {
  const ry = w * 0.15; // Vertical radius of ellipse to simulate 3D cylinder
  const totalH = h + ry * 2;
  const gradientId = `grad-${label.replace(/\s+/g, '-')}`;

  return (
    <div className="relative flex flex-col items-center shrink-0" style={{ width: w, height: totalH }}>
      <svg viewBox={`0 0 ${w} ${totalH}`} width={w} height={totalH} className="absolute inset-0">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={stop1} />
            <stop offset="100%" stopColor={stop2} />
          </linearGradient>
        </defs>
        {/* Cylinder Body */}
        <path d={`M 0 ${ry} L 0 ${h + ry} A ${w / 2} ${ry} 0 0 0 ${w} ${h + ry} L ${w} ${ry} Z`} fill={`url(#${gradientId})`} />
        {/* Top Face */}
        <ellipse cx={w / 2} cy={ry} rx={w / 2} ry={ry} fill={topColor} />
      </svg>
      {label && (
        <span className="relative z-10 text-[10px] font-bold text-slate-900 text-center leading-[1.1] whitespace-pre-line px-1 flex flex-col justify-center h-full pt-4">
          {label}
        </span>
      )}
    </div>
  )
}

function LayerDiagram({ layers }: { layers: number }) {
  const stackHeight = layers === 2 ? 70 : layers === 3 ? 90 : 130;
  return (
    <div className="relative flex items-center gap-2 mt-4 shrink-0">

      {/* Labels */}
      <div className="flex flex-col justify-around text-[10px] font-bold text-right w-12" style={{ height: stackHeight - 15, paddingTop: layers === 4 ? 12 : 0 }}>
        <div className="text-slate-500">Cake</div>
        <div className="text-amber-600">Filling</div>
        <div className="text-slate-500">Cake</div>
        {layers >= 3 && <div className="text-amber-600">Filling</div>}
        {layers >= 3 && <div className="text-slate-500">Cake</div>}
        {layers >= 4 && <div className="text-amber-600">Filling</div>}
        {layers >= 4 && <div className="text-slate-500">Cake</div>}
      </div>

      {/* Arrows */}
      <div className="flex flex-col justify-around w-4" style={{ height: stackHeight - 15, paddingTop: layers === 4 ? 15 : 0 }}>
        {Array.from({ length: layers * 2 - 1 }).map((_, i) => (
          <div key={i} className="flex items-center opacity-70">
            <div className="w-full h-px bg-slate-400"></div>
            <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[3px] border-l-slate-400"></div>
          </div>
        ))}
      </div>

      {/* Dynamic Stack Visual */}
      <div className="relative w-[100px]">
        <svg viewBox={`0 0 100 ${stackHeight}`} width="100%" height={stackHeight}>
          {layers === 2 && (
            <>
              <path d="M 5 35 L 5 55 A 45 12 0 0 0 95 55 L 95 35 Z" fill="#FDE2D3" />
              <path d="M 5 28 L 5 35 A 45 12 0 0 0 95 35 L 95 28 Z" fill="#D9D7D1" />
              <path d="M 5 15 L 5 28 A 45 12 0 0 0 95 28 L 95 15 Z" fill="#C4BDC9" />
            </>
          )}
          {layers === 3 && (
            <>
              <path d="M 5 55 L 5 75 A 45 12 0 0 0 95 75 L 95 55 Z" fill="#FDE2D3" />
              <path d="M 5 48 L 5 55 A 45 12 0 0 0 95 55 L 95 48 Z" fill="#D9D7D1" />
              <path d="M 5 35 L 5 48 A 45 12 0 0 0 95 48 L 95 35 Z" fill="#C4BDC9" />
              <path d="M 5 28 L 5 35 A 45 12 0 0 0 95 35 L 95 28 Z" fill="#D9D7D1" />
              <path d="M 5 15 L 5 28 A 45 12 0 0 0 95 28 L 95 15 Z" fill="#FDE2D3" />
            </>
          )}
          {layers === 4 && (
            <>
              {/* Bottom cake */}
              <path d="M 5 98 L 5 118 A 45 12 0 0 0 95 118 L 95 98 Z" fill="#FDE2D3" />
              {/* Filling 3 */}
              <path d="M 5 90 L 5 98 A 45 12 0 0 0 95 98 L 95 90 Z" fill="#D9D7D1" />
              {/* Cake 3 */}
              <path d="M 5 75 L 5 90 A 45 12 0 0 0 95 90 L 95 75 Z" fill="#C4BDC9" />
              {/* Filling 2 */}
              <path d="M 5 67 L 5 75 A 45 12 0 0 0 95 75 L 95 67 Z" fill="#D9D7D1" />
              {/* Cake 2 */}
              <path d="M 5 52 L 5 67 A 45 12 0 0 0 95 67 L 95 52 Z" fill="#C4BDC9" />
              {/* Filling 1 */}
              <path d="M 5 44 L 5 52 A 45 12 0 0 0 95 52 L 95 44 Z" fill="#D9D7D1" />
              {/* Top cake */}
              <path d="M 5 27 L 5 44 A 45 12 0 0 0 95 44 L 95 27 Z" fill="#FDE2D3" />
            </>
          )}
          <ellipse cx="50" cy={layers === 4 ? 27 : 15} rx="45" ry="12" fill="#FDE2D3" />
        </svg>

        {/* Badge Overflow */}
        <div className="absolute -top-4 right-[-10px] bg-[#312821] text-white text-[11px] font-bold px-2 py-1 rounded shadow text-center leading-tight z-10 border border-[#312821]">
          {layers} Layers<br />of cake
        </div>
      </div>
    </div>
  )
}

type TierDef = { w: number; h: number; topColor: string; stop1: string; stop2: string; label: string };

function TieredStack({ tiers, idPrefix = "ts" }: { tiers: TierDef[], idPrefix?: string }) {
  const maxW = Math.max(...tiers.map(t => t.w));
  const gap = -8; // negative = upper cake overlaps lower cake's top ellipse

  // Compute cumulative Y offsets (stack from top)
  const ryList = tiers.map(t => t.w * 0.18);
  const totalH = tiers.reduce((acc, t, i) => acc + t.h + ryList[i], 0) + gap * (tiers.length - 1);

  let currentY = 0;
  const tierData = tiers.map((t, i) => {
    const ry = ryList[i];
    const offsetX = (maxW - t.w) / 2;
    const y = currentY;
    currentY += t.h + ry + gap;
    return { ...t, ry, offsetX, y };
  });

  return (
    <svg viewBox={`0 0 ${maxW} ${totalH}`} width={maxW} height={totalH} className="overflow-visible">
      <defs>
        {tierData.map((t, i) => (
          <linearGradient key={i} id={`${idPrefix}-grad-${i}-${t.label.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={t.stop1} />
            <stop offset="100%" stopColor={t.stop2} />
          </linearGradient>
        ))}
      </defs>

      {[...tierData].reverse().map((t, i) => {
        const origIdx = tierData.length - 1 - i;
        const gid = `${idPrefix}-grad-${origIdx}-${t.label.replace(/\s+/g, '-')}`;
        const cx = t.offsetX + t.w / 2;
        const bodyTop = t.y + t.ry;
        const bodyBot = t.y + t.ry + t.h;
        return (
          <g key={origIdx}>
            {/* Body */}
            <path
              d={`M ${t.offsetX} ${bodyTop} L ${t.offsetX} ${bodyBot} A ${t.w / 2} ${t.ry} 0 0 0 ${t.offsetX + t.w} ${bodyBot} L ${t.offsetX + t.w} ${bodyTop} Z`}
              fill={`url(#${gid})`}
            />
            {/* Top ellipse — painted last so it covers the seam */}
            <ellipse cx={cx} cy={bodyTop} rx={t.w / 2} ry={t.ry} fill={t.topColor} />
            {/* Label */}
            <text x={cx} y={bodyTop + t.h / 2 + t.ry / 2 + 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e293b">
              {t.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
