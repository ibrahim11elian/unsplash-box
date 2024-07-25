import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addImageToCollection as addImageToCollectionApi } from "../../services/imageApi";
import toast from "react-hot-toast";

function useAddCollectionImage() {
  const queryClient = useQueryClient();
  const { mutate: addImageToCollection, isPending: isAdding } = useMutation({
    mutationFn: ({ imageId, url, collectionId }) =>
      addImageToCollectionApi(imageId, collectionId, url),
    onSuccess: (_, variables) => {
      toast.success("Image added successfully");
      queryClient.invalidateQueries({ queryKey: ["image", variables.imageId] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { addImageToCollection, isAdding };
}

export default useAddCollectionImage;
