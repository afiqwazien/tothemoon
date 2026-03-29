"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onPlaceSelect: (lat: number, lng: number, address: string) => void;
}

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
const DEFAULT_CENTER = { lat: 5.2, lng: 103.1 };
const DEFAULT_ZOOM = 11;

export default function CheckoutAddressInput({ onPlaceSelect }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const [mapReady, setMapReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pending state inside modal (not confirmed yet)
  const [pendingAddress, setPendingAddress] = useState<string>("");
  const [pendingLat, setPendingLat] = useState<number | null>(null);
  const [pendingLng, setPendingLng] = useState<number | null>(null);

  // Confirmed state shown outside modal
  const [confirmedAddress, setConfirmedAddress] = useState<string>("");

  // Load Google Maps script once
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (document.getElementById("google-maps-script")) {
      setMapReady(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapReady(true);
    document.head.appendChild(script);
  }, []);

  // Init map when modal opens
  useEffect(() => {
    if (!modalOpen || !mapReady || !mapRef.current) return;

    // Small delay to ensure the modal DOM is rendered
    const timeout = setTimeout(() => {
      if (googleMapRef.current) return; // already initialized

      const map = new window.google.maps.Map(mapRef.current!, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });

      googleMapRef.current = map;

      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();
        if (lat === undefined || lng === undefined) return;

        if (markerRef.current) {
          markerRef.current.setPosition({ lat, lng });
        } else {
          markerRef.current = new window.google.maps.Marker({
            position: { lat, lng },
            map,
            draggable: true,
            animation: window.google.maps.Animation.DROP,
          });

          markerRef.current.addListener("dragend", (dragE: google.maps.MapMouseEvent) => {
            const dLat = dragE.latLng?.lat();
            const dLng = dragE.latLng?.lng();
            if (dLat !== undefined && dLng !== undefined) {
              reverseGeocode(dLat, dLng);
            }
          });
        }

        reverseGeocode(lat, lng);
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [modalOpen, mapReady]);

  const reverseGeocode = async (lat: number, lng: number) => {
    setLoading(true);
    setPendingLat(lat);
    setPendingLng(lng);
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await res.json();
      const formattedAddress = data.results?.[0]?.formatted_address || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      setPendingAddress(formattedAddress);
    } catch {
      setPendingAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (pendingLat === null || pendingLng === null || !pendingAddress) return;
    setConfirmedAddress(pendingAddress);
    onPlaceSelect(pendingLat, pendingLng, pendingAddress);
    setModalOpen(false);
    googleMapRef.current = null; // ✅
    markerRef.current = null;    // ✅
  };

  const handleClose = () => {
    setModalOpen(false);
    googleMapRef.current = null; // ✅
    markerRef.current = null;    // ✅
    if (!confirmedAddress) {
      setPendingAddress("");
      setPendingLat(null);
      setPendingLng(null);
    }
  };

  return (
    <>
      {/* Trigger button + confirmed address display */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition cursor-pointer ${
            confirmedAddress
              ? "border-pink-500/50 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20"
              : "border-slate-600 bg-slate-700 text-slate-200 hover:border-pink-400 hover:bg-slate-600"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {confirmedAddress ? "Change Location" : "Pick on Map"}
          {confirmedAddress && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          )}
        </button>

        {confirmedAddress && (
          <div className="bg-slate-700/60 border border-slate-600 rounded-xl px-4 py-3 text-sm text-slate-200 flex items-start gap-3">
            <div className="mt-0.5 bg-pink-500/20 rounded-full p-1 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-slate-400 uppercase tracking-wide">Selected Location</span>
              <span>{confirmedAddress}</span>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl w-[80vw] max-w-[80vw] flex flex-col overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-pink-400">Pin Your Location</h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-200 transition cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Instruction */}
            <p className="text-sm text-slate-400 px-5 pt-3">
              Click on the map to drop a pin at your location. Drag the pin to fine-tune.
            </p>

            {/* Map */}
            <div
              ref={mapRef}
              className="w-full mx-5 mt-3 rounded-xl border border-slate-600 overflow-hidden"
              style={{ height: "60vh", width: "calc(100% - 40px)" }}
            />

            {/* Pending address + confirm */}
            <div className="px-5 py-4 space-y-3">
              {loading && (
                <p className="text-sm text-slate-400">Getting address...</p>
              )}
              {pendingAddress && !loading && (
                <div className="bg-slate-700 rounded-lg px-4 py-3 text-sm text-slate-200 flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 text-pink-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{pendingAddress}</span>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 transition cursor-pointer text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={!pendingAddress || loading}
                  className={`flex-1 py-2 rounded-xl font-semibold text-sm transition cursor-pointer ${
                    pendingAddress && !loading
                      ? "bg-pink-600 hover:bg-pink-700 text-white"
                      : "bg-slate-600 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Confirm Location
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}