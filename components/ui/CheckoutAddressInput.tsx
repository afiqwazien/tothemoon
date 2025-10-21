import React, { useState } from "react";
import axios from "axios";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const SHOP_LAT = Number(process.env.NEXT_PUBLIC_SHOP_LAT || 0); // set in env
const SHOP_LNG = Number(process.env.NEXT_PUBLIC_SHOP_LNG || 0);

const shopLocation = { lat: SHOP_LAT, lng: SHOP_LNG }; 

export default function PlaceAutocomplete() {
  const [input, setInput] = useState("");
  const [predictions, setPredictions] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  // const fetchPredictions = async (value: string) => {
  //   if (!value) return setPredictions([]);

  //   try {
  //     const res = await axios.post(
  //       "https://places.googleapis.com/v1/places:autocomplete",
  //       {
  //         input: value,
  //         languageCode: "en",
  //         includedRegionCodes: ["my"],
  //         sessionToken: crypto.randomUUID(),
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Goog-Api-Key": GOOGLE_API_KEY,
  //         },
  //       }
  //     );
  //     setPredictions(res.data.suggestions || []);
  //   } catch (err) {
  //     console.error("Autocomplete error:", err);
  //   }
  // };

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

      // only keep suggestions that have placePrediction
      const allowedCities = ["Marang", "Kuala Terengganu", "Kuala Nerus", "Hulu Terengganu"];

      const placesOnly = (res.data.suggestions || [])
        .filter((s: any) => s.placePrediction?.placeId)
        .filter((s: any) => {
          const main = s.placePrediction.structuredFormat?.mainText?.text || "";
          const secondary = s.placePrediction.structuredFormat?.secondaryText?.text || "";
          return allowedCities.some(city =>
            main.includes(city) || secondary.includes(city)
          );
        });

      setPredictions(placesOnly);
    } catch (err) {
      console.error("Autocomplete error:", err);
    }
  };


  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const res = await axios.get(
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

  // const handleSelect = (prediction: any) => {
  //   // Prefer placePrediction
  //   const placeId = prediction.placePrediction?.placeId;

  //   const displayText =
  //     prediction.text?.text ||
  //     prediction.placePrediction?.structuredFormat?.mainText?.text ||
  //     prediction.queryPrediction?.text?.text ||
  //     "";

  //   setInput(displayText);
  //   setPredictions([]);

  //   if (placeId) {
  //     fetchPlaceDetails(placeId);
  //   }
  // };

  const handleSelect = (prediction: any) => {
    const placeId = prediction.placePrediction.placeId;
    const displayText =
      prediction.placePrediction.structuredFormat?.mainText?.text || "";

    setInput(displayText);
    setPredictions([]);
    fetchPlaceDetails(placeId);
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
        <ul className="absolute bg-white border w-full shadow-lg max-h-60 overflow-y-auto">
          {/* {predictions.map((p, idx) => (
            <li
            key={idx}
            className="p-2 hover:bg-slate-100 bg-slate-700 cursor-pointer"
            onClick={() => handleSelect(p)}
          >
            {p.text?.text || p.placePrediction?.structuredFormat?.mainText?.text || "Unknown"}
          </li>

          ))} */}

          {predictions.map((p, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-gray-100 cursor-pointer text-slate-600"
              onClick={() => handleSelect(p)}
            >
              {p.placePrediction.structuredFormat?.mainText?.text}
              {p.placePrediction.structuredFormat?.secondaryText?.text && (
                <span className="text-gray-500 text-sm ml-2">
                  {p.placePrediction.structuredFormat.secondaryText.text}
                </span>
              )}
            </li>
          ))}

        </ul>
      )}

      {selectedPlace && (
        <div className="mt-4 p-2 border rounded bg-slate-700">
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
