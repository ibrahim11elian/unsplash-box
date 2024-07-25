import { useCollectionsList } from "../../context/SearchCollection";
import CollectionsSmallList from "../../ui/CollectionsSmallList";
import Spinner from "../../ui/Spinner";
import SearchCollections from "./SearchCollections";

function AddToCollections({ onCloseModal }) {
  // those collections comes from context that filter the collection to get the ones that does not have the current image
  const { collections, isLoading } = useCollectionsList();

  return (
    <div className="flex flex-col gap-3 py-2">
      <h3 className="pl-4 text-2xl font-medium text-gray-900">
        Add to Collections
      </h3>
      <SearchCollections />

      <div className="px-3">
        <p className="mb-3 text-sm text-gray-800">
          {collections.length} {collections > 1 ? "matches" : "match"}
        </p>

        <div className="scrollbar-hide max-h-[20rem] overflow-y-scroll">
          {isLoading ? (
            <Spinner />
          ) : (
            <CollectionsSmallList
              collections={collections}
              onCloseModal={onCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddToCollections;
