import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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

import ProtectedRoute from "./components/ProtectedRoute";


// Redirect authenticated users from login/register
const AuthenticatedUserRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const { pathname } = useLocation();
  if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

 return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticatedUserRoute><Landing /></AuthenticatedUserRoute>} />
        <Route path="/login" element={<AuthenticatedUserRoute><Login /></AuthenticatedUserRoute>} />
        <Route path="/register" element={<AuthenticatedUserRoute><Register /></AuthenticatedUserRoute>} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/challenge/new" element={<ProtectedRoute><CreateChallengeModal /></ProtectedRoute>} />
        <Route path="/challenge/:id" element={<ProtectedRoute><ChallengeDetailsModal /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}


export default App;
