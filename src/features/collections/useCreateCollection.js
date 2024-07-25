import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCollection } from "../../services/collectionsApi";
import toast from "react-hot-toast";

function useCreateCollection() {
  const queryClient = useQueryClient();
  const { mutate: createCollection, isPending: isCreating } = useMutation({
    mutationFn: ({ userId, collectionName }) =>
      addCollection(userId, collectionName),
    onSuccess: () => {
      toast.success("Collection created successfully");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { createCollection, isCreating };
}

export default useCreateCollection;
