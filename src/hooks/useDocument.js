// Real time listening to a specific document

import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = db.collection(collection).doc(id);

    const unSubscribe = ref.onSnapshot(
      (snapshot) => {
        setDocument({ ...snapshot.data(), id: snapshot.id });
        setError(null);
      },
      (err) => {
        console.log(err.message);
        setError("Failed to get document.");
      }
    );

    return () => unSubscribe();
  }, [collection, id]);

  return { document, error };
};
