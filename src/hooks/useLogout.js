import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign user out
    try {
      // Change user to offline
      const { uid } = user;
      await db.collection("users").doc(uid).update({
        online: false,
      });

      // firebase auth method
      await auth.signOut();
      // tell AuthContext to set the user: null
      dispatch({ type: "LOGOUT" });
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

  return { error, isPending, logout };
};
