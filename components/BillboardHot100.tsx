// src/components/BillboardHot100.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const BillboardHot100: React.FC = () => {
  const [songs, setSongs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBillboardHot100 = async () => {
      try {
        const data = await fetchDataFromFirestore("billboard");

        const songsList = data
          .map((item) =>
            item.content
              .split("\n")
              .filter((song: string) => song.trim() !== "")
          )
          .flat();

        setSongs(songsList);
      } catch (err) {
        setError("Failed to fetch Billboard Hot 100 songs");
      }
    };

    fetchBillboardHot100();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {songs.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {songs.map((song, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-lg font-semibold text-white">{song}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Loading Billboard Hot 100 songs...</p>
      )}
    </div>
  );
};

export default BillboardHot100;
