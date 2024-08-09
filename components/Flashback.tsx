// src/components/AIFlashback.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const AIFlashback: React.FC = () => {
  const [flashback, setFlashback] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAIFlashback = async () => {
      try {
        const data = await fetchDataFromFirestore("ai_flashback");

        if (data.length > 0) {
          setFlashback(data[0].content);
        } else {
          setError("No AI flashback found");
        }
      } catch (err) {
        console.error("Error fetching AI flashback:", err);
        setError("Failed to fetch AI flashback");
      }
    };

    fetchAIFlashback();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {flashback ? (
        <div className="space-y-2 mt-4">
          <p className="text-lg font-semibold text-white">{flashback}</p>
        </div>
      ) : (
        <p className="text-white">Loading AI flashback...</p>
      )}
    </div>
  );
};

export default AIFlashback;
