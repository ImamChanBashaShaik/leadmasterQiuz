// src/pages/ResultPage.js
import React, { useEffect, useState } from "react";
import api, { setAuthToken } from "../api/api";
import { useParams } from "react-router-dom";

export default function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    setAuthToken(token);
    (async () => {
      try {
        const res = await api.get(`/exam/result/${id}`);
        setResult(res.data);
      } catch (err) {
        alert(err?.response?.data?.message || "Could not fetch result");
      }
    })();
  }, [id, token]);

  if (!result) return <div>Loading result...</div>;

  return (
    <div style={{ maxWidth: 800}}>
      <h1>Exam Result</h1>
      <p><strong>User:</strong> {result.userId?.name} ({result.userId?.email})</p>
      <p><strong>Score:</strong> {result.score}</p>
      <p><strong>Submitted:</strong> {new Date(result.submittedAt).toLocaleString()}</p>

      <h3>Answers</h3>
      {result.answers.map((a) => (
        <div key={a._id} style={{ border: "1px solid #eee", padding: 8, marginBottom: 8 }}>
          <div><strong>Question ID:</strong> {a.questionId}</div>
          <div><strong>Your answer index:</strong> {a.selectedOption}</div>
        </div>
      ))}
    </div>
  );
}
