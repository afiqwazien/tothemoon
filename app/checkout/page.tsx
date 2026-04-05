"use client"

import CheckoutAddressInput from "@/components/ui/CheckoutAddressInput";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Header from "@/components/ui/Header";
import { useRouter } from "next/navigation";

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const SHOP_LAT = Number(process.env.NEXT_PUBLIC_SHOP_LAT || 0);
  const SHOP_LNG = Number(process.env.NEXT_PUBLIC_SHOP_LNG || 0);

  // ✅ All state declarations first, before any useEffect
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [distanceLoading, setDistanceLoading] = useState(false);
  const [distanceError, setDistanceError] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeslot, setSelectedTimeslot] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string>("Cash on Delivery");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const round2 = (v: number) => Math.round(v * 100) / 100;

  const calcDeliveryFeeFromKm = (km: number) => {
    if (km <= 5) return 10;
    const extra = Math.max(0, km - 5);
    return round2(10 + extra * 1.5);
  };

  const formatSize = (sizeKey: string) => {
    if (!sizeKey) return "";
    const [num] = sizeKey.split("_");
    return `${num} inch`;
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty < 1) return;
    const item = cart[index];
    updateQuantity(item.id, item.size, item.flavour, newQty);
  };

  const handlePlaceSelect = (lat: number, lng: number, address: string) => {
    setDistanceLoading(true);
    setDistanceError(null);
    setDeliveryAddress(address); // ✅ capture address
    try {
      const km = round2(haversineKm(lat, lng, SHOP_LAT, SHOP_LNG));
      setDistanceKm(km);
    } catch {
      setDistanceError("Could not calculate distance.");
    } finally {
      setDistanceLoading(false);
    }
  };

  const deleteItem = (index: number) => {
    removeFromCart(cart[index].id);
  };

  // ✅ useEffects after all state declarations
  useEffect(() => {
    if (deliveryMethod === "pickup") {
      setDistanceKm(null);
      setDeliveryFee(0);
    }
  }, [deliveryMethod]);

  useEffect(() => {
    if (distanceKm === null) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(calcDeliveryFeeFromKm(distanceKm));
    }
  }, [distanceKm]);

  const cartItems = cart;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  const timeslots = [
    "9:30 AM – 11:00 AM",
    "11:00 AM – 1:00 PM",
    "1:00 PM – 3:00 PM",
    "3:00 PM – 4:00 PM",
  ];

  const isFormComplete =
  selectedDate &&
  selectedTimeslot &&
  (deliveryMethod === "pickup" || (deliveryMethod === "delivery" && deliveryAddress));

  const WHATSAPP_NUMBER = "60136305766";

  const buildWhatsAppMessage = () => {
    const itemLines = cartItems
      .map((item) => `• ${item.name} (${formatSize(item.size)}, ${item.flavour}) x${item.quantity} — RM ${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    const address = deliveryMethod === "pickup"
      ? "Store Pickup"
      : deliveryAddress;

    return encodeURIComponent(
      `🛒 *New Order*\n\n` +
      `*Items:*\n${itemLines}\n\n` +
      `*Subtotal:* RM ${subtotal.toFixed(2)}\n` +
      `*Delivery Fee:* RM ${deliveryFee.toFixed(2)}\n` +
      `*Total:* RM ${total.toFixed(2)}\n\n` +
      `*Delivery Method:* ${deliveryMethod === "pickup" ? "Store Pickup" : "Delivery"}\n` +
      `*Address:* ${address}\n` +
      `*Date:* ${selectedDate}\n` +
      `*Timeslot:* ${selectedTimeslot}\n\n` +
      `*Payment:* ${selectedPayment}`
    );
  };

  const handleConfirmOrder = () => {
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setShowConfirmModal(false);
  };

  return (
    <div>
      <Header variant="dark" />
      <main className="max-w-5xl mx-auto px-6 py-16 text-slate-900">
        <h1 className="text-3xl font-bold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Cart Summary */}
          <div className="lg:col-span-2 space-y-8">

            {/* Cart Summary */}
            <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black mb-6 text-[#312821]">Cart Summary</h2>
              {cartItems.length === 0 ? (
                <p className="text-slate-400">Your cart is empty.</p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-4">
                      {/* Product Image */}
                      <button
                        onClick={() => router.push(`/product/${item.slug}`)}
                        className="shrink-0 cursor-pointer hover:opacity-80 transition"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg border border-slate-600"
                        />
                      </button>

                      {/* Info */}
                      <div className="flex-1 px-4">
                        <button
                          onClick={() => router.push(`/product/${item.slug}`)}
                          className="font-black text-lg hover:text-[#312821] transition text-left cursor-pointer text-slate-900"
                        >
                          {item.name}
                        </button>
                        <p className="text-sm text-slate-500 font-medium">
                          Size: {formatSize(item.size)} · Flavour: {item.flavour}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (item.quantity === 1) {
                                if (confirm(`Remove ${item.name} from cart?`)) {
                                  deleteItem(idx);
                                }
                              } else {
                                handleUpdateQuantity(idx, item.quantity - 1);
                              }
                            }}
                            className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-xl border border-slate-100 hover:border-[#312821] hover:bg-slate-50 transition font-bold"
                          >
                            –
                          </button>
                          <span className="text-2xl font-bold px-4 text-slate-900 min-w-12 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(idx, item.quantity + 1)}
                            className="w-10 h-10 flex items-center cursor-pointer justify-center rounded-xl border border-slate-100 hover:border-[#312821] hover:bg-slate-50 transition font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price & Delete */}
                      <div className="flex flex-col items-end gap-2">
                        <p className="font-black text-[#312821] whitespace-nowrap">
                          RM {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove ${item.name} from cart?`)) {
                              deleteItem(idx);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition cursor-pointer"
                          title="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Delivery Details */}
            <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-[#312821]">Delivery Details</h2>

              {/* Method */}
              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery"
                    checked={deliveryMethod === "delivery"}
                    onChange={() => setDeliveryMethod("delivery")}
                  />
                  <span>By Car (Delivery)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={() => setDeliveryMethod("pickup")}
                  />
                  <span>Store Pickup</span>
                </label>
              </div>

              {/* Pickup address */}
              {deliveryMethod === "pickup" && (
                <div className="bg-slate-50 p-6 rounded-2xl text-sm text-slate-700 border border-slate-100">
                  <p className="font-black text-[#312821] mb-1">Pickup Address:</p>
                  <p className="font-medium leading-relaxed">
                    LOT PT 8216-A, TINGKAT BAWAH JALAN KUALA BERANG, <br />MUKIM BUKIT PAYONG, <br />21400 Marang, Terengganu
                  </p>
                </div>
              )}

              {/* Delivery: address + auto distance */}
              {deliveryMethod === "delivery" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-2">
                      Search your place{" "}
                      <span className="text-xs font-normal italic text-slate-500">(Coverage area: Marang, Kuala Terengganu, Kuala Nerus, Certain Hulu Terengganu area)</span>
                    </label>
                    <CheckoutAddressInput onPlaceSelect={handlePlaceSelect} />
                  </div>

                  {/* Loading / error / result */}
                  <div>
                    {distanceLoading && <p className="text-sm text-slate-300">Calculating distance…</p>}
                    {distanceError && <p className="text-sm text-rose-400">{distanceError}</p>}
                    {distanceKm !== null && !distanceLoading && (
                      <div className="mt-2 text-slate-200">
                        <div className="flex items-center justify-between w-full max-w-xs">
                          <span className="text-sm">Distance</span>
                          <span className="font-medium">{distanceKm} km</span>
                        </div>
                        <div className="flex items-center justify-between w-full max-w-xs mt-1">
                          <span className="text-sm">Delivery fee</span>
                          <span className="font-black text-[#312821]">RM {deliveryFee.toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rate info */}
                  <div className="text-slate-300 text-sm">
                    <p>RM 10 flat rate for first 5 km</p>
                    <p>RM 1.50 per km after 5 km</p>
                  </div>
                </div>
              )}

              {/* Date */}
              <div>
                <label className="block text-slate-700 font-bold mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-xl bg-white border border-slate-100 px-4 py-3 text-slate-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#312821] shadow-sm"
                />
              </div>

              {/* Timeslot */}
              <div>
                <label className="block text-slate-300 mb-2">Select Timeslot</label>
                <div className="grid grid-cols-2 gap-3">
                  {timeslots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeslot(slot)}
                      className={`px-3 py-3 rounded-xl border text-sm font-black transition cursor-pointer shadow-sm ${
                        selectedTimeslot === slot
                          ? "border-[#312821] bg-[#312821] text-white"
                          : "border-slate-50 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black mb-6 text-[#312821]">Payment Method</h2>
              <div className="space-y-3">
                {["Cash on Delivery", "Bank Transfer", "Credit/Debit Card"].map((method) => (
                  <label key={method} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={selectedPayment === method}
                      onChange={() => setSelectedPayment(method)}
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Order Summary */}
          <aside className="space-y-6 sticky top-32 self-start">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl">
              <h2 className="text-2xl font-black mb-6 text-slate-900 border-b border-slate-50 pb-4">Order Summary</h2>
              <div className="space-y-4 text-slate-700 font-medium text-lg">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>RM {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>RM {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-100 my-4"></div>
                <div className="flex justify-between font-black text-2xl text-[#312821]">
                  <span>Total</span>
                  <span>RM {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              disabled={!isFormComplete || cartItems.length === 0}
              onClick={() => setShowConfirmModal(true)}
              className={`w-full py-3 px-6 rounded-xl font-bold text-lg shadow-lg transition cursor-pointer ${
                isFormComplete && cartItems.length > 0
                  ? "bg-[#312821] hover:bg-black text-white"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300"
              }`}
            >
              Place Order
            </button>
          </aside>
        </div>
      </main>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-100 px-4">
          <div className="bg-white rounded-3xl p-10 max-w-lg w-full border border-slate-100 shadow-2xl space-y-8 transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95">
            <h2 className="text-3xl font-black text-slate-900 leading-tight">Confirm Your <span className="text-[#312821]">Sweet Order</span></h2>

            {/* Items */}
            <div className="space-y-3 text-sm text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between font-medium">
                  <span className="flex-1 mr-4">{item.name} <span className="text-slate-400 font-normal">({formatSize(item.size)}, {item.flavour})</span> x{item.quantity}</span>
                  <span className="font-bold text-slate-900">RM {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="border-t border-slate-100 mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold text-slate-900">RM {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Fee</span>
                  <span className="font-bold text-slate-900">RM {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-black text-xl text-[#312821] pt-1">
                  <span>Total</span>
                  <span>RM {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm font-black text-slate-700 bg-white p-2 rounded-xl">
              <p className="flex justify-between"><span>Method:</span> <span className="text-[#312821]">{deliveryMethod === "pickup" ? "Store Pickup" : "Delivery"}</span></p>
              {deliveryMethod === "delivery" && (
                <p className="flex justify-between gap-4"><span>Address:</span> <span className="text-slate-500 font-medium text-right">{deliveryAddress}</span></p>
              )}
              <p className="flex justify-between"><span>Date:</span> <span className="text-slate-500 font-medium">{selectedDate}</span></p>
              <p className="flex justify-between"><span>Timeslot:</span> <span className="text-slate-500 font-medium">{selectedTimeslot}</span></p>
              <p className="flex justify-between"><span>Payment:</span> <span className="text-slate-500 font-medium">{selectedPayment}</span></p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 transition cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 py-2 rounded-xl bg-[#312821] hover:bg-black text-white font-bold transition cursor-pointer"
              >
                Confirm & WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}