// src/components/OurStudySays.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const OurStudySays: React.FC = () => {
  const [studies, setStudies] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const data = await fetchDataFromFirestore("our_study_says");

        if (data.length > 0) {
          setStudies(data[0].content.split("\n").filter(Boolean));
        } else {
          setError("No study results found");
        }
      } catch (err) {
        console.error("Error fetching study results:", err);
        setError("Failed to fetch study results");
      }
    };

    fetchStudies();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {studies.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {studies.map((study, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-lg font-semibold text-white">{study}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Loading study results...</p>
      )}
    </div>
  );
};

export default OurStudySays;
