import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImageFromCollection } from "../../services/imageApi";
import toast from "react-hot-toast";

function useRemoveImageFromCollection() {
  const queryClient = useQueryClient();
  const { mutate: deleteImage, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteImageFromCollection(id),
    onSuccess: () => {
      toast.success("Image removed successfully");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { deleteImage, isDeleting };
}

export default useRemoveImageFromCollection;
