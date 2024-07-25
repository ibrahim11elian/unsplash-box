import axios from "axios";
import { saveAs } from "file-saver";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID " + accessKey,
  },
});

export const search = async (query, page = 1, perPage = 10) => {
  try {
    const data = await unsplashApi.get(`/search/photos`, {
      params: {
        query,
        page,
        per_page: perPage,
      },
    });

    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPhoto = async (id) => {
  try {
    const data = await unsplashApi.get(`/photos/${id}`);
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const downloadImage = async (downloadUrl, fileName, onProgress) => {
  try {
    // Step 1: Fetch the image as a blob with download progress
    const imageResponse = await axios.get(downloadUrl, {
      responseType: "blob", // Ensure the response is a blob
      onDownloadProgress: (progressEvent) => {
        if (onProgress) {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          onProgress(percentage);
        }
      },
    });

    // Step 3: Use file-saver to save the image blob
    saveAs(imageResponse.data, fileName);
  } catch (error) {
    console.error("Failed to download image", error);
  }
};
