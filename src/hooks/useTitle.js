import { useEffect } from "react";

function useTitle(title) {
  useEffect(() => {
    document.title = "Unsplash Box | " + title;
    return () => (document.title = "Unsplash Box");
  }, [title]);
}

export default useTitle;
