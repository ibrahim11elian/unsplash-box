import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCollectionName } from "../../services/collectionsApi";
import toast from "react-hot-toast";

function useUpdateCollection() {
  const queryClient = useQueryClient();
  const { mutate: updateCollection, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, newName }) => updateCollectionName(id, newName),
    onSuccess: () => {
      toast.success("Collection updated successfully");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { updateCollection, isUpdating };
}

export default useUpdateCollection;
