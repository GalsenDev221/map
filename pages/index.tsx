import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import contributorsData from "@/data/contributors.json";
import Footer from "@/components/Footer";

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
  const [isDark, setIsDark] = useState(false);

  // Theme toggle
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <Header
        header="Galsen DEV Map - La carte des développeurs du Sénégal."
        description="Découvrez la communauté tech du Sénégal avec Galsen DEV Map."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Galsen DEV Map
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Où sont les devs aux Sénégal ?
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-senegal-green dark:hover:text-senegal-yellow transition-colors font-medium"
                >
                  À propos
                </Link>

                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>

                <a
                  href="https://github.com/GalsenDev221/map"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Bienvenue sur Galsen DEV Map 🗺️
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Découvrez les développeurs au Sénégal, de Dakar à Ziguinchor.
            </p>
          </div>

          {/* Filter Bar */}
          <FilterBar
            contributors={contributorsData}
            onFilterChange={setFilteredContributors}
          />

          {/* Map */}
          <Map contributors={filteredContributors} />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-senegal-green/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-senegal-green"
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

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-senegal-yellow/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-senegal-yellow"
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

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-senegal-red/10 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-senegal-red"
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
          <div className="mt-12 bg-gradient-to-r from-senegal-green via-senegal-yellow to-senegal-red rounded-lg p-8 text-center">
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

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
