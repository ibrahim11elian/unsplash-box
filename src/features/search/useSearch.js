import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { search } from "../../services/unsplashApi";

function useSearch() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: ({ pageParam = 1 }) => search(query, pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.total_pages > allPages.length) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  const images = data?.pages.flatMap((page) => page.results) || [];

  return {
    query,
    images,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    error,
  };
}

export default useSearch;
