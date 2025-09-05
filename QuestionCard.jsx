// src/components/QuestionCard.js
import React from "react";

export default function QuestionCard({ question, selected, onSelect }) {
  // question object fields: _id, question, options (array)
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, marginBottom: 12, borderRadius: 8 }}>
      <h3 style={{ margin: "0 0 8px 0" }}>{question.question}</h3>

      <div>
        {question.options.map((opt, idx) => (
          <label key={idx} style={{ display: "block", margin: "6px 0", cursor: "pointer" }}>
            <input
              type="radio"
              name={question._id}
              checked={selected === idx}
              onChange={() => onSelect(question._id, idx)}
              style={{ marginRight: 8 }}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
