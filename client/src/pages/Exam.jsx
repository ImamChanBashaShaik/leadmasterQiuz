// src/pages/Exam.js
import React, { useEffect, useMemo, useState } from "react";
import api, { setAuthToken } from "../api/api";
import QuestionCard from "../components/QuestionCard";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

export default function Exam() {
  const [questions, setQuestions] = useState([]);
  const [answersMap, setAnswersMap] = useState({}); // { questionId: selectedOptionIndex }
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      nav("/login");
      return;
    }
    setAuthToken(token);
    fetchQuestions();
    // eslint-disable-next-line
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/exam/questions");
      // backend returns question objects. If backend stored correctAnswer field, remove it from UI object
      const q = res.data.map(obj => {
        const { correctAnswer, ...rest } = obj; // remove correctAnswer on client-side for safety
        return rest;
      });
      setQuestions(q);
    } catch (err) {
      alert(err?.response?.data?.message || "Could not fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId, index) => {
    setAnswersMap(prev => ({ ...prev, [questionId]: index }));
  };

  const handleNext = () => {
    setCurrent(i => Math.min(i + 1, questions.length - 1));
  };
  const handlePrev = () => {
    setCurrent(i => Math.max(i - 1, 0));
  };

  // prepare answers array for submit: [{ questionId, selectedOption }]
  const answersArray = useMemo(() => {
    return Object.entries(answersMap).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption
    }));
  }, [answersMap]);

  const submitExam = async () => {
    try {
      const res = await api.post("/exam/submit", { answers: answersArray });
      // res.data: { message, score, submissionId } - if your backend didn't return submissionId, we updated earlier in conversation
      const submissionId = res.data.submissionId || res.data._id || res.data.id; // try common names
      alert(`Exam submitted! Score: ${res.data.score}`);
      if (submissionId) {
        nav(`/result/${submissionId}`);
      } else {
        nav("/result"); // fallback
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Submit failed");
    }
  };

  const handleTimeUp = () => {
    // auto submit when time finishes
    submitExam();
  };

  if (loading) return <div>Loading...</div>;
  if (!questions.length) return <div>No questions available</div>;

  const currentQuestion = questions[current];
  const selectedForCurrent = answersMap[currentQuestion._id];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2>Exam</h2>
        <Timer initialSeconds={30 * 60} onTimeUp={handleTimeUp} />
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong>Question {current + 1} / {questions.length}</strong>
      </div>

      <QuestionCard
        question={currentQuestion}
        selected={selectedForCurrent}
        onSelect={handleSelect}
      />

      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button onClick={handlePrev} disabled={current === 0}>Previous</button>
        <button onClick={handleNext} disabled={current === questions.length - 1}>Next</button>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={submitExam}>Submit Exam</button>
        </div>
      </div>
    </div>
  );
}
