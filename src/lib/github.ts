/**
 * GitHub API integration utilities
 * Fetches repositories and user data from GitHub REST API
 */

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  open_issues_count: number;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  company: string;
}

export interface ProcessedRepo extends GitHubRepo {
  featured?: boolean;
  isManual?: boolean;
  customDescription?: string;
  tags?: string[];
  priority?: number;
}

const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "ahmed-121174";
const GITHUB_PAT = process.env.GITHUB_PAT;

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
  if (GITHUB_PAT) {
    headers["Authorization"] = `Bearer ${GITHUB_PAT}`;
  }
  return headers;
}

/**
 * Fetch all public repositories for the configured GitHub user
 * Handles pagination automatically (up to 500 repos)
 */
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const allRepos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  try {
    while (page <= 5) {
      const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=${perPage}&page=${page}&sort=updated&type=public`;
      const response = await fetch(url, {
        headers: getHeaders(),
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!response.ok) {
        if (response.status === 403) {
          console.warn("GitHub API rate limit hit or authentication failed.");
        }
        break;
      }

      const repos: GitHubRepo[] = await response.json();
      if (repos.length === 0) break;

      allRepos.push(...repos);
      if (repos.length < perPage) break;
      page++;
    }
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
  }

  return allRepos;
}

/**
 * Fetch GitHub user profile data
 */
export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch GitHub user:", error);
    return null;
  }
}

/**
 * Fetch repository languages breakdown
 */
export async function fetchRepoLanguages(
  repoName: string
): Promise<Record<string, number>> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) return {};
    return await response.json();
  } catch {
    return {};
  }
}

/**
 * Process and filter repos based on project config
 */
export function processRepos(
  repos: GitHubRepo[],
  hiddenRepos: string[],
  pinnedRepos: string[]
): ProcessedRepo[] {
  return repos
    .filter(
      (repo) =>
        !repo.fork &&
        !repo.archived &&
        !repo.private &&
        !hiddenRepos.includes(repo.name)
    )
    .map((repo) => ({
      ...repo,
      featured: pinnedRepos.includes(repo.name),
    }))
    .sort((a, b) => {
      // Featured first, then by stars, then by last updated
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      if (b.stargazers_count !== a.stargazers_count)
        return b.stargazers_count - a.stargazers_count;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
}

/**
 * Format a date string to relative time
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Get language color for display
 */
export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    Python: "#3776ab",
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Rust: "#dea584",
    "C++": "#f34b7d",
    C: "#555555",
    Java: "#b07219",
    PHP: "#4f5d95",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Go: "#00add8",
    Ruby: "#701516",
    Swift: "#f05138",
    Kotlin: "#a97bff",
    Shell: "#89e051",
    Dockerfile: "#384d54",
  };
  return colors[language] || "#6366f1";
}
