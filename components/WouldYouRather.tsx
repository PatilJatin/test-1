// src/components/WouldYouRather.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const WouldYouRather: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWouldYouRather = async () => {
      try {
        const data = await fetchDataFromFirestore("would_you_rather");

        if (data.length > 0) {
          setQuestion(data[0].content);
        } else {
          setError("No 'Would You Rather?' question found");
        }
      } catch (err) {
        console.error("Error fetching 'Would You Rather?' question:", err);
        setError("Failed to fetch 'Would You Rather?' question");
      }
    };

    fetchWouldYouRather();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {question ? (
        <p className="text-lg font-semibold text-white mt-4">{question}</p>
      ) : (
        <p className="text-white">Loading 'Would You Rather?' question...</p>
      )}
    </div>
  );
};

export default WouldYouRather;
