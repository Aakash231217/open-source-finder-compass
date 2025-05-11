import { toast } from "@/components/ui/use-toast";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.warn('GitHub token not found. Some features may be limited.');
}

export interface GitHubRepository {
  id: string;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  topics: string[];
  license?: {
    spdx_id: string;
  };
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
}

interface SearchResponse {
  total_count: number;
  items: GitHubRepository[];
}

const headers = {
  'Accept': 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN ? { 'Authorization': `token ${GITHUB_TOKEN}` } : {})
};

export const searchRepositories = async (
  searchTerm: string = '',
  language: string = '',
  sort: string = 'stars',
  page: number = 1,
  perPage: number = 30,
  goodFirstIssuesOnly: boolean = false
): Promise<{ data: GitHubRepository[]; totalCount: number }> => {
  try {
    // Build the search query
    let query = searchTerm || 'stars:>1000';
    
    // Add language filter if specified
    if (language && language !== 'all') {
      query += ` language:${language}`;
    }
    
    // Add good first issues filter if specified
    if (goodFirstIssuesOnly) {
      query += ' label:"good first issue"';
    }

    // Determine sort parameter for GitHub API
    let sortParam = sort;
    if (sort === 'goodFirstIssues') sortParam = 'updated';
    
    // Make the API call
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=${sortParam}&order=desc&page=${page}&per_page=${perPage}`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch repositories');
    }

    const data: SearchResponse = await response.json();
    return { data: data.items, totalCount: data.total_count };
  } catch (error) {
    console.error('Error fetching repositories:', error);
    toast({
      title: "Error fetching repositories",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    return { data: [], totalCount: 0 };
  }
};

export const getRepositoryDetails = async (owner: string, repo: string, id?: number): Promise<GitHubRepository | null> => {
  try {
    let url = '';
    
    if (id) {
      // If we have an ID, get the repository directly
      url = `https://api.github.com/repositories/${id}`;
    } else if (owner && repo) {
      // Otherwise, use the owner/repo path
      url = `https://api.github.com/repos/${owner}/${repo}`;
    } else {
      throw new Error('Either id or owner/repo must be provided');
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error('Failed to fetch repository details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching repository details:', error);
    toast({
      title: "Error fetching repository details",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    return null;
  }
};

export const getGoodFirstIssues = async (owner: string, repo: string): Promise<number> => {
  try {
    const response = await fetch(
      `https://api.github.com/search/issues?q=repo:${owner}/${repo}+label:good-first-issue+state:open`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch good first issues');
    }

    const data = await response.json();
    return data.total_count;
  } catch (error) {
    console.error('Error fetching good first issues:', error);
    return 0;
  }
};

export const getLanguages = async (): Promise<string[]> => {
  try {
    // Using a predefined list of popular programming languages
    const commonLanguages = [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++',
      'Ruby', 'PHP', 'C#', 'Rust', 'Swift', 'Kotlin', 'Dart'
    ];
    return commonLanguages;
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
};

export const getTopics = async (): Promise<string[]> => {
  try {
    // Using a predefined list of popular topics
    const popularTopics = [
    ];
    return popularTopics;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};
