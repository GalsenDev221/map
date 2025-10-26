import { useState, useMemo, useEffect } from "react";
import { matchesSearch } from "@/utils/filterUtils";

interface Contributor {
  name: string;
  city: string;
  stack: string[];
  github: string;
  lat: number;
  lng: number;
}

interface FilterBarProps {
  contributors: Contributor[];
   filteredContributors: Contributor[];
  onFilterChange: (filtered: Contributor[]) => void;
}

export default function FilterBar({
  contributors,
  onFilterChange,
}: FilterBarProps) {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedStack, setSelectedStack] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Extract cities and stacks
  const cities = useMemo(() => {
    const citySet = new Set(contributors.map((c) => c.city));
    return ["all", ...Array.from(citySet).sort()];
  }, [contributors]);

  const stacks = useMemo(() => {
    const stackSet = new Set(contributors.flatMap((c) => c.stack));
    return ["all", ...Array.from(stackSet).sort()];
  }, [contributors]);

  const applyFilters = (city: string, stack: string, term: string) => {
    let filtered = contributors;

    if (city !== "all") {
      filtered = filtered.filter((c) => c.city === city);
    }

    if (stack !== "all") {
      filtered = filtered.filter((c) => c.stack.includes(stack));
    }
    if (term.trim() !== "") {
      filtered = filtered.filter((c) => matchesSearch(term, c));
    }
    onFilterChange(filtered);
  };

  useEffect(() => {
    applyFilters(selectedCity, selectedStack, searchTerm);
  }, [selectedCity, selectedStack, searchTerm]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    applyFilters(city, selectedStack, searchTerm);
  };

  const handleStackChange = (stack: string) => {
    setSelectedStack(stack);
    applyFilters(selectedCity, stack, searchTerm);
  };

  const handleSearchChange = (term: string) => setSearchTerm(term);

  const resetFilters = () => {
    setSelectedCity("all");
    setSelectedStack("all");
    setSearchTerm("");
    onFilterChange(contributors);
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCity !== "all" || selectedStack !== "all" || searchTerm.trim() !== "";

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
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-senegal-green hover:text-senegal-green/80 font-medium transition-colors"
          >
            Réinitialiser
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      {/* Barre de recherche */}
      <div className="mt-6 md:col-span-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rechercher un contributeur
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Ex : Fatou, MoussaDev, @github..."
            className="w-full pl-11 pr-5 py-3 text-[15px] bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-senegal-green focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Effacer la recherche"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Vous pouvez rechercher par nom, pseudo GitHub ou adresse complète.
        </p>
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
