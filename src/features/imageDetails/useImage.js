import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPhoto } from "../../services/unsplashApi";

function useImage() {
  const { id } = useParams();
  const {
    data: imageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["image", id],
    queryFn: () => getPhoto(id),
  });

  return { imageData, isLoading, error };
}

export default useImage;
