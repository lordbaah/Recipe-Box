import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import RecipeCard from "../components/RecipeCard";
import { toast } from "react-toastify";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import DashBoardSkeleton from "../components/Loaders/DashBoardSkeleton";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { logOut, user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // Fetch user document from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Set user data
          } else {
            console.log("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // console.log(userData);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      try {
        const favoritesRef = collection(db, "favorites", user.uid, "recipes");
        const querySnapshot = await getDocs(favoritesRef);
        const fetchedFavorites = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id, // Store the document ID for deletion
        }));
        setFavorites(fetchedFavorites);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRemoveFavorite = async (recipeId) => {
    if (!user) return;

    try {
      // Convert recipeId to number to match the stored format
      const numericId = parseInt(recipeId);

      // Find the document that matches the recipe ID
      const favoritesRef = collection(db, "favorites", user.uid, "recipes");
      const q = query(favoritesRef, where("id", "==", numericId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first matching document and delete it
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(docToDelete.ref);

        // Update local state using numeric comparison
        setFavorites((prevFavorites) =>
          prevFavorites.filter((recipe) => recipe.id !== numericId)
        );
        toast.success("Recipe removed from favorites");
      }
    } catch (err) {
      console.error("Error removing favorite:", err);
      setError("Failed to remove favorite recipe");
    }
  };

  return (
    <section>
      <div className="custom-screen">
        {loading && <DashBoardSkeleton />}

        {error && (
          <div className="text-center py-12">
            <p className="text-lg text-red-600">{error}</p>
          </div>
        )}

        {/* User Info Section */}
        <div className="mb-8">
          {!loading && userData && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">
                Welcome to your Dashboard, {userData.firstName}{" "}
                {userData.lastName}!
              </h2>
              <p className="text-gray-600 mb-4">{userData.email}</p>
              <button
                onClick={handleLogout}
                className="bg-clr-pink text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                Log Out
              </button>
            </div>
          )}
        </div>

        {/* Favorites Section */}
        {!loading && !error && favorites && (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Favorite Recipes</h2>
            {favorites.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-600">
                  You haven't saved any recipes yet.
                </p>
                <Link
                  to="/recipes"
                  className="text-clr-pink hover:underline mt-2 inline-block">
                  Browse Recipes
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {favorites.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    readyInMinutes={recipe.readyInMinutes}
                    servings={recipe.servings}
                    isDashboard={true}
                    onRemoveFavorite={handleRemoveFavorite}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
