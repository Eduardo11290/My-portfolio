/**
 * Tiny fetch wrapper for the backend API. Base URL comes from VITE_API_URL
 * (see .env.development), defaulting to the local ASP.NET Core dev port.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5071";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.text();
      if (body) message = body;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  // 204 No Content or empty body
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}
