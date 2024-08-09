// src/components/PublicHolidays.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const PublicHolidays: React.FC = () => {
  const [holidays, setHolidays] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublicHolidays = async () => {
      try {
        const data = await fetchDataFromFirestore("public_holidays");

        const holidaysList = data
          .map((item) =>
            item.content
              .split("\n")
              .filter((holiday: string) => holiday.trim() !== "")
          )
          .flat();

        setHolidays(holidaysList);
      } catch (err) {
        console.error("Error fetching public holidays:", err);
        setError("Failed to fetch public holidays");
      }
    };

    fetchPublicHolidays();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {holidays.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {holidays.map((holiday, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-lg font-semibold text-white">{holiday}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Loading public holidays...</p>
      )}
    </div>
  );
};

export default PublicHolidays;
