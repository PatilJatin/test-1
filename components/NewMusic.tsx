// src/components/NewMusic.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const NewMusic: React.FC = () => {
  const [songs, setSongs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewMusic = async () => {
      try {
        const data = await fetchDataFromFirestore("new_music");

        const songsList = data
          .map((item) =>
            item.content
              .split("\n")
              .filter((song: string) => song.trim() !== "")
          )
          .flat();

        setSongs(songsList);
      } catch (err) {
        console.error("Error fetching new music releases:", err);
        setError("Failed to fetch new music releases");
      }
    };

    fetchNewMusic();
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
        <p className="text-white">Loading new music releases...</p>
      )}
    </div>
  );
};

export default NewMusic;
