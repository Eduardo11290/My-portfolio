import { useEffect } from "react";
import { trackPageView } from "../api/analytics";

/**
 * Fires a single analytics page-view on mount. Failures are silently ignored
 * so the backend being offline never affects the visitor experience.
 */
export function usePageViewTracking() {
  useEffect(() => {
    trackPageView(
      window.location.pathname || "/",
      document.referrer || undefined,
    ).catch(() => {
      /* analytics is best-effort */
    });
  }, []);
}
