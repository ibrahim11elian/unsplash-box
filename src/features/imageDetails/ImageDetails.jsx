import Image from "./Image";
import OperationsButtons from "./OperationsButtons";
import UserInfo from "./UserInfo";
import useImage from "./useImage";
import Spinner from "../../ui/Spinner";
import { formatDate } from "../../utils/helper";
import CollectionsSmallList from "../../ui/CollectionsSmallList";
import useCollections from "../collections/useCollections";
import useTitle from "../../hooks/useTitle";

function ImageDetails() {
  const { imageData, isLoading, error } = useImage();
  const {
    collections,
    isLoading: isLoadingCollection,
    error: collectionError,
  } = useCollections();

  useTitle(imageData?.slug.split("-").join(" "));

  if (isLoading || isLoadingCollection)
    return (
      <div className="col-span-full">
        <Spinner size="big" />
      </div>
    );

  if (error || collectionError) {
    return <div className="w-full text-gray-800"> {error.message}</div>;
  }

  const collectionsWithImage = filterCollectionIncludeImage(
    collections,
    imageData.id,
  );

  return (
    <>
      {" "}
      <Image url={imageData.urls.regular} alt={imageData.alt_description} />
      <div className="col-span-full flex flex-col gap-5 lg:col-span-1">
        <UserInfo
          image={imageData.user.profile_image.medium}
          name={imageData.user.name}
        />

        <p className="text-sm text-gray-700">
          Published on {formatDate(imageData.created_at)}
        </p>

        <OperationsButtons url={imageData.urls.regular} id={imageData.id} />

        <h3 className="text-2xl font-medium text-gray-900">Collections</h3>

        <CollectionsSmallList
          collections={collectionsWithImage}
          type="remove"
        />
      </div>
    </>
  );
}

export default ImageDetails;

function filterCollectionIncludeImage(collections, imageId) {
  return collections.filter((collection) =>
    collection.images.some((image) => image.imageId === imageId),
  );
}
