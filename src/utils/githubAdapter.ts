
import { Project } from "@/data/projects";
import { GitHubRepository } from "@/services/githubService";

// Convert a GitHub repository to our Project format
export const adaptGitHubRepo = (repo: GitHubRepository): Project => {
  const [owner, name] = repo.html_url.replace('https://github.com/', '').split('/');
  
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description || 'No description provided',
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
    goodFirstIssues: 0, // This will be fetched separately if needed
    helpWantedIssues: 0, // This will be fetched separately if needed
    lastUpdated: repo.updated_at,
    license: repo.license?.spdx_id || 'Unknown',
    owner: {
      name: repo.owner.login,
      avatar: repo.owner.avatar_url,
    },
    tags: repo.topics || [],
    repositoryUrl: repo.html_url,
  };
};
