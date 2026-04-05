import Image from "next/image";

interface ProductCardProps {
  key: string;
  slug: string;
  name: string;
  price: string;
  image: string;
}

export default function ProductCard({ slug, name, price, image }: ProductCardProps) {
  return (
    <a href={`/product/${slug}`} className="group block">
      <div
        className="relative rounded-3xl bg-white overflow-hidden 
        border border-gray-200 shadow-lg hover:shadow-2xl
        transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.03]
        flex flex-col cursor-pointer"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
          transition-transform duration-1000 ease-in-out
          bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />

        {/* Image Section */}
        <div className="relative w-full h-72 md:h-80 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-all duration-700 ease-out 
              group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent 
            opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
          
          {/* Floating badge */}
          <div className="absolute top-4 right-0 bg-white/90 backdrop-blur-md 
            px-3 py-1.5 rounded-l-full text-[10px] font-bold text-[#312821]
            shadow-lg translate-x-full group-hover:translate-x-0
            transition-transform duration-500 ease-out border-y border-l border-slate-100">
            View Details
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-[#312821]/10 to-transparent 
            rounded-br-full transform -translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0
            transition-transform duration-500" />
        </div>

        {/* Content Section */}
        <div className="relative p-5 flex flex-col gap-3">
          <h3
            className="text-sm md:text-base font-bold text-gray-800 group-hover:text-[#312821]
            transition-colors duration-300 line-clamp-2 leading-snug"
          >
            {name}
          </h3>
          
          {/* Price with subtle background */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-[#312821]">
              {price}
            </span>
            {/* <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            </div> */}
          </div>
        </div>

        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 
          bg-linear-to-r from-transparent via-[#312821]/30 to-transparent 
          blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </a>
  );
}