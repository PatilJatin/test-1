// src/components/Entertainment.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const Entertainment: React.FC = () => {
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [story, setStory] = useState<string | null>(null);
  const [selectedHeadline, setSelectedHeadline] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await fetchDataFromFirestore(
          "entertainment_headlines"
        );
        if (response.length > 0) {
          const headlineList = response[0].content.split("\n").filter(Boolean);
          setHeadlines(headlineList);
        } else {
          setError("No entertainment headlines found");
        }
      } catch (err) {
        setError("Failed to fetch entertainment headlines");
      }
    };

    fetchHeadlines();
  }, []);

  const fetchStory = async (headline: string) => {
    try {
      const response = await fetchDataFromFirestore(
        "entertainment_story",
        headline
      );
      if (response.length > 0) {
        setStory(response[0].content);
      } else {
        setStory(null);
        setError("No story found for the selected headline");
      }
      setSelectedHeadline(headline);
    } catch (err) {
      setError("Failed to fetch entertainment story");
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const headline = event.target.value;
    console.log(headline);

    fetchStory(headline);
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {headlines.length > 0 ? (
        <div className="mt-4">
          <select
            className="bg-gray-900 text-white border border-gray-700 p-2 rounded"
            onChange={handleSelectChange}
            defaultValue=""
          >
            <option value="" disabled>
              Select a headline
            </option>
            {headlines.map((headline, index) => (
              <option key={index} value={headline}>
                {headline}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="text-white">Loading entertainment headlines...</p>
      )}
      {story && selectedHeadline && (
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <h3 className="text-xl font-semibold text-white">
            {selectedHeadline}
          </h3>
          <p className="text-white">{story}</p>
        </div>
      )}
    </div>
  );
};

export default Entertainment;
