import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import RecipeCard from "../components/RecipeCard";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

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
        const fetchedFavorites = querySnapshot.docs.map((doc) => doc.data());
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

  return (
    <section>
      <div className="custom-screen">
        {loading && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-lg text-red-600">{error}</p>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          {/* User Info Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            {userData && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-2">
                  Welcome, {userData.firstName} {userData.lastName}!
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
          <div>
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
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
