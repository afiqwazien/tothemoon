"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ref, onValue, get } from "firebase/database";
import { database } from "@/lib/firebase"; // Make sure to import from the right path

// You can match these types exactly to your catalog.json structure
export type CakeSize = {
  // Add structure if you have explicit typing, normally dynamic
  [key: string]: number | string;
};

export type Cake = {
  name: string;
  slug: string;
  image?: string;
  images?: string[];
  price: string;
  sizes: any;
};

export type CatalogCategory = {
  id: string;
  mainCategory: string;
  title: string;
  slug: string;
  cakes: Cake[];
};

type CatalogContextType = {
  catalog: CatalogCategory[];
  loading: boolean;
};

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [catalog, setCatalog] = useState<CatalogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference to the 'catalog' node in your Realtime Database
    const catalogRef = ref(database, "catalog");

    // Fetch the data once
    get(catalogRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          // Firebase might return an object instead of array if there are missing indices,
          // but if it was uploaded as array, snapshot.val() will be an array.
          // Let's ensure it's an array for the application:
          const catalogArray = Array.isArray(data) 
            ? data 
            : Object.values(data);
            
          setCatalog(catalogArray as CatalogCategory[]);
        } else {
          console.log("No catalog data available in Firebase.");
          setCatalog([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching catalog:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <CatalogContext.Provider value={{ catalog, loading }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog must be used within CatalogProvider");
  return context;
};
