import Image from "next/image";

interface ProductCardProps {
  key: string,
  slug: string,
  name: string;
  price: string;
  image: string;
}

export default function ProductCard({ slug, name, price, image }: ProductCardProps) {
  return (
    <a href={`/catalog/${slug}`}>
      <div className="rounded-3xl shadow-lg overflow-hidden bg-white flex flex-col transform transition-all duration-300 
        hover:scale-105 hover:shadow-2xl hover:border-pink-400 border-2 border-transparent cursor-pointer">
        
        {/* Image */}
        <div className="relative w-full h-72 md:h-80 flex-shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5 text-center flex-1 flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-pink-600 font-bold text-lg">{price}</p>
        </div>
      </div>
      </a>
  );
}
