import { useState, useMemo } from "react";

interface Contributor {
  name: string;
  city: string;
  stack: string[];
  github: string;
  lat: number;
  lng: number;
}

interface FilterBarProps {
  allContributors: Contributor[];
  filteredCount: number;
  onFilterChange: (filtered: Contributor[]) => void;
}

export default function FilterBar({
  allContributors,
  filteredCount,
  onFilterChange,
}: FilterBarProps) {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedStack, setSelectedStack] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Extract cities and stacks
  const cities = useMemo(() => {
    const citySet = new Set(allContributors.map((c) => c.city));
    return ["all", ...Array.from(citySet).sort()];
  }, [allContributors]);

  const stacks = useMemo(() => {
    const stackSet = new Set(allContributors.flatMap((c) => c.stack));
    return ["all", ...Array.from(stackSet).sort()];
  }, [allContributors]);

  const applyFilters = (city: string, stack: string, search: string) => {
    let filtered = allContributors;

    if (city !== "all") {
      filtered = filtered.filter((c) => c.city === city);
    }
    if (stack !== "all") {
      filtered = filtered.filter((c) => c.stack.includes(stack));
    }
    if (search.trim() !== "") {
      const lowercasedSearch = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(lowercasedSearch) ||
          c.github.toLowerCase().includes(lowercasedSearch)
      );
    }
    onFilterChange(filtered);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    applyFilters(city, selectedStack, searchTerm);
  };

  const handleStackChange = (stack: string) => {
    setSelectedStack(stack);
    applyFilters(selectedCity, stack, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    applyFilters(selectedCity, selectedStack, e.target.value);
  };

  const resetFilters = () => {
    setSelectedCity("all");
    setSelectedStack("all");
    setSearchTerm("");
    onFilterChange(allContributors);
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
            htmlFor="search-contributor"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Nom / Pseudo Github
          </label>
          <input
            id="search-contributor"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher par nom ou pseudo github..."
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
          <label
            htmlFor="stack-filter"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Stack / Technologie
          </label>
          <select
            id="stack-filter"
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
        {filteredCount > 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredCount}
            </span>{" "}
            contributeur{filteredCount > 1 ? "s" : ""} affiché
            {filteredCount > 1 ? "s" : ""}
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
