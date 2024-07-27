import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../utils/fireBaseConfig";

export const addCollection = async (userId, collectionName) => {
  try {
    const docRef = await addDoc(collection(db, "collections"), {
      userId,
      name: collectionName,
      createdAt: serverTimestamp(),
    });

    return docRef;
  } catch (e) {
    throw new Error("Error adding collection");
  }
};

// Fetch images for a specific collection
export const getCollectionImages = async (
  collectionId,
  pageParam,
  pageSize = 10,
) => {
  try {
    const imagesCollectionRef = collection(db, "images");

    // Fetch the collection data
    const collectionDocRef = doc(db, `collections/${collectionId}`);
    const collectionSnapshot = await getDoc(collectionDocRef);
    const collectionData = {
      id: collectionSnapshot.id,
      ...collectionSnapshot.data(),
    };

    if (!collectionSnapshot.exists) {
      throw new Error("Collection not found");
    }

    // Fetch the images for the collection with pagination
    const q = query(
      imagesCollectionRef,
      where("collectionId", "==", collectionId),
      limit(pageSize),
      ...(pageParam ? [startAfter(pageParam)] : []),
    );

    const snapshot = await getDocs(q);
    const images = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    const hasMore = snapshot.docs.length === pageSize;

    // Fetch the total image count for the collection
    const countQuery = query(
      imagesCollectionRef,
      where("collectionId", "==", collectionId),
    );
    const countSnapshot = await getCountFromServer(countQuery);
    const imageCount = countSnapshot.data().count;

    return {
      collection: collectionData,
      images: {
        results: images,
        hasMore,
        nextCursor: lastVisible,
      },
      imageCount,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch collection images");
  }
};

// Fetch user collections along with their images
export const getUserCollections = async (userId) => {
  if (!userId) return [];
  const q = query(collection(db, "collections"), where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    const collections = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const collectionData = { id: doc.id, ...doc.data() };
        const {
          images: { results: images },
          imageCount,
        } = await getCollectionImages(doc.id);
        return { ...collectionData, images, imageCount };
      }),
    );
    return collections;
  } catch (error) {
    throw new Error("Error fetching the collections");
  }
};

export const deleteCollection = async (collectionId) => {
  try {
    // delete all images belongs to this collection
    const imagesCollectionRef = collection(db, "images");
    const q = query(
      imagesCollectionRef,
      where("collectionId", "==", collectionId),
    );
    const snapshot = await getDocs(q);
    await Promise.all(
      snapshot.docs.map(async (d) => {
        const docRef = doc(db, "images", d.id);
        await deleteDoc(docRef);
      }),
    );

    const docRef = doc(db, "collections", collectionId);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error("Error deleting collection");
  }
};

export const updateCollectionName = async (collectionId, newName) => {
  try {
    const collectionRef = doc(db, "collections", collectionId);
    await updateDoc(collectionRef, {
      name: newName,
    });
  } catch (error) {
    console.error("Failed to update collection name:", error);
    throw new Error("Failed to update collection name");
  }
};
