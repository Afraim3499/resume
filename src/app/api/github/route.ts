import { NextRequest, NextResponse } from "next/server";
import { getGitHubStats, getGitHubRepositories } from "@/lib/github";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const type = searchParams.get("type"); // "stats" or "repos"
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 6;

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    if (type === "repos") {
      const repos = await getGitHubRepositories(username, limit);
      return NextResponse.json({ repos });
    } else {
      const stats = await getGitHubStats(username);
      if (!stats) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ stats });
    }
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}

