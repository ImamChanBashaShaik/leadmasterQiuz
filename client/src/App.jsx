// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Exam from "./pages/Exam";
import ResultPage from "./pages/ResultPage";
import Navbar from "./components/Navbar";
import { setAuthToken } from "./api/api";
import './App.css';


function App() {
  // load token from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
  }, []);

  return (
    <Router>
      <div style={{ padding: 16 }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/exam" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
