// src/app/showprep/page.tsx
"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrendingVideos from "@/components/TrendingVideos"; // Add TrendingVideos
import Top40Songs from "@/components/Top40Songs";
import ImpossibleTrivia from "@/components/ImpossibleTrivia";
import TodayInHistory from "@/components/TodayInHistory";
import Birthdays from "@/components/Birthdays";
import PhoneTopics from "@/components/PhoneTopics";
import PublicHolidays from "@/components/PublicHolidays";
import BillboardHot100 from "@/components/BillboardHot100";
import NewMusic from "@/components/NewMusic";
import WouldYouRather from "@/components/WouldYouRather";
import GuessTheMovieQuote from "@/components/GuessTheMovieQuote";
import OurStudySays from "@/components/OurStudySays";
import WeeklyBoxOfficeCharts from "@/components/WeeklyBoxOfficeCharts";
import Flashback from "@/components/Flashback";
import Entertainment from "@/components/Entertainment";
import dynamic from "next/dynamic";
import ProtectedRoute from "@/components/ProtectedRoute";
import WeirdNews from "@/components/WeirdNews";

// Dynamically import the GeneratePDF component to ensure it is only loaded on the client-side
// const GeneratePDF = dynamic(() => import("@/components/GeneratePDF"), {
//   ssr: false,
// });

const ShowPrepPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <Hero />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-white">
          <h2 className="text-2xl font-semibold text-white">Main Content</h2>
          <p className="mt-4 text-white">
            This is where the main content of the ShowPrep will go. You can
            include various sections, articles, and interactive components as
            needed.
          </p>

          {/* Interactive Components */}

          <div className="mt-10">
            <h3 className="text-xl font-semibold text-white">
              Trending TikTok Videos
            </h3>
            <p className="text-white">
              Check out the latest trending TikTok videos that can inspire your
              next show segment.
            </p>
            <TrendingVideos />
          </div>

          {/* Additional Content Sections */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-white">
              Today's Top 40 Songs
            </h3>
            <p className="text-white">
              Discover the latest hits in today's top 40 songs and keep your
              audience updated with the most popular tracks.
            </p>
            <Top40Songs />
          </div>
          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Billboard Hot 100</h2>
            <p className="mt-2 text-gray-400">
              Check out the top 3 songs from the Billboard Hot 100 chart for
              this week.
            </p>
            <BillboardHot100 />
          </section>
          <section className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-100">
              Impossible Trivia
            </h3>
            <p className="mt-2 text-gray-400">
              Get some interesting and challenging trivia questions to engage
              your audience. Perfect for sparking conversations and adding fun
              to your show.
            </p>
            <ImpossibleTrivia />
          </section>

          <section className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-100">
              Today In History
            </h3>
            <p className="mt-2 text-gray-400">
              Discover historical events that happened on this day. Perfect for
              adding some historical context to your show.
            </p>
            <TodayInHistory />
          </section>
          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Famous Birthdays</h2>
            <p className="mt-2 text-gray-400">
              Discover the famous personalities who will be celebrating their
              birthdays tomorrow.
            </p>
            <Birthdays />
          </section>
          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Phone Topics</h2>
            <p className="mt-2 text-gray-400">
              Engage your audience with interesting and inspiring conversation
              topics. Encourage your listeners to call in and share their
              thoughts.
            </p>
            <PhoneTopics />
          </section>

          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Public Holidays</h2>
            <p className="mt-2 text-gray-400">
              Discover public and funny holidays celebrated around the world
              tomorrow.
            </p>
            <PublicHolidays />
          </section>
          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">
              New Music Releases
            </h2>
            <p className="mt-2 text-gray-400">
              Discover the trending new music releases of today.
            </p>
            <NewMusic />
          </section>
          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">WEIRD NEWS</h2>
            <p className="mt-2 text-gray-400">Discover the WEIRD NEWS .</p>
            <WeirdNews />
          </section>
          <section className=" mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Would You Rather?</h2>
            <p className="mt-2 text-gray-400">
              Get your listeners engaged with fun and creative 'Would You
              Rather?' questions.
            </p>
            <WouldYouRather />
          </section>
          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">
              Guess the Movie Quote
            </h2>
            <p className="mt-2 text-gray-400">
              Test your movie knowledge with famous quotes from movies from the
              past 30 years. Can you guess the movie?
            </p>
            <GuessTheMovieQuote />
          </section>
          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">Our Study Says</h2>
            <p className="mt-2 text-gray-400">
              Read about interesting and funny study results. See what the
              studies reveal about people's behaviors and habits.
            </p>
            <OurStudySays />
          </section>
          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">
              Weekly Box Office Charts
            </h2>
            <p className="mt-2 text-gray-400">
              Discover the most watched movies and TV shows this week.
            </p>
            <WeeklyBoxOfficeCharts />
          </section>
          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">AI Flashback</h2>
            <p className="mt-2 text-gray-400">
              Enjoy a short talk break about a popular song from the Billboard
              Top 100 chart from a random year between 1980 and 2024.
            </p>
            <Flashback />
          </section>
          <section className="mt-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white">
              Entertainment Headlines
            </h2>
            <p className="mt-2 text-gray-400">
              Stay updated with the latest entertainment headlines and stories.
            </p>
            <Entertainment />
          </section>
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-white">Generate PDF</h3>
            <p className="text-white">
              Click the button below to generate a PDF document with the latest
              show prep information.
            </p>
            {/* <GeneratePDF /> */}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ShowPrepPage;
