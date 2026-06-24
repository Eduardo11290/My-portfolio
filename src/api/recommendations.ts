import { apiFetch } from "./client";

export type Recommendation = {
  id: number;
  name: string;
  role: string;
  text: string;
  linkedIn?: string | null;
  createdAt: string;
  flagged: boolean;
};

export type RecommendationPayload = {
  name: string;
  role: string;
  text: string;
  linkedIn?: string;
};

/** Public list — all recommendations, newest first (no approval step). */
export function getRecommendations() {
  return apiFetch<Recommendation[]>("/api/recommendations");
}

/** Public submission — shown immediately. */
export function submitRecommendation(payload: RecommendationPayload) {
  return apiFetch<Recommendation>("/api/recommendations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Admin — delete a recommendation. */
export function deleteRecommendation(id: number, apiKey: string) {
  return apiFetch<void>(`/api/recommendations/${id}`, {
    method: "DELETE",
    headers: { "X-Api-Key": apiKey },
  });
}
