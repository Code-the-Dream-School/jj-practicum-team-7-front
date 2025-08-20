import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import CreateChallengeModal from "./components/CreateChallenge";
import ChallengeDetailsModal from "./components/ChallengeDetails";

import ProtectedRoute from "./components/ProtectedRoute";

const URL = 'http://localhost:8000/api/v1/';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
          path="/challenge/:id"
          element={
            <ProtectedRoute>
              <ChallengeDetailsModal />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
