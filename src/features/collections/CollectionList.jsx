import toast from "react-hot-toast";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import CollectionCard from "./CollectionCard";
import useCollections from "./useCollections";

function CollectionsList() {
  const { isLoading, collections, error } = useCollections();

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
    return;
  }

  if (!collections?.length)
    return (
      <p className="text-center text-gray-800">
        You do not have any collection yet.
      </p>
    );

  return (
    <ul className="grid grid-cols-1 gap-8 bg-inherit sm:grid-cols-2 lg:grid-cols-3">
      <Menus>
        {collections.map((collection) => (
          <CollectionCard key={collection.name} collection={collection} />
        ))}
      </Menus>
    </ul>
  );
}

export default CollectionsList;
