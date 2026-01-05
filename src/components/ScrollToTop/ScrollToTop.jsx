import { useEffect } from "react";
import { useLocation } from "react-router";

// Component that automatically scrolls the window to the top whenever the route changes.
// This improves user experience by ensuring new pages start at the top.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
