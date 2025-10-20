export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            Fait avec ❤️ par la communauté{" "}
            <a
              href="https://galsen.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-senegal-green"
            >
              Galsen DEV
            </a>
          </p>
          <p className="text-sm">Hacktoberfest 2025</p>
        </div>
      </div>
    </footer>
  );
}
