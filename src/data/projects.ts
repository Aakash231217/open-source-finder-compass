
export interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  goodFirstIssues: number;
  helpWantedIssues: number;
  lastUpdated: string;
  license: string;
  owner: {
    name: string;
    avatar: string;
  };
  tags: string[];
  repositoryUrl: string;
}

export const projects: Project[] = [
  {
    id: "1",
    name: "react",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    language: "JavaScript",
    stars: 203000,
    forks: 41800,
    issues: 1078,
    goodFirstIssues: 25,
    helpWantedIssues: 58,
    lastUpdated: "2023-05-09",
    license: "MIT",
    owner: {
      name: "facebook",
      avatar: "https://github.com/facebook.png",
    },
    tags: ["web", "ui", "frontend"],
    repositoryUrl: "https://github.com/facebook/react",
  },
  {
    id: "2",
    name: "vscode",
    description: "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
    language: "TypeScript",
    stars: 147000,
    forks: 26300,
    issues: 7821,
    goodFirstIssues: 56,
    helpWantedIssues: 112,
    lastUpdated: "2023-05-10",
    license: "MIT",
    owner: {
      name: "microsoft",
      avatar: "https://github.com/microsoft.png",
    },
    tags: ["editor", "developer-tools", "electron"],
    repositoryUrl: "https://github.com/microsoft/vscode",
  },
  {
    id: "3",
    name: "tensorflow",
    description: "An open-source machine learning framework for everyone",
    language: "Python",
    stars: 175000,
    forks: 88000,
    issues: 2051,
    goodFirstIssues: 12,
    helpWantedIssues: 35,
    lastUpdated: "2023-05-08",
    license: "Apache-2.0",
    owner: {
      name: "tensorflow",
      avatar: "https://github.com/tensorflow.png",
    },
    tags: ["machine-learning", "ai", "data-science"],
    repositoryUrl: "https://github.com/tensorflow/tensorflow",
  },
  {
    id: "4",
    name: "rust",
    description: "Empowering everyone to build reliable and efficient software.",
    language: "Rust",
    stars: 83000,
    forks: 11500,
    issues: 8467,
    goodFirstIssues: 32,
    helpWantedIssues: 78,
    lastUpdated: "2023-05-10",
    license: "MIT",
    owner: {
      name: "rust-lang",
      avatar: "https://github.com/rust-lang.png",
    },
    tags: ["systems-programming", "performance", "memory-safety"],
    repositoryUrl: "https://github.com/rust-lang/rust",
  },
  {
    id: "5",
    name: "flutter",
    description: "Flutter makes it easy and fast to build beautiful apps for mobile and beyond",
    language: "Dart",
    stars: 152000,
    forks: 24800,
    issues: 11326,
    goodFirstIssues: 45,
    helpWantedIssues: 130,
    lastUpdated: "2023-05-10",
    license: "BSD-3-Clause",
    owner: {
      name: "flutter",
      avatar: "https://github.com/flutter.png",
    },
    tags: ["mobile", "cross-platform", "ui"],
    repositoryUrl: "https://github.com/flutter/flutter",
  },
  {
    id: "6",
    name: "scikit-learn",
    description: "Machine learning in Python",
    language: "Python",
    stars: 55000,
    forks: 26000,
    issues: 2652,
    goodFirstIssues: 29,
    helpWantedIssues: 62,
    lastUpdated: "2023-05-09",
    license: "BSD-3-Clause",
    owner: {
      name: "scikit-learn",
      avatar: "https://github.com/scikit-learn.png",
    },
    tags: ["machine-learning", "data-science", "algorithms"],
    repositoryUrl: "https://github.com/scikit-learn/scikit-learn",
  },
  {
    id: "7",
    name: "kubernetes",
    description: "Production-Grade Container Scheduling and Management",
    language: "Go",
    stars: 98000,
    forks: 36000,
    issues: 2441,
    goodFirstIssues: 18,
    helpWantedIssues: 42,
    lastUpdated: "2023-05-10",
    license: "Apache-2.0",
    owner: {
      name: "kubernetes",
      avatar: "https://github.com/kubernetes.png",
    },
    tags: ["containers", "orchestration", "cloud"],
    repositoryUrl: "https://github.com/kubernetes/kubernetes",
  },
  {
    id: "8",
    name: "vue",
    description: "An approachable, performant and versatile framework for building web user interfaces.",
    language: "JavaScript",
    stars: 203000,
    forks: 34000,
    issues: 395,
    goodFirstIssues: 10,
    helpWantedIssues: 25,
    lastUpdated: "2023-05-09",
    license: "MIT",
    owner: {
      name: "vuejs",
      avatar: "https://github.com/vuejs.png",
    },
    tags: ["web", "ui", "frontend"],
    repositoryUrl: "https://github.com/vuejs/vue",
  },
  {
    id: "9",
    name: "django",
    description: "The Web framework for perfectionists with deadlines.",
    language: "Python",
    stars: 69000,
    forks: 29000,
    issues: 1304,
    goodFirstIssues: 31,
    helpWantedIssues: 68,
    lastUpdated: "2023-05-08",
    license: "BSD-3-Clause",
    owner: {
      name: "django",
      avatar: "https://github.com/django.png",
    },
    tags: ["web", "framework", "python"],
    repositoryUrl: "https://github.com/django/django",
  },
  {
    id: "10",
    name: "node",
    description: "Node.js JavaScript runtime",
    language: "C++",
    stars: 95000,
    forks: 26000,
    issues: 1551,
    goodFirstIssues: 22,
    helpWantedIssues: 48,
    lastUpdated: "2023-05-10",
    license: "MIT",
    owner: {
      name: "nodejs",
      avatar: "https://github.com/nodejs.png",
    },
    tags: ["javascript", "runtime", "server"],
    repositoryUrl: "https://github.com/nodejs/node",
  },
];

export const languages = Array.from(new Set(projects.map(project => project.language)));

export const tags = Array.from(
  new Set(projects.flatMap(project => project.tags))
);
