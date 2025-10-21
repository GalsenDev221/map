import { getStackIcon } from "@/lib/stackIcons";

interface StackIconProps {
  tech: string;
  size?: number;
  showLabel?: boolean;
  theme?: "light" | "dark";
}

export default function StackIcon({
  tech,
  size = 20,
  showLabel = true,
  theme = "light",
}: StackIconProps) {
  const stackIcon = getStackIcon(tech);

  // Détermine l'URL en fonction du thème si l'icône supporte dark/light
  const iconUrl =
    typeof stackIcon.svglUrl === "string"
      ? stackIcon.svglUrl
      : stackIcon.svglUrl[theme];

  return (
    <div className="flex items-center gap-1.5">
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <img
          src={iconUrl}
          alt={`${tech} icon`}
          width={size}
          height={size}
          className="object-contain"
          loading="lazy"
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium whitespace-nowrap">{tech}</span>
      )}
    </div>
  );
}
