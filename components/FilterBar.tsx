import { useState, useMemo, useEffect } from "react";

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
  filteredContributors,
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

  useEffect(() => {
    const applyFilters = () => {
      let filtered = contributors;

      // Filter by city
      if (selectedCity !== "all") {
        filtered = filtered.filter((c) => c.city === selectedCity);
      }

      // Filter by stack
      if (selectedStack !== "all") {
        filtered = filtered.filter((c) => c.stack.includes(selectedStack));
      }

      // Filter by search term
      if (searchTerm.trim() !== "") {
        filtered = filtered.filter((c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      onFilterChange(filtered);
    };

    applyFilters();
  }, [selectedCity, selectedStack, searchTerm, contributors, onFilterChange]);

  const resetFilters = () => {
    setSelectedCity("all");
    setSelectedStack("all");
    setSearchTerm("");
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
        <button
          onClick={resetFilters}
          className="text-sm text-senegal-green hover:text-senegal-green/80 font-medium transition-colors"
        >
          Réinitialiser
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search by name or github username */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Nom / Pseudo GitHub
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un nom ou un pseudo GitHub ..."
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent text-gray-900 dark:text-white"
          />
        </div>

        {/* Filter by city */}
        <div>
          <label
            htmlFor="city-filter"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Ville
          </label>
          <select
            id="city-filter"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
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
          <label
            htmlFor="stack-filter"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Stack / Technologie
          </label>
          <select
            id="stack-filter"
            value={selectedStack}
            onChange={(e) => setSelectedStack(e.target.value)}
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
        {filteredContributors.length > 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredContributors.length}
            </span>{" "}
            contributeur{filteredContributors.length > 1 ? "s" : ""} trouvé
            {filteredContributors.length > 1 ? "s" : ""}
          </p>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Aucun résultat trouvé.
          </p>
        )}
      </div>
    </div>
  );
}
