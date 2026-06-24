import { apiFetch } from "./client";

export type PathCount = { path: string; count: number };

export type AnalyticsSummary = {
  totalAllTime: number;
  totalLast30Days: number;
  totalLast7Days: number;
  topPaths: PathCount[];
};

/** Records a page/section view. Fire-and-forget on the client. */
export function trackPageView(path: string, referrer?: string) {
  return apiFetch<void>("/api/analytics", {
    method: "POST",
    body: JSON.stringify({ path, referrer }),
  });
}

/** Admin — aggregate visitor stats. */
export function getAnalyticsSummary(apiKey: string) {
  return apiFetch<AnalyticsSummary>("/api/analytics/summary", {
    headers: { "X-Api-Key": apiKey },
  });
}
