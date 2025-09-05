import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setError("");
      setSuccess(true); // ✅ Show success message
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        minHeight: "400px",
        margin: "auto",
        padding: "20px",
        borderRadius: "20px"
      }}
    >
      
        <h2 style={{ textAlign: "center"}}>Register Page</h2>
      {success ? (
        <>
         
         <div style={{textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
           <p style={{  color: "green", marginBottom:"20px", textAlign:"center"}}>
            ✅ Registration successful!
          </p>
         
          <button
            onClick={() => navigate("/")}
            style={{
              width: "90%",
              marginLeft: "10px",
              padding: "10px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Back to Home
          </button>
          </div>
        </>
          
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              style={{ width: "90%", padding: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
              style={{ width: "90%", padding: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              style={{ width: "90%", padding: "10px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
              style={{ width: "90%", padding: "10px" }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "90%",
              marginLeft: "10px",
              padding: "10px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Register
          </button>
          <p style={{ textAlign: "center" }}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      )}
    </div>
  );
}

export default Register;
