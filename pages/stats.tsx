import { useMemo } from "react";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveGrid from "@/components/InteractiveGrid";
import contributorsData from "@/data/contributors.json";

interface Contributor {
  name: string;
  city: string;
  stack: string[];
  github: string;
  lat: number;
  lng: number;
}

const contributors = contributorsData as Contributor[];

// BarChart SVG component — no external lib
function BarChart({
  items,
  color = "#5271ff",
}: {
  items: { label: string; value: number }[];
  color?: string;
}) {
  const max = items[0]?.value ?? 1;
  const rowH = 32;
  const paddingLeft = 130;
  const barMaxW = 300;
  const textRight = 30;
  const h = items.length * rowH + 10;

  return (
    <svg
      viewBox={`0 0 ${paddingLeft + barMaxW + textRight} ${h}`}
      className="w-full max-w-lg"
      aria-label="Bar chart"
    >
      {items.map(({ label, value }, i) => (
        <g key={label} transform={`translate(0, ${i * rowH + 5})`}>
          <text
            x={paddingLeft - 8}
            y={rowH / 2}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize="12"
            fill="currentColor"
            opacity={0.7}
          >
            {label}
          </text>
          <rect
            x={paddingLeft}
            y={4}
            height={rowH - 10}
            width={(value / max) * barMaxW}
            fill={color}
            opacity={Math.max(0.4, 1 - i * 0.05)}
            rx="3"
          />
          <text
            x={paddingLeft + (value / max) * barMaxW + 6}
            y={rowH / 2}
            dominantBaseline="middle"
            fontSize="11"
            fill="currentColor"
            opacity={0.6}
          >
            {value}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function Stats() {
  // ── Computed metrics ──────────────────────────────────────────────
  const totalContributors = contributors.length;

  const uniqueCities = useMemo(
    () => new Set(contributors.map((c) => c.city)).size,
    []
  );

  const uniqueTechs = useMemo(
    () => new Set(contributors.flatMap((c) => c.stack)).size,
    []
  );

  const avgStack = useMemo(() => {
    const total = contributors.reduce((sum, c) => sum + c.stack.length, 0);
    return (total / contributors.length).toFixed(1);
  }, []);

  // Top 10 technologies by frequency
  const topTechs = useMemo(() => {
    const freq: Record<string, number> = {};
    contributors.forEach((c) =>
      c.stack.forEach((t) => {
        freq[t] = (freq[t] ?? 0) + 1;
      })
    );
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([label, value]) => ({ label, value }));
  }, []);

  // City distribution sorted descending
  const cityDist = useMemo(() => {
    const freq: Record<string, number> = {};
    contributors.forEach((c) => {
      freq[c.city] = (freq[c.city] ?? 0) + 1;
    });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({ label, value }));
  }, []);

  // Top 6 tech pair co-occurrences
  const topPairs = useMemo(() => {
    const pairCount: Record<string, number> = {};
    contributors.forEach((c) => {
      const stack = c.stack;
      for (let i = 0; i < stack.length; i++) {
        for (let j = i + 1; j < stack.length; j++) {
          const key = [stack[i], stack[j]].sort().join(" + ");
          pairCount[key] = (pairCount[key] ?? 0) + 1;
        }
      }
    });
    return Object.entries(pairCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([pair, count]) => {
        const [techA, techB] = pair.split(" + ");
        return [techA, techB, count] as [string, string, number];
      });
  }, []);

  // ─────────────────────────────────────────────────────────────────

  const metricCards = [
    {
      label: "Contributeurs",
      value: totalContributors,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      ),
      delay: "0ms",
    },
    {
      label: "Villes",
      value: uniqueCities,
      icon: (
        <>
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
        </>
      ),
      delay: "100ms",
    },
    {
      label: "Technologies",
      value: uniqueTechs,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      ),
      delay: "200ms",
    },
    {
      label: "Technologies en moyenne",
      value: avgStack,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      ),
      delay: "300ms",
    },
  ];

  return (
    <>
      <Header
        header="Statistiques - Galsen DEV Map"
        description="Statistiques détaillées sur les développeurs, villes et technologies de la communauté Galsen DEV."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />

        {/* Main content with interactive grid */}
        <div className="relative">
          <InteractiveGrid
            className="text-gray-400 dark:text-gray-600"
            gridSize={60}
            opacity={0.12}
          />
          <main className="container mx-auto px-4 py-8 relative">
            {/* Hero */}
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-galsendev-blue via-galsendev-blue-light to-galsendev-blue-dark">
                Statistiques
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Un aperçu chiffré de la communauté tech sénégalaise.
              </p>
            </div>

            {/* 4 metric cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {metricCards.map(({ label, value, icon, delay }) => (
                <div
                  key={label}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700 animate-fade-in-up"
                  style={{ animationDelay: delay }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-galsendev-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-galsendev-blue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top 10 technologies */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Top 10 technologies
              </h3>
              <BarChart items={topTechs} color="#5271ff" />
            </section>

            {/* City distribution */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-100 dark:border-gray-700 mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Répartition par ville
              </h3>
              <BarChart items={cityDist} color="#293980" />
            </section>

            {/* Frequent tech pairs */}
            <section className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Combinaisons fréquentes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topPairs.map(([techA, techB, count]) => (
                  <div
                    key={`${techA}+${techB}`}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-galsendev-blue/10 text-galsendev-blue rounded text-sm font-medium">
                        {techA}
                      </span>
                      <span className="text-gray-400">+</span>
                      <span className="px-2 py-1 bg-galsendev-blue/10 text-galsendev-blue rounded text-sm font-medium">
                        {techB}
                      </span>
                    </div>
                    <span className="font-bold text-gray-700 dark:text-gray-300 ml-2 flex-shrink-0">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}
