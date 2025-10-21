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
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700">
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
            key={contributor.name}
            position={[contributor.lat, contributor.lng]}
          >
            <Popup>
              <ContributorCard contributor={contributor} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
