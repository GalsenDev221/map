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
    bio: "",
    linkedin: "",
    portfolio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

      // Validate optional URLs
      if (
        formData.linkedin &&
        !formData.linkedin.match(
          /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/
        )
      ) {
        throw new Error(
          "Le lien LinkedIn doit être au format https://linkedin.com/in/username"
        );
      }
      if (formData.portfolio && !formData.portfolio.match(/^https?:\/\/.+/)) {
        throw new Error("Le portfolio doit être une URL valide");
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
        bio: formData.bio.trim() || undefined,
        linkedin: formData.linkedin.trim() || undefined,
        portfolio: formData.portfolio.trim() || undefined,
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

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
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

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Profil ajouté avec succès !
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Votre profil apparaîtra bientôt sur la carte. Merci d'avoir
              rejoint la communauté !
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-senegal-green text-white rounded-lg hover:bg-senegal-green/90 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Rejoignez la communauté
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Ajoutez votre profil sur la carte des développeurs sénégalais
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-red-800 dark:text-red-200 font-medium">
                  {error}
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="Ex: Jean Dupont"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Ville *
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
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
            </div>

            {/* Stack technique */}
            <div>
              <label
                htmlFor="stack"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Stack technique *
              </label>
              <input
                type="text"
                id="stack"
                name="stack"
                value={formData.stack}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                placeholder="Ex: React, Node.js, TypeScript, Python"
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Séparez les technologies par des virgules
              </p>
            </div>

            {/* Liens */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Liens et réseaux
              </h3>

              <div>
                <label
                  htmlFor="github"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Profil GitHub *
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="https://github.com/username"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    LinkedIn (optionnel)
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="portfolio"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Portfolio (optionnel)
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="https://monsite.com"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Bio (optionnel)
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-senegal-green focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                placeholder="Parlez-nous un peu de vous, vos intérêts, vos projets..."
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formData.bio.length}/200 caractères
              </p>
            </div>

            {/* Note de confidentialité */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Confidentialité et sécurité
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Pour protéger votre vie privée, seules les coordonnées du
                    centre-ville sont utilisées. Vos informations personnelles
                    exactes ne seront jamais partagées publiquement.
                  </p>
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-senegal-green to-senegal-yellow text-white rounded-lg hover:from-senegal-green/90 hover:to-senegal-yellow/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Ajout en cours...
                  </div>
                ) : (
                  "Ajouter mon profil"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
