// src/components/TodayInHistory.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const TodayInHistory: React.FC = () => {
  const [events, setEvents] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodayInHistory = async () => {
      try {
        const data = await fetchDataFromFirestore("today_in_history");

        const eventsList = data
          .map((item) =>
            item.content
              .split("\n")
              .filter((event: string) => event.trim() !== "")
          )
          .flat();

        setEvents(eventsList);
      } catch (err) {
        console.error("Error fetching historical events:", err);
        setError("Failed to fetch historical events");
      }
    };

    fetchTodayInHistory();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {events.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {events.map((event, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-lg font-semibold text-white">{event}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Loading historical events...</p>
      )}
    </div>
  );
};

export default TodayInHistory;
