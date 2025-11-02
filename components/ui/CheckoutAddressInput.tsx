import React, { useState } from "react";
import axios from "axios";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
// const SHOP_LAT = Number(process.env.NEXT_PUBLIC_SHOP_LAT || 0);
// const SHOP_LNG = Number(process.env.NEXT_PUBLIC_SHOP_LNG || 0);

// --- Interfaces for type safety ---
interface StructuredText {
  text?: string;
}

interface StructuredFormat {
  mainText?: StructuredText;
  secondaryText?: StructuredText;
}

interface PlacePrediction {
  placeId: string;
  structuredFormat?: StructuredFormat;
}

interface Suggestion {
  placePrediction?: PlacePrediction;
}

interface PlaceDetails {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
}

export default function PlaceAutocomplete() {
  const [input, setInput] = useState<string>("");
  const [predictions, setPredictions] = useState<Suggestion[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);

  const fetchPredictions = async (value: string) => {
    if (!value) return setPredictions([]);

    try {
      const res = await axios.post(
        "https://places.googleapis.com/v1/places:autocomplete",
        {
          input: value,
          languageCode: "en",
          includedRegionCodes: ["my"],
          sessionToken: crypto.randomUUID(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_API_KEY,
          },
        }
      );

      const allowedCities = [
        "Marang",
        "Kuala Terengganu",
        "Kuala Nerus",
        "Hulu Terengganu",
      ];

      const suggestions: Suggestion[] = (res.data.suggestions || [])
        .filter((s: Suggestion) => s.placePrediction?.placeId)
        .filter((s: Suggestion) => {
          const main = s.placePrediction?.structuredFormat?.mainText?.text || "";
          const secondary =
            s.placePrediction?.structuredFormat?.secondaryText?.text || "";
          return allowedCities.some(
            (city) => main.includes(city) || secondary.includes(city)
          );
        });

      setPredictions(suggestions);
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  };

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const res = await axios.get<PlaceDetails>(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
          params: {
            fields: "id,displayName,formattedAddress,location",
            key: GOOGLE_API_KEY,
          },
        }
      );
      setSelectedPlace(res.data);
    } catch (err) {
      console.error("Place details error:", err);
    }
  };

  const handleSelect = (prediction: Suggestion) => {
    const placeId = prediction.placePrediction?.placeId;
    const displayText =
      prediction.placePrediction?.structuredFormat?.mainText?.text || "";

    if (placeId) {
      setInput(displayText);
      setPredictions([]);
      fetchPlaceDetails(placeId);
    }
  };

  return (
    <div className="relative w-80">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          fetchPredictions(e.target.value);
        }}
        className="w-full border p-2 rounded"
        placeholder="Search a place..."
      />

      {predictions.length > 0 && (
        <ul className="absolute bg-white border w-full shadow-lg max-h-60 overflow-y-auto z-10">
          {predictions.map((p, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer text-slate-600"
              onClick={() => handleSelect(p)}
            >
              {p.placePrediction?.structuredFormat?.mainText?.text}
              {p.placePrediction?.structuredFormat?.secondaryText?.text && (
                <span className="text-gray-500 text-sm ml-2">
                  {p.placePrediction.structuredFormat.secondaryText.text}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {selectedPlace && (
        <div className="mt-4 p-2 border rounded bg-slate-700 text-white">
          <h4 className="font-bold">{selectedPlace.displayName?.text}</h4>
          <p>{selectedPlace.formattedAddress}</p>
          <p>
            Lat: {selectedPlace.location?.latitude}, Lng:{" "}
            {selectedPlace.location?.longitude}
          </p>
        </div>
      )}
    </div>
  );
}
