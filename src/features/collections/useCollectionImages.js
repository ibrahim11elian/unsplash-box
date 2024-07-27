import { useInfiniteQuery } from "@tanstack/react-query";
import { getCollectionImages } from "../../services/collectionsApi";

function useCollectionImages(collectionId) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["collectionImages", collectionId],
    queryFn: ({ pageParam }) => getCollectionImages(collectionId, pageParam),

    getNextPageParam: (lastPage) => lastPage.images.nextCursor || undefined,
  });

  const images = data?.pages.flatMap((page) => page.images.results) || [];
  // get the collection metadata from the data
  const collection = data?.pages[0]?.collection || {};
  const imageCount = data?.pages[0]?.imageCount || 0;
  return {
    imageCount,
    collection,
    images,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  };
}

export default useCollectionImages;
