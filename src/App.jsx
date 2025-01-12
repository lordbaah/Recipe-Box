import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from "./routes/routes";
import ProtectedRoute from "./routes/ProtectedRoute";

import Navbar from "./components/Navbar";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
