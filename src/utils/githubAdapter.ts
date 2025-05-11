import { GitHubRepository } from "@/services/githubService";
import { Project } from "@/data/projects";

// Convert a GitHub repository to our Project format
export function adaptGitHubRepo(repo: GitHubRepository): Project {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description || 'No description provided',
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
    lastUpdated: repo.updated_at,
    license: repo.license?.spdx_id || 'No license',
    owner: {
      name: repo.owner.login,
      avatar: repo.owner.avatar_url,
    },
    url: repo.html_url,
    tags: repo.topics || [],
  };
}
