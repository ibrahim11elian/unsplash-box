import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollection as deleteCollectionApi } from "../../services/collectionsApi";
import toast from "react-hot-toast";

function useDeleteCollection() {
  const queryClient = useQueryClient();
  const { mutate: deleteCollection, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteCollectionApi(id),
    onSuccess: () => {
      toast.success("Collection deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { deleteCollection, isDeleting };
}

export default useDeleteCollection;
