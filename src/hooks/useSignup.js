import { useState, useEffect } from "react";
import { db, auth, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // create user account
      const res = await auth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error("Sign up failed. :(");
      }

      // upload user profile picture
      const thumbnailPath = `thumbnails/${res.user.uid}/thumbnail.jpg`;
      let storedImgUrl;
      if (thumbnail) {
        const storedImg = await storage.ref(thumbnailPath).put(thumbnail);
        storedImgUrl = await storedImg.ref.getDownloadURL();
      } else {
        storedImgUrl = await storage
          .ref("thumbnails/default/default.png")
          .getDownloadURL();
      }
      // add user's display name
      await res.user.updateProfile({ displayName, photoURL: storedImgUrl });

      // create a user document
      await db.collection("users").doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: storedImgUrl,
      });

      // dispatch LOGIN to AuthContext
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // clean-up function in case component unmounts during async functions
  // setting IsCancelled to true will cause all state changes above to be terminated safely
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, signup };
};
