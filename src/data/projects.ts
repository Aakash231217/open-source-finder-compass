
export interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  lastUpdated: string;
  license: string;
  owner: {
    name: string;
    avatar: string;
  };
  tags: string[];
  url: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    language: 'JavaScript',
    stars: 200000,
    forks: 40000,
    issues: 500,
    lastUpdated: '2023-05-10T12:00:00Z',
    license: 'MIT',
    owner: {
      name: 'facebook',
      avatar: 'https://avatars.githubusercontent.com/u/69631?v=4',
    },
    tags: ['javascript', 'react', 'ui'],
    url: 'https://github.com/facebook/react',
  },
  {
    id: '2',
    name: 'vue',
    description: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
    language: 'JavaScript',
    stars: 180000,
    forks: 30000,
    issues: 300,
    lastUpdated: '2023-05-09T12:00:00Z',
    license: 'MIT',
    owner: {
      name: 'vuejs',
      avatar: 'https://avatars.githubusercontent.com/u/6128107?v=4',
    },
    tags: ['javascript', 'vue', 'framework'],
    url: 'https://github.com/vuejs/vue',
  },
  {
    id: '3',
    name: 'angular',
    description: 'One framework. Mobile & desktop.',
    language: 'TypeScript',
    stars: 160000,
    forks: 25000,
    issues: 400,
    lastUpdated: '2023-05-08T12:00:00Z',
    license: 'MIT',
    owner: {
      name: 'angular',
      avatar: 'https://avatars.githubusercontent.com/u/139426?v=4',
    },
    tags: ['typescript', 'angular', 'framework'],
    url: 'https://github.com/angular/angular',
  },
  {
    id: '4',
    name: 'svelte',
    description: 'Cybernetically enhanced web apps.',
    language: 'JavaScript',
    stars: 140000,
    forks: 20000,
    issues: 200,
    lastUpdated: '2023-05-07T12:00:00Z',
    license: 'MIT',
    owner: {
      name: 'sveltejs',
      avatar: 'https://avatars.githubusercontent.com/u/23617963?v=4',
    },
    tags: ['javascript', 'svelte', 'framework'],
    url: 'https://github.com/sveltejs/svelte',
  },
  {
    id: '5',
    name: 'nextjs',
    description: 'The React Framework for Production.',
    language: 'TypeScript',
    stars: 120000,
    forks: 15000,
    issues: 150,
    lastUpdated: '2023-05-06T12:00:00Z',
    license: 'MIT',
    owner: {
      name: 'vercel',
      avatar: 'https://avatars.githubusercontent.com/u/14985020?v=4',
    },
    tags: ['typescript', 'react', 'nextjs'],
    url: 'https://github.com/vercel/next.js',
  },
  {
    id: '6',
    name: 'nuxtjs',
    description: 'The Vue.js Framework.',
    language: 'TypeScript',
    stars: 100000,
    forks: 10000,
    issues: 100,
    lastUpdated: '2023-05-05T12:00:00Z',
    license: 'MIT',
    owner: {
      name: 'nuxt',
      avatar: 'https://avatars.githubusercontent.com/u/23360933?v=4',
    },
    tags: ['typescript', 'vue', 'nuxtjs'],
    url: 'https://github.com/nuxt/nuxt.js',
  },
  {
    id: '7',
    name: 'remix',
    description: 'Build Better Websites.',
    language: 'TypeScript',
    stars: 80000,
    forks: 8000,
    issues: 80,
    lastUpdated: '2023-05-04T12:00:00Z',
    license: 'MIT',
    owner: {
      name: 'remix-run',
      avatar: 'https://avatars.githubusercontent.com/u/64235328?v=4',
    },
    tags: ['typescript', 'react', 'remix'],
    url: 'https://github.com/remix-run/remix',
  },
  {
    id: '8',
    name: 'solid',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    language: 'TypeScript',
    stars: 60000,
    forks: 6000,
    issues: 60,
    lastUpdated: '2023-05-03T12:00:00Z',
    license: 'MIT',
    owner: {
      name: 'solidjs',
      avatar: 'https://avatars.githubusercontent.com/u/79226042?v=4',
    },
    tags: ['typescript', 'solid', 'framework'],
    url: 'https://github.com/solidjs/solid',
  },
  {
    id: '9',
    name: 'astro',
    description: 'Build faster websites.',
    language: 'TypeScript',
    stars: 40000,
    forks: 4000,
    issues: 40,
    lastUpdated: '2023-05-02T12:00:00Z',
    license: 'MIT',
    owner: {
      name: 'withastro',
      avatar: 'https://avatars.githubusercontent.com/u/44914786?v=4',
    },
    tags: ['typescript', 'astro', 'framework'],
    url: 'https://github.com/withastro/astro',
  },
  {
    id: '10',
    name: 'qwik',
    description: 'The HTML-first framework.',
    language: 'TypeScript',
    stars: 20000,
    forks: 2000,
    issues: 20,
    lastUpdated: '2023-05-01T12:00:00Z',
    license: 'MIT',
    owner: {
      name: 'BuilderIO',
      avatar: 'https://avatars.githubusercontent.com/u/37885831?v=4',
    },
    tags: ['typescript', 'qwik', 'framework'],
    url: 'https://github.com/BuilderIO/qwik',
  },
];

export const languages = Array.from(new Set(projects.map(project => project.language)));

export const tags = Array.from(
  new Set(projects.flatMap(project => project.tags))
);
