// GitHub API utilities

export interface GitHubStats {
  username: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
}

export interface GitHubRepository {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
}

export async function getGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();

    // Get repositories for stars/forks count
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      }
    );

    let totalStars = 0;
    let totalForks = 0;

    if (reposResponse.ok) {
      const repos = await reposResponse.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      totalForks = repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);
    }

    return {
      username: user.login,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      totalForks,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
}

export async function getGitHubRepositories(
  username: string,
  limit: number = 6
): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const repos = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description || "",
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || "Other",
      updatedAt: repo.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return [];
  }
}

