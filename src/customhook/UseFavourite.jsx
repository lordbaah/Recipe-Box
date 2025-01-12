import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

export const useFavorites = (user, recipeId, recipeData) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkFavorite = async () => {
    if (!user) return;
    try {
      const favoritesRef = collection(db, "favorites", user.uid, "recipes");
      const q = query(favoritesRef, where("id", "==", parseInt(recipeId)));
      const querySnapshot = await getDocs(q);
      setIsFavorite(!querySnapshot.empty);
    } catch (err) {
      console.error("Error checking favorite status:", err);
      toast.error("Error checking favorite status");
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please sign in to add to favorites!");
      return;
    }

    if (!recipeData) {
      toast.error("Recipe data not available");
      return;
    }

    setIsLoading(true);
    try {
      const favoritesRef = collection(db, "favorites", user.uid, "recipes");

      if (isFavorite) {
        const q = query(favoritesRef, where("id", "==", parseInt(recipeId)));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        setIsFavorite(false);
        toast.success("Recipe removed from favorites");
      } else {
        const recipeToSave = {
          id: parseInt(recipeId),
          title: recipeData.title,
          image: recipeData.image,
          readyInMinutes: recipeData.readyInMinutes,
          servings: recipeData.servings,
        };

        await addDoc(favoritesRef, recipeToSave);
        setIsFavorite(true);
        toast.success("Recipe added to favorites");
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
      toast.error("Error updating favorites");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkFavorite();
  }, [user, recipeId]);

  return {
    isFavorite,
    isLoading,
    error,
    toggleFavorite,
  };
};
