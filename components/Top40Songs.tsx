// src/components/Top40Songs.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const Top40Songs: React.FC = () => {
  const [songs, setSongs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await fetchDataFromFirestore("top_songs");
        const formattedSongs = data
          .map((item) => item.content)
          .join("\n")
          .split("\n")
          .map((line) => line.replace(/^\d+\.\s*/, "").trim());
        setSongs(formattedSongs);
      } catch (err) {
        setError("Failed to fetch top 40 songs");
      }
    };

    fetchSongs();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {songs.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {songs.map((song, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-lg font-semibold text-white">
                {index + 1}. {song}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Loading top 40 songs...</p>
      )}
    </div>
  );
};

export default Top40Songs;
