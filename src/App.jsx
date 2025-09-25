import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import OAuthSuccess from "./pages/OAuthSuccess";
import useAuthStore from "./store/useAuthStore";

import CreateChallengeModal from "./components/CreateChallenge";
import ChallengeDetailsModal from "./components/ChallengeDetails";

import RouteGuard from "./components/RouteGuard";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard requiresAuth={false}>
              <Landing />
            </RouteGuard>
          }
        />
        <Route
          path="/login"
          element={
            <RouteGuard requiresAuth={false}>
              <Login />
            </RouteGuard>
          }
        />
        <Route
          path="/register"
          element={
            <RouteGuard requiresAuth={false}>
              <Register />
            </RouteGuard>
          }
        />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route
          path="/dashboard"
          element={
            <RouteGuard requiresAuth={true}>
              <Dashboard />
            </RouteGuard>
          }
        />
        <Route
          path="/challenge/new"
          element={
            <RouteGuard requiresAuth={true}>
              <CreateChallengeModal />
            </RouteGuard>
          }
        />
        <Route
          path="/challenge/:id"
          element={
            <RouteGuard requiresAuth={true}>
              <ChallengeDetailsModal />
            </RouteGuard>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
