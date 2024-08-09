// src/components/PhoneTopics.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const PhoneTopics: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoneTopics = async () => {
      try {
        const data = await fetchDataFromFirestore("phone_topics");

        const topicsList = data
          .map((item) =>
            item.content
              .split("\n")
              .filter((topic: string) => topic.trim() !== "")
          )
          .flat();

        setTopics(topicsList);
      } catch (err) {
        console.error("Error fetching phone topics:", err);
        setError("Failed to fetch phone topics");
      }
    };

    fetchPhoneTopics();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {topics.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {topics.map((topic, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-lg font-semibold text-white">{topic}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Loading phone topics...</p>
      )}
    </div>
  );
};

export default PhoneTopics;
