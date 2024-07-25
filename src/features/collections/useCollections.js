import { useQuery } from "@tanstack/react-query";
import { getUserCollections } from "../../services/collectionsApi";
import { useUser } from "../authentication/useUser";

function useCollections() {
  const { currentUser } = useUser();

  const {
    data: collections,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collections"],
    queryFn: () => getUserCollections(currentUser?.uid),
  });

  return { collections, isLoading, error };
}

export default useCollections;
