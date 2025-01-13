import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Navbar />
            <Routes>
              {appRoutes.map((route) =>
                route.isProtected ? (
                  <Route key={route.path} element={<ProtectedRoute />}>
                    <Route path={route.path} element={<route.component />} />
                  </Route>
                ) : (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                  />
                )
              )}
            </Routes>
            <Footer />
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
