import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Header
        header="À propos - Galsen DEV Map"
        description="En savoir plus sur Galsen DEV Map."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Galsen DEV Map
                  </h1>
                </div>
              </Link>

              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-senegal-green dark:hover:text-senegal-yellow transition-colors font-medium"
              >
                ← Retour à la carte
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              À propos de Galsen DEV Map 🗺️
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              La communauté, cartographiée et accessible à tous.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Mission */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-senegal-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-senegal-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Notre Mission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Galsen DEV Map est un projet open source né de la volonté de
                    rendre visible la richesse et la diversité de la communauté
                    tech sénégalaise. Nous croyons que chaque développeur, quel
                    que soit sa ville ou sa stack, mérite d'être reconnu et
                    connecté avec ses pairs. Ce projet vise à briser
                    l'isolement, favoriser les collaborations et inspirer la
                    prochaine génération de développeurs.
                  </p>
                </div>
              </div>
            </section>

            {/* What is it */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-senegal-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-senegal-yellow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    C'est quoi exactement ?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Galsen DEV Map est une carte interactive qui recense les
                    développeurs et communautés tech à travers tout le Sénégal.
                    Chaque point sur la carte représente un développeur avec son
                    profil, sa stack technique et sa ville.
                  </p>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-senegal-green mt-1">✓</span>
                      <span>
                        Découvre les devs de ta région ou d'ailleurs au Sénégal
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-senegal-green mt-1">✓</span>
                      <span>Filtre par ville ou par technologie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-senegal-green mt-1">✓</span>
                      <span>Connecte-toi directement via GitHub</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-senegal-green mt-1">✓</span>
                      <span>Ajoute ton propre profil facilement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How to contribute */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-senegal-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-senegal-red"
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
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Comment contribuer ?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    Ce projet est 100% open source et accueille toutes les
                    contributions ! Voici comment tu peux participer :
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        1. Ajoute ton profil
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Fork le repo, crée un fichier JSON (avec comme nom votre
                        "username_github") dans le dossier{" "}
                        <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                          data/contributors
                        </code>{" "}
                        et ajoute tes informations dans le fichier créé. Crée
                        une pull request et c'est tout !
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        2. Améliore le code
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Tu as des idées de features ? Des bugs à corriger ?
                        Consulte les issues sur GitHub et propose tes
                        améliorations.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        3. Partage le projet
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Parle de Galsen DEV Map autour de toi, dans les meetups,
                        sur les réseaux. Plus on est nombreux, plus la carte
                        prend vie !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Community */}
            <section className="bg-gradient-to-r from-senegal-green via-senegal-yellow to-senegal-red rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white/90 mb-3">
                Rejoins la communauté Galsen DEV
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Galsen DEV Map fait partie de l'écosystème Galsen DEV, une
                communauté dynamique de développeurs sénégalais passionnés.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://github.com/GalsenDev221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Voir sur GitHub
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur text-white rounded-lg hover:bg-white/20 transition-colors font-semibold border-2 border-white"
                >
                  Retour à la carte
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
