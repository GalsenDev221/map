import { useState } from "react";
import citiesData from "@/data/cities.json";

interface City {
  name: string;
  lat: number;
  lng: number;
}

interface ContributorFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ContributorForm({
  onClose,
  onSuccess,
}: ContributorFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    stack: "",
    github: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate form
      if (!formData.name.trim()) {
        throw new Error("Le nom est requis");
      }
      if (!formData.city) {
        throw new Error("La ville est requise");
      }
      if (!formData.stack.trim()) {
        throw new Error("La stack technique est requise");
      }
      if (!formData.github.trim()) {
        throw new Error("Le lien GitHub est requis");
      }

      // Validate GitHub URL
      const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/?$/;
      if (!githubRegex.test(formData.github)) {
        throw new Error(
          "Le lien GitHub doit être au format https://github.com/username"
        );
      }

      // Find city coordinates
      const selectedCity = citiesData.find(
        (city: City) => city.name === formData.city
      );
      if (!selectedCity) {
        throw new Error("Ville invalide");
      }

      // Prepare data
      const contributorData = {
        name: formData.name.trim(),
        city: formData.city,
        stack: formData.stack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        github: formData.github.trim(),
        lat: selectedCity.lat,
        lng: selectedCity.lng,
      };

      // Submit to API
      const response = await fetch("/api/add-contributor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contributorData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'ajout du profil");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ajouter mon profil
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
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
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 text-red-700 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: Jean Dupont"
                required
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Ville *
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Sélectionner une ville</option>
                {citiesData.map((city: City) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="stack"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Stack technique * (séparées par des virgules)
              </label>
              <input
                type="text"
                id="stack"
                name="stack"
                value={formData.stack}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: React, Node.js, TypeScript"
                required
              />
            </div>

            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Profil GitHub *
              </label>
              <input
                type="url"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://github.com/username"
                required
              />
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-2">
                <strong>Note importante :</strong> Pour des raisons de
                confidentialité, seules les coordonnées du centre-ville sont
                utilisées.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-senegal-green text-white rounded-lg hover:bg-senegal-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Ajout en cours..." : "Ajouter mon profil"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
