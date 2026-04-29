import { NextResponse } from "next/server";
import {
  fetchGitHubRepos,
  fetchGitHubUser,
  processRepos,
} from "@/lib/github";
import projectsConfig from "@/config/projects.json";

export const revalidate = 3600; // ISR: revalidate every hour

export async function GET() {
  try {
    const [repos, user] = await Promise.all([
      fetchGitHubRepos(),
      fetchGitHubUser(),
    ]);

    const processedRepos = processRepos(
      repos,
      projectsConfig.hiddenRepos,
      projectsConfig.pinnedRepos
    );

    // Merge manual projects with GitHub repos
    const allProjects = [
      ...projectsConfig.manualProjects,
      ...processedRepos.filter(
        (r) =>
          !projectsConfig.manualProjects.some((m) =>
            m.name.toLowerCase() === r.name.toLowerCase()
          )
      ),
    ];

    return NextResponse.json(
      {
        repos: allProjects,
        user,
        totalRepos: repos.length,
        lastUpdated: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("GitHub API route error:", error);
    // Return manual projects as fallback
    return NextResponse.json(
      {
        repos: projectsConfig.manualProjects,
        user: null,
        totalRepos: projectsConfig.manualProjects.length,
        lastUpdated: new Date().toISOString(),
        error: "Failed to fetch live GitHub data, showing cached projects.",
      },
      { status: 200 }
    );
  }
}
