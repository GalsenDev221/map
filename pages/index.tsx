import { useState } from "react";
import dynamic from "next/dynamic";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import contributorsData from "@/data/contributors.json";
import Footer from "@/components/Footer";
import InteractiveGrid from "@/components/InteractiveGrid";

// Dynamically import the Map component to avoid SSR errors with Leaflet
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">
        Chargement de la carte...
      </p>
    </div>
  ),
});

interface Contributor {
  name: string;
  city: string;
  stack: string[];
  github: string;
  lat: number;
  lng: number;
}

export default function Home() {
  const [filteredContributors, setFilteredContributors] =
    useState<Contributor[]>(contributorsData);

  return (
    <>
      <Header
        header="Galsen DEV Map - La carte des développeurs du Sénégal."
        description="Découvrez la communauté tech du Sénégal avec Galsen DEV Map."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />

        {/* Main Content */}
        <div className="relative">
          <InteractiveGrid
            className="text-gray-400 dark:text-gray-600"
            gridSize={60}
            opacity={0.12}
          />
          <main className="container mx-auto px-4 py-8 relative">
            {/* Hero Section */}
            <div className="text-center mb-8 relative overflow-hidden py-10 rounded-2xl">
              {/* Map-inspired SVG background */}
              <svg
                className="absolute inset-0 w-full h-full text-galsendev-blue"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 900 220"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                {/* Meridians — vertical lines */}
                {[90, 180, 270, 360, 450, 540, 630, 720, 810].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="220"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    opacity="0.12"
                  />
                ))}
                {/* Parallels — slightly curved horizontal lines (map projection feel) */}
                {[30, 70, 110, 150, 190].map((y, i) => (
                  <path
                    key={y}
                    d={`M 0 ${y} Q 225 ${y + (i % 2 === 0 ? -6 : 6)} 450 ${y} Q 675 ${y + (i % 2 === 0 ? 6 : -6)} 900 ${y}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    opacity="0.12"
                  />
                ))}
                {/* Corner coordinate ticks */}
                <line
                  x1="0"
                  y1="0"
                  x2="18"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.2"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.2"
                />
                <line
                  x1="900"
                  y1="0"
                  x2="882"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.2"
                />
                <line
                  x1="900"
                  y1="0"
                  x2="900"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.2"
                />
                <line
                  x1="0"
                  y1="220"
                  x2="18"
                  y2="220"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.2"
                />
                <line
                  x1="0"
                  y1="220"
                  x2="0"
                  y2="202"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.2"
                />
                <line
                  x1="900"
                  y1="220"
                  x2="882"
                  y2="220"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.2"
                />
                <line
                  x1="900"
                  y1="220"
                  x2="900"
                  y2="202"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.2"
                />
              </svg>

              <h2 className="text-4xl font-bold mb-3 relative">
                Bienvenue sur Galsen DEV Map 🗺️
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto relative">
                Découvrez les développeurs au Sénégal, de Dakar à Ziguinchor.
              </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
              contributors={contributorsData}
              filteredContributors={filteredContributors}
              onFilterChange={setFilteredContributors}
            />

            {/* Map */}
            <Map contributors={filteredContributors} />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700 animate-fade-in-up"
                style={{ animationDelay: "0ms" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-galsendev-blue/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-galsendev-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {contributorsData.length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Contributeurs
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700 animate-fade-in-up"
                style={{ animationDelay: "100ms" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-galsendev-blue/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-galsendev-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {new Set(contributorsData.map((c) => c.city)).size}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Villes
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700 animate-fade-in-up"
                style={{ animationDelay: "200ms" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-galsendev-blue/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-galsendev-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {new Set(contributorsData.flatMap((c) => c.stack)).size}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Technologies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-galsendev-blue to-galsendev-blue-dark rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Rejoins la communauté et ajoute-toi sur la carte !
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Contribue sur ce projet et connecte-toi avec d'autres devs.
              </p>
              <a
                href="https://github.com/GalsenDev221/map/blob/master/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Ajouter mon profil
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
