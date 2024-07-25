import { db } from "../utils/fireBaseConfig";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

export const addImageToCollection = async (imageId, collectionId, url) => {
  try {
    const imageDoc = {
      collectionId,
      url,
      createdAt: new Date(),
      imageId,
    };

    const imagesRef = collection(db, "images");
    await addDoc(imagesRef, imageDoc);
  } catch (error) {
    console.error("Error adding image:", error);
    throw new Error("Error adding image to collection");
  }
};

export const deleteImageFromCollection = async (documentId) => {
  try {
    await deleteDoc(doc(db, "images", documentId));
  } catch (error) {
    throw new Error("Error removing image");
  }
};
