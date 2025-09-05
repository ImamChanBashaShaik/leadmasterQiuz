// src/pages/Login.js
import React, { useState } from "react";
import api, { setAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      nav("/exam");
    } catch (err) {
      alert(err?.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"80px",
      }}
    >
      <div
        style={{
          minWidth: "400px",
          minHeight: "350px",
          margin: "auto",
          background: "white",
          padding: "20px",
          borderRadius:"20px"
        }}
      >
        <h2 style={{ textAlign: "center", display: "block" }}>Login page</h2>
        <form onSubmit={submit}>
          <div style={{ marginBottom: "8" }}>
            <label type="text">Email:</label>
            <input
              name="email"
              placeholder="Enter your Email"
              value={form.email}
              onChange={onChange}
              required
              style={{ width: "90%", padding: "10px" }}
            />
          </div>
          <br />
          <div style={{ marginBottom: "8" }}>
            <label type="Password">Password:</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your Password"
              value={form.password}
              onChange={onChange}
              required
              style={{ width: "90%", padding: 8 }}
            />
          </div>
          <button
            type="submit"
            style={{
              width:"80%",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              marginLeft:"30px",
              display: "block",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p style={{ textAlign: "center" }}>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
