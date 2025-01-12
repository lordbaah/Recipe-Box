import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
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
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
