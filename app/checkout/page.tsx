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
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-16 text-slate-100">
        <h1 className="text-3xl font-bold mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Cart Summary */}
          <div className="lg:col-span-2 space-y-8">

            {/* Cart Summary */}
            <section className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow">
              <h2 className="text-xl font-semibold mb-4 text-pink-400">Cart Summary</h2>
              {cartItems.length === 0 ? (
                <p className="text-slate-400">Your cart is empty.</p>
              ) : (
                <div className="divide-y divide-slate-700">
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
                          className="font-medium hover:text-pink-400 transition text-left cursor-pointer"
                        >
                          {item.name}
                        </button>
                        <p className="text-sm text-slate-400">
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
                            className="w-8 h-8 flex items-center justify-center cursor-pointer rounded border border-slate-600 hover:border-pink-400 hover:bg-slate-700 transition"
                          >
                            –
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(idx, item.quantity + 1)}
                            className="w-8 h-8 flex items-center cursor-pointer justify-center rounded border border-slate-600 hover:border-pink-400"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price & Delete */}
                      <div className="flex flex-col items-end gap-2">
                        <p className="font-semibold text-pink-500 whitespace-nowrap">
                          RM {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove ${item.name} from cart?`)) {
                              deleteItem(idx);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition cursor-pointer"
                          title="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <section className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow space-y-6">
              <h2 className="text-xl font-semibold text-pink-400">Delivery Details</h2>

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
                <div className="bg-slate-700 p-4 rounded-lg text-sm text-slate-200">
                  <p className="font-semibold text-pink-400">Pickup Address:</p>
                  <p>
                    LOT PT 8216-A, TINGKAT BAWAH JALAN KUALA BERANG, <br />MUKIM BUKIT PAYONG, <br />21400 Marang, Terengganu
                  </p>
                </div>
              )}

              {/* Delivery: address + auto distance */}
              {deliveryMethod === "delivery" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 mb-2">
                      Search your place{" "}
                      <span className="text-sm italic">(Coverage area: Marang, Kuala Terengganu, Kuala Nerus, Certain Hulu Terengganu area)</span>
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
                          <span className="font-semibold text-pink-500">RM {deliveryFee.toFixed(2)}</span>
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
                <label className="block text-slate-300 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-lg bg-slate-700 border border-slate-600 px-4 py-2 text-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                      className={`px-3 py-2 rounded-lg border text-sm transition cursor-pointer ${
                        selectedTimeslot === slot
                          ? "border-pink-500 bg-pink-50 text-pink-600"
                          : "border-slate-600 bg-slate-700 text-slate-200 hover:border-pink-400"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow">
              <h2 className="text-xl font-semibold mb-4 text-pink-400">Payment Method</h2>
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
          <aside className="space-y-6 sticky top-6 self-start">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow">
              <h2 className="text-xl font-semibold mb-4 text-pink-400">Order Summary</h2>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>RM {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>RM {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-700 my-2"></div>
                <div className="flex justify-between font-semibold text-pink-500">
                  <span>Total</span>
                  <span>RM {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              disabled={!isFormComplete || cartItems.length === 0}
              onClick={() => setShowConfirmModal(true)}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-lg shadow-lg transition cursor-pointer ${
                isFormComplete && cartItems.length > 0
                  ? "bg-pink-600 hover:bg-pink-700 text-white"
                  : "bg-slate-600 text-slate-400 cursor-not-allowed"
              }`}
            >
              Place Order
            </button>
          </aside>
        </div>
      </main>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-700 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-pink-400">Confirm Your Order</h2>

            {/* Items */}
            <div className="space-y-1 text-sm text-slate-300">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.name} ({formatSize(item.size)}, {item.flavour}) x{item.quantity}</span>
                  <span>RM {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-700 pt-3 space-y-1 text-sm text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>RM {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>RM {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-pink-400 text-base pt-1">
                <span>Total</span>
                <span>RM {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-3 text-sm text-slate-300 space-y-1">
              <p><span className="text-slate-400">Method:</span> {deliveryMethod === "pickup" ? "Store Pickup" : "Delivery"}</p>
              {deliveryMethod === "delivery" && (
                <p><span className="text-slate-400">Address:</span> {deliveryAddress}</p>
              )}
              <p><span className="text-slate-400">Date:</span> {selectedDate}</p>
              <p><span className="text-slate-400">Timeslot:</span> {selectedTimeslot}</p>
              <p><span className="text-slate-400">Payment:</span> {selectedPayment}</p>
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
                className="flex-1 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold transition cursor-pointer"
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