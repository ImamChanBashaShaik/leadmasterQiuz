// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <nav style={{ background:"grey", margin:"0", padding: 12, display: "flex", justifyContent:"space-between", borderBottom: "1px solid #eee", marginBottom: 16 }}>
       <div style={{ display:"flex", justifyContent:"start", fontWeight: "bold", fontSize: "30px", color: "#333" }}>
    Lead Masters Exam page
  </div>
      <div style={{display:"flex", gap:"10px"}}>
      {!token ? (
        <>
          <Link to="/login"> <button>Login</button></Link>
          <Link to="/register"> <button>Register</button></Link>
          <Link to="/exam"> <button>Exam</button></Link>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      </div>
    </nav>
  );
}
