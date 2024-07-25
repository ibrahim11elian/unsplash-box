import { useMutation } from "@tanstack/react-query";
import { downloadImage as downloadImageApi } from "../../services/unsplashApi";
import { useState } from "react";
import toast from "react-hot-toast";

function useDownloadImage() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const { mutate: downloadImage, isPending: isDownloading } = useMutation({
    mutationFn: ({ url, name }) =>
      downloadImageApi(url, name, setDownloadProgress),
    onSuccess: () => {
      setDownloadProgress(0);
      toast.success("Image downloaded successfully");
    },
  });

  return { downloadImage, downloadProgress, isDownloading };
}

export default useDownloadImage;
