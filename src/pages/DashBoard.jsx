import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
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
        <h1>Welcome to DashBoard </h1>
        {userData ? (
          <h2>
            Hello, {userData.firstName} {userData.lastName}!
          </h2>
        ) : (
          <p>Loading user data...</p>
        )}

        <h2>Your Favorites:</h2>
        {loading && <div>Loading Favorites...</div>}
        {error && <div>Error loading favorites: {error.message}</div>}
        {favorites.length === 0 ? (
          <p>You have no favorites yet.</p>
        ) : (
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.id}>
                <Link to={`/recipes/${favorite.id}`}>
                  {favorite.title} - Price: ${favorite.price}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <button onClick={handleLogout}>Log Out</button>
      </div>
    </section>
  );
};

export default Dashboard;
