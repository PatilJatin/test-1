// src/components/Birthdays.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirestore } from "@/utils/fetchDataFromFirestore";

const Birthdays: React.FC = () => {
  const [birthdays, setBirthdays] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const data = await fetchDataFromFirestore("birthdays");

        const birthdaysList = data
          .map((item) =>
            item.content
              .split("\n")
              .filter((birthday: string) => birthday.trim() !== "")
          )
          .flat();

        setBirthdays(birthdaysList);
      } catch (err) {
        console.error("Error fetching birthdays:", err);
        setError("Failed to fetch birthdays");
      }
    };

    fetchBirthdays();
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {birthdays.length > 0 ? (
        <ul className="space-y-2 mt-4">
          {birthdays.map((birthday, index) => (
            <li key={index} className="border-b pb-2">
              <p className="text-lg font-semibold text-white">{birthday}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">Loading birthdays...</p>
      )}
    </div>
  );
};

export default Birthdays;
