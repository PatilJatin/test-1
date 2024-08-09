// src/components/WeirdNews.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const WeirdNews: React.FC = () => {
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [story, setStory] = useState<string | null>(null);
  const [selectedHeadline, setSelectedHeadline] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const headlinesData = await fetchDataFromFirestore("weird_news");
        const headlinesList =
          headlinesData[0]?.content?.split("\n").filter(Boolean) || [];
        setHeadlines(headlinesList);
      } catch (err) {
        console.error("Error fetching weird news headlines:", err);
        setError("Failed to fetch weird news headlines");
      }
    };

    fetchHeadlines();
  }, []);

  const fetchStory = async (headline: string) => {
    try {
      const storyData = await fetchDataFromFirestore(
        "weird_news_story",
        headline
      );
      const storyContent =
        storyData[0]?.content || "No story found for the selected headline.";
      setStory(storyContent);
      setSelectedHeadline(headline);
    } catch (err) {
      console.error("Error fetching weird news story:", err);
      setError("Failed to fetch weird news story");
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const headline = event.target.value;
    fetchStory(headline);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white">Weird News</h2>
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
        <p className="text-white">Loading weird news headlines...</p>
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

export default WeirdNews;
