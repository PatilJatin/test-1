// src/components/ImpossibleTrivia.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const ImpossibleTrivia: React.FC = () => {
  const [trivia, setTrivia] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const data = await fetchDataFromFirestore("impossible_trivia");

        const triviaList = data
          .map((item) =>
            item.content
              .split("\n")
              .filter((item: string) => item.trim() !== "")
          )
          .flat();

        setTrivia(triviaList);
      } catch (err) {
        console.error("Error fetching trivia:", err);
        setError("Failed to fetch trivia");
      }
    };

    fetchTrivia();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {trivia.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {trivia.map((item, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-lg font-semibold text-white">{item}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Loading trivia...</p>
      )}
    </div>
  );
};

export default ImpossibleTrivia;
