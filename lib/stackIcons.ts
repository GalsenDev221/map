const SVGL_API_URL = process.env.NEXT_PUBLIC_SVGL_API_URL || "https://svgl.app";

export type ThemeOptions = {
  dark: string;
  light: string;
};

export interface SVG {
  id: number;
  title: string;
  category: string | string[];
  route: string | ThemeOptions;
  url: string;
  wordmark?: string | ThemeOptions;
  brandUrl?: string;
}

export interface StackIconConfig {
  title: string; // Nom exact dans SVGL API
  svglUrl: string | ThemeOptions; // URL de l'icône depuis SVGL (peut supporter dark/light)
}

// Mapping des technologies vers leurs icônes SVGL
export const stackIconMap: Record<string, StackIconConfig> = {
  // Frontend Frameworks
  React: {
    title: "React",
    svglUrl: {
      dark: `${SVGL_API_URL}/library/react_dark.svg`,
      light: `${SVGL_API_URL}/library/react_light.svg`,
    },
  },
  "Next.js": {
    title: "Next.js",
    svglUrl: `${SVGL_API_URL}/library/nextjs_icon_dark.svg`,
  },
  Vue: {
    title: "Vue",
    svglUrl: `${SVGL_API_URL}/library/vue.svg`,
  },
  Angular: {
    title: "Angular",
    svglUrl: `${SVGL_API_URL}/library/angular.svg`,
  },
  Svelte: {
    title: "Svelte",
    svglUrl: `${SVGL_API_URL}/library/svelte.svg`,
  },
  "Nuxt": {
    title: "Nuxt",
    svglUrl: `${SVGL_API_URL}/library/nuxt.svg`,
  },
  Astro: {
    title: "Astro",
    svglUrl: {
      dark: `${SVGL_API_URL}/library/astro-icon-dark.svg`,
      light: `${SVGL_API_URL}/library/astro-icon-light.svg`,
    },
  },

  // Backend Frameworks
  "Node.js": {
    title: "Node.js",
    svglUrl: `${SVGL_API_URL}/library/nodejs.svg`,
  },
  "Nest.js": {
    title: "NestJS",
    svglUrl: `${SVGL_API_URL}/library/nestjs.svg`,
  },
  Express: {
    title: "Express.js",
    svglUrl: {
      dark: `${SVGL_API_URL}/library/expressjs.svg`,
      light: `${SVGL_API_URL}/library/expressjs_dark.svg`,
    },
  },
  Django: {
    title: "Django",
    svglUrl: `${SVGL_API_URL}/library/django.svg`,
  },
  Flask: {
    title: "Flask",
    svglUrl: {
      dark: `${SVGL_API_URL}/library/flask-dark.svg`,
      light: `${SVGL_API_URL}/library/flask-light.svg`,
    },
  },
  Laravel: {
    title: "Laravel",
    svglUrl: `${SVGL_API_URL}/library/laravel.svg`,
  },
  "Spring Boot": {
    title: "Spring Boot",
    svglUrl: `${SVGL_API_URL}/library/spring.svg`,
  },

  // Programming Languages
  JavaScript: {
    title: "JavaScript",
    svglUrl: `${SVGL_API_URL}/library/javascript.svg`,
  },
  TypeScript: {
    title: "TypeScript",
    svglUrl: `${SVGL_API_URL}/library/typescript.svg`,
  },
  Python: {
    title: "Python",
    svglUrl: `${SVGL_API_URL}/library/python.svg`,
  },
  Go: {
    title: "Go",
    svglUrl: {
      dark: `${SVGL_API_URL}/library/golang_dark.svg`,
      light: `${SVGL_API_URL}/library/golang.svg`,
    },
  },
  Rust: {
    title: "Rust",
    svglUrl: {
      dark: `${SVGL_API_URL}/library/rust_dark.svg`,
      light: `${SVGL_API_URL}/library/rust.svg`,
    },
  },
  Java: {
    title: "Java",
    svglUrl: `${SVGL_API_URL}/library/java.svg`,
  },
  Scala: {
    title: "Scala",
    svglUrl: `${SVGL_API_URL}/library/scala.svg`,
  },
  "C++": {
    title: "C++",
    svglUrl: `${SVGL_API_URL}/library/c-plusplus.svg`,
  },
  "C#": {
    title: "C#",
    svglUrl: `${SVGL_API_URL}/library/csharp.svg`,
  },
  PHP: {
    title: "PHP",
    svglUrl: {
      dark: `${SVGL_API_URL}/library/php_dark.svg`,
      light: `${SVGL_API_URL}/library/php.svg`,
    },
  },
  Ruby: {
    title: "Ruby",
    svglUrl: `${SVGL_API_URL}/library/ruby.svg`,
  },

  // Mobile
  Flutter: {
    title: "Flutter",
    svglUrl: `${SVGL_API_URL}/library/flutter.svg`,
  },
  "React Native": {
    title: "React Native",
    svglUrl: {
      dark: `${SVGL_API_URL}/library/react_dark.svg`,
      light: `${SVGL_API_URL}/library/react_light.svg`,
    },
  },
  Kotlin: {
    title: "Kotlin",
    svglUrl: `${SVGL_API_URL}/library/kotlin.svg`,
  },
  Swift: {
    title: "Swift",
    svglUrl: `${SVGL_API_URL}/library/swift.svg`,
  },

  // DevOps & Cloud
  Docker: {
    title: "Docker",
    svglUrl: `${SVGL_API_URL}/library/docker.svg`,
  },
  Kubernetes: {
    title: "Kubernetes",
    svglUrl: `${SVGL_API_URL}/library/kubernetes.svg`,
  },
  AWS: {
    title: "Amazon Web Services",
    svglUrl: {
      dark: `${SVGL_API_URL}/library/aws_dark.svg`,
      light: `${SVGL_API_URL}/library/aws_light.svg`,
    },
  },
  Azure: {
    title: "Microsoft Azure",
    svglUrl: `${SVGL_API_URL}/library/azure.svg`,
  },
  GCP: {
    title: "Google Cloud",
    svglUrl: `${SVGL_API_URL}/library/google-cloud.svg`,
  },

  // Databases
  MongoDB: {
    title: "MongoDB",
    svglUrl: `${SVGL_API_URL}/library/mongodb-icon-light.svg`,
  },
  PostgreSQL: {
    title: "PostgreSQL",
    svglUrl: `${SVGL_API_URL}/library/postgresql.svg`,
  },
  MySQL: {
    title: "MySQL",
    svglUrl: {
      dark: `${SVGL_API_URL}/library/mysql-icon-dark.svg`,
      light: `${SVGL_API_URL}/library/mysql-icon-light.svg`,
    },
  },
  Redis: {
    title: "Redis",
    svglUrl: `${SVGL_API_URL}/library/redis.svg`,
  },

  // CSS Frameworks
  "Tailwind CSS": {
    title: "Tailwind CSS",
    svglUrl: `${SVGL_API_URL}/library/tailwindcss.svg`,
  },
  Bootstrap: {
    title: "Bootstrap",
    svglUrl: `${SVGL_API_URL}/library/bootstrap.svg`,
  },
};

// Icône par défaut pour les technologies non reconnues
export const defaultStackIcon: StackIconConfig = {
  title: "Default",
  svglUrl: `${SVGL_API_URL}/library/svg.svg`, // Icône générique
};

/**
 * Récupère la configuration d'icône pour une technologie
 * @param tech - Nom de la technologie
 * @returns Configuration de l'icône
 */
export function getStackIcon(tech: string): StackIconConfig {
  return (
    stackIconMap[tech] || {
      ...defaultStackIcon,
      title: tech,
    }
  );
}
