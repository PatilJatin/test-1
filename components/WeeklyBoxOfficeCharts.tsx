// src/components/WeeklyBoxOfficeCharts.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const WeeklyBoxOfficeCharts: React.FC = () => {
  const [charts, setCharts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const data = await fetchDataFromFirestore("weekly_box_office");

        if (data.length > 0) {
          setCharts(data[0].content.split("\n").filter(Boolean));
        } else {
          setError("No box office charts found");
        }
      } catch (err) {
        console.error("Error fetching box office charts:", err);
        setError("Failed to fetch box office charts");
      }
    };

    fetchCharts();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {charts.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {charts.map((chart, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-lg font-semibold text-white">{chart}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Loading box office charts...</p>
      )}
    </div>
  );
};

export default WeeklyBoxOfficeCharts;
