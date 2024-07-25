import useAddCollectionImage from "../features/imageDetails/useAddCollectionImage";
import useImage from "../features/imageDetails/useImage";
import useRemoveImageFromCollection from "../features/imageDetails/useRemoveImageFromCollection";
import ButtonWithIcon from "./ButtonWithIcon";
import CollectionSmallCard from "./CollectionSmallCard";

import { useUser } from "../features/authentication/useUser";
import { HiMinus, HiPlus } from "react-icons/hi2";

// we get the collections as props because this list has two deferent purpose one to displays all the collections that include the current image while the other displays all the ones that does not have the current image.
// based on that the button click act based on the situation.
// type can be "add" or "remove"
function CollectionsSmallList({ collections, type = "add", onCloseModal }) {
  const { currentUser } = useUser();
  const { imageData } = useImage();
  const { addImageToCollection, isAdding } = useAddCollectionImage();
  const { deleteImage, isDeleting } = useRemoveImageFromCollection();

  const handleClick = (collectionId, url, imageId) => {
    if (type === "add") {
      addImageToCollection({ collectionId, url, imageId });
      onCloseModal?.();
    } else if (type === "remove") {
      // get the document id that contain both current collectionId and current imageId
      // because in this list we just display some info about the collection that image belongs to and also display the first image on the collection
      const { id } = collections
        .find((collection) => collection.id === collectionId)
        .images.find((image) => image.imageId === imageId);

      deleteImage(id);
    }
  };

  if (!currentUser)
    return (
      <p className="text-center text-sm text-gray-800">
        Login to add this image to your collections
      </p>
    );

  if (!collections.length)
    return <p className="text-center text-sm text-gray-800">No Collections</p>;

  return (
    <ul className="flex flex-col gap-2">
      {collections.map((collection) => (
        <CollectionSmallCard key={collection.id} collection={collection}>
          <ButtonWithIcon
            icon={
              type === "add" ? (
                <HiPlus size={"1.2rem"} />
              ) : (
                <HiMinus size={"1.2rem"} />
              )
            }
            disabled={isAdding || isDeleting}
            onClick={() =>
              handleClick(collection.id, imageData.urls.regular, imageData.id)
            }
          >
            <span className="hidden sm:inline-block">
              {type === "add" ? "Add to Collection" : "Remove"}
            </span>
          </ButtonWithIcon>
        </CollectionSmallCard>
      ))}
    </ul>
  );
}

export default CollectionsSmallList;
