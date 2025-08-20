import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFound";

import CreateChallengeModal from "./components/CreateChallenge";
import ChallengeDetailsModal from "./components/ChallengeDetails";

import ProtectedRoute from "./components/ProtectedRoute";

const URL = 'http://localhost:8000/api/v1/';

const isLoggedIn = false; // for now, just placeholder

function App() {

  const [message, setMessage] = useState('');

  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData.data);
    })();

    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenge/new"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CreateChallengeModal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenge/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ChallengeDetailsModal />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App
