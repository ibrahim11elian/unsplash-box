import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/fireBaseConfig";

export const login = async (email, password) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user;
  } catch (error) {
    console.log(error);
    throw new Error("Login failed, email or password are incorrect!");
  }
};

export const fetchCurrentUser = () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject,
    );
  });
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out: ", error);
    throw new Error("Error logging out");
  }
};

export const signup = async (email, password) => {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(data.user);
  } catch (error) {
    console.error("Error creating user: ", error);
    throw new Error("Error creating user");
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    return result.user;
  } catch (error) {
    console.log(error);
    // console.error("Error signing in with Google: ", error);
    throw new Error("Error signing in with Google");
  }
};
