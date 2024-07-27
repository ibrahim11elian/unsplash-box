import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import GradientTitle from "../../ui/GradientTitle";
import ImageGallery from "../../ui/ImageGallery";
import MasonryGallery from "../../ui/MasonryList";
import Spinner from "../../ui/Spinner";
import useCollectionImages from "./useCollectionImages";
import Empty from "../../ui/Empty";
import { useParams } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

function CollectionDetails() {
  const { id: collectionId } = useParams();
  const {
    imageCount,
    collection,
    images,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useCollectionImages(collectionId);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, inView]);

  useTitle("Collection " + collection.name);

  if (isLoading) {
    return <Spinner size="big" />;
  }

  if (error) {
    return <div className="w-full">Error: {error.message}</div>;
  }

  if (images.length === 0) return <Empty resource={"images"} />;

  return (
    <div className="bg-gray-50 px-10 pb-5 sm:px-20">
      <div className="my-10 flex flex-col items-center justify-center gap-3">
        <GradientTitle>{collection.name}</GradientTitle>
        <p className="text-center font-light text-gray-900 sm:w-1/2 md:w-1/3">
          {imageCount} {imageCount > 1 ? "photos" : "photo"}
        </p>
      </div>

      <section className="px-5 pt-8 sm:px-14">
        <MasonryGallery>
          {images.map((image) => (
            <ImageGallery
              key={image.id}
              id={image.imageId}
              url={image.url}
              alt={image.imageId}
            />
          ))}
        </MasonryGallery>
        {isFetchingNextPage ? <Spinner /> : null}
        <div ref={ref} className="h-4" />
      </section>
    </div>
  );
}

export default CollectionDetails;
