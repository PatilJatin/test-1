// src/components/GuessTheMovieQuote.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const GuessTheMovieQuote: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieQuote = async () => {
      try {
        const data = await fetchDataFromFirestore("guess_the_movie_quote");

        if (data.length > 0) {
          setQuote(data[0].content);
        } else {
          setError("No movie quote found");
        }
      } catch (err) {
        console.error("Error fetching movie quote:", err);
        setError("Failed to fetch movie quote");
      }
    };

    fetchMovieQuote();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {quote ? (
        <p className="text-lg font-semibold text-white mt-4">{quote}</p>
      ) : (
        <p className="text-white">Loading movie quote...</p>
      )}
    </div>
  );
};

export default GuessTheMovieQuote;
