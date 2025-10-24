export type Contributor = {
  name: string;
  github: string;
  city: string;
  stack: string[];
};

/**
 * Fonction de recherche intelligente :
 * - Ignore les accents
 * - Ignore la casse
 * - Supprime le symbole @
 * - Cherche dans name, github username et URL complète
 */
export function matchesSearch(term: string, contributor: Contributor): boolean {
  const normalize = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // retire les accents

  const lower = normalize(term.toLowerCase().replace("@", ""));

  const name = normalize(contributor.name.toLowerCase());
  const githubUrl = normalize(contributor.github.toLowerCase());
  const githubUser = normalize(
    contributor.github.split("/").pop()?.toLowerCase() || ""
  );

  return (
    name.includes(lower) ||
    githubUser.includes(lower) ||
    githubUrl.includes(lower)
  );
}
