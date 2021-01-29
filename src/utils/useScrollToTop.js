import React, { useEffect } from "react";

// To make the page scroll to top
export default function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
