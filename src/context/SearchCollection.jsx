import { createContext, useContext, useEffect, useState } from "react";
import useCollections from "../features/collections/useCollections";
import { useParams } from "react-router-dom";

const SearchCollectionsContext = createContext();

function SearchCollectionsProvider({ children }) {
  const { id } = useParams();
  const { collections: initial, isLoading } = useCollections();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setCollections(
      initial.filter((collection) =>
        collection.images.every((image) => image.imageId !== id),
      ),
    );
  }, [id, initial]);

  const search = (query, imageId) => {
    setCollections(
      initial.filter(
        (collection) =>
          collection.name.toLowerCase().includes(query.toLowerCase()) &&
          collection.images.every((image) => image.imageId !== imageId),
      ),
    );
  };

  return (
    <SearchCollectionsContext.Provider
      value={{ collections, search, isLoading }}
    >
      {children}
    </SearchCollectionsContext.Provider>
  );
}

export const useCollectionsList = () => {
  const context = useContext(SearchCollectionsContext);
  if (context === undefined) {
    throw new Error(
      "useCollectionsList must be used within a SearchCollectionsProvider",
    );
  }
  return context;
};

export default SearchCollectionsProvider;
