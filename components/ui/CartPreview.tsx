"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

export default function CartPreview() {
  const { cart } = useCart();

  const formatSize = (sizeKey: string) => {
    if (!sizeKey) return "";
    const [num] = sizeKey.split("_");
    return `${num}"`;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Link
          href="/catalog/wedding-cakes/floral-cakes"
          className="text-pink-600 hover:text-pink-700 font-medium text-sm"
        >
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-h-[500px] overflow-y-auto">
      {/* Cart Items */}
      <div className="divide-y divide-gray-200">
        {cart.slice(0, 3).map((item, idx) => (
          <div key={idx} className="p-4 hover:bg-gray-50 transition">
            <div className="flex gap-3 items-start">
              {/* Image */}
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="font-medium text-sm text-gray-800 hover:text-pink-600 line-clamp-1"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {formatSize(item.size)} · {item.flavour}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                  <span className="text-sm font-semibold text-pink-600">
                    RM {item.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more indicator if there are more items */}
      {cart.length > 3 && (
        <div className="px-4 py-2 bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            +{cart.length - 3} more item{cart.length - 3 > 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Subtotal</span>
          <span className="text-lg font-bold text-pink-600">RM {subtotal}</span>
        </div>
        
        <Link
          href="/checkout"
          className="block w-full bg-pink-600 text-white text-center py-2.5 rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          View Cart & Checkout
        </Link>
      </div>
    </div>
  );
}