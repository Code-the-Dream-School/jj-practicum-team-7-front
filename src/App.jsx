import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import OAuthSuccess from "./pages/OAuthSuccess"; 

import CreateChallengeModal from "./components/CreateChallenge";

import ProtectedRoute from "./components/ProtectedRoute";

const URL = 'http://localhost:8000/api/v1/';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenge/new"
          element={
            <ProtectedRoute >
              <CreateChallengeModal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/challenge/:id"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
