import { useState, useMemo } from "react";

interface Contributor {
  id: number;
  name: string;
  city: string;
  stack: string[];
  github: string;
  lat: number;
  lng: number;
}

interface FilterBarProps {
  contributors: Contributor[];
  onFilterChange: (filtered: Contributor[]) => void;
  onAddProfile: () => void;
}

export default function FilterBar({
  contributors,
  onFilterChange,
  onAddProfile,
}: FilterBarProps) {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedStack, setSelectedStack] = useState<string>("all");

  // Extract cities and stacks
  const cities = useMemo(() => {
    const citySet = new Set(contributors.map((c) => c.city));
    return ["all", ...Array.from(citySet).sort()];
  }, [contributors]);

  const stacks = useMemo(() => {
    const stackSet = new Set(contributors.flatMap((c) => c.stack));
    return ["all", ...Array.from(stackSet).sort()];
  }, [contributors]);

  const applyFilters = (city: string, stack: string) => {
    let filtered = contributors;

    if (city !== "all") {
      filtered = filtered.filter((c) => c.city === city);
    }

    if (stack !== "all") {
      filtered = filtered.filter((c) => c.stack.includes(stack));
    }

    onFilterChange(filtered);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    applyFilters(city, selectedStack);
  };

  const handleStackChange = (stack: string) => {
    setSelectedStack(stack);
    applyFilters(selectedCity, stack);
  };

  const resetFilters = () => {
    setSelectedCity("all");
    setSelectedStack("all");
    onFilterChange(contributors);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filtres
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={resetFilters}
            className="text-sm text-senegal-green hover:text-senegal-green/80 font-medium transition-colors"
          >
            Réinitialiser
          </button>
          <button
            onClick={onAddProfile}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-senegal-green to-senegal-yellow text-white rounded-lg hover:from-senegal-green/90 hover:to-senegal-yellow/90 transition-all font-semibold shadow-lg"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Ajouter mon profil
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filter by city */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ville
          </label>
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent text-gray-900 dark:text-white"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city === "all" ? "Toutes les villes" : city}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by stack */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Stack / Technologie
          </label>
          <select
            value={selectedStack}
            onChange={(e) => handleStackChange(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent text-gray-900 dark:text-white"
          >
            {stacks.map((stack) => (
              <option key={stack} value={stack}>
                {stack === "all" ? "Toutes les technologies" : stack}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            {contributors.length}
          </span>{" "}
          contributeur{contributors.length > 1 ? "s" : ""} affiché
          {contributors.length > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
