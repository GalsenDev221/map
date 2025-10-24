import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import ContributorCard from "./ContributorCard";

// Add Leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface Contributor {
  name: string;
  city: string;
  stack: string[];
  github: string;
  lat: number;
  lng: number;
}

interface MapProps {
  contributors: Contributor[];
}

export default function Map({ contributors }: MapProps) {
  // Get GitHub username from URL
  const getGithubUsername = (url: string) => url.split("/").pop() || url;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[600px] bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          Chargement de la carte...
        </p>
      </div>
    );
  }

  const center: [number, number] = [14.4974, -14.4524];

  return (
    <div className=" relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {contributors.map((contributor) => (
          <Marker
            key={getGithubUsername(contributor.github)}
            position={[contributor.lat, contributor.lng]}
          >
            <Popup>
              <ContributorCard contributor={contributor} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {contributors.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-[1000] bg-gradient-to-br from-white/85 to-gray-100/70 dark:from-gray-900/80 dark:to-gray-800/70 backdrop-blur-md animate-fadeIn">
          {/* Icône illustrative */}
          <svg
            className="w-16 h-16 text-senegal-yellow mb-5 opacity-90 drop-shadow-md"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M9 13h6m-3-8a9 9 0 100 18 9 9 0 000-18z"
            />
          </svg>

          {/* Texte principal */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 tracking-wide">
            Aucun résultat trouvé
          </h3>
          <p className="text-base text-gray-700 dark:text-gray-300 max-w-md leading-relaxed mb-6">
            Aucun contributeur ne correspond à vos critères de recherche.
            <br className="hidden sm:block" />
            Essayez d’ajuster vos filtres ou de réinitialiser la recherche.
          </p>

          {/* Bouton d’action */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-senegal-green text-white font-medium rounded-lg shadow-md hover:bg-senegal-green/90 hover:scale-[1.02] transition-transform duration-200"
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
                d="M4 4v6h6M20 20v-6h-6M4 10a9 9 0 0116 0M20 14a9 9 0 01-16 0"
              />
            </svg>
            Réinitialiser les filtres
          </button>
        </div>
      )}

    </div>
  );
}
