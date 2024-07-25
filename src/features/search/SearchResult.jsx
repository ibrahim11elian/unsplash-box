import { useEffect } from "react";
import ImageGallery from "../../ui/ImageGallery";
import MasonryGallery from "../../ui/MasonryList";
import Spinner from "../../ui/Spinner";
import { useInView } from "react-intersection-observer";
import useSearch from "./useSearch";
import Empty from "../../ui/Empty";
import useTitle from "../../hooks/useTitle";

function SearchResult() {
  const {
    images,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    query,
  } = useSearch();
  const { ref, inView } = useInView();

  useTitle("Search results for " + query);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <Spinner size="big" />;
  }

  if (error) {
    return <div className="w-full">Error: {error.message}</div>;
  }

  if (images.length === 0)
    return <Empty resource={"images based on this query"} />;

  return (
    <section className="bg-gray-50 px-5 pt-8 sm:px-14">
      <MasonryGallery>
        {images.map((image) => (
          <ImageGallery
            key={image.id}
            id={image.id}
            url={image.urls.regular}
            alt={image.alt_description}
          />
        ))}
      </MasonryGallery>
      {isFetchingNextPage ? <Spinner /> : null}
      <div ref={ref} className="h-4" />
    </section>
  );
}

export default SearchResult;
