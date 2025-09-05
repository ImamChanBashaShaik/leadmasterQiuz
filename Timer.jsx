// src/components/Timer.js
import React, { useEffect, useState } from "react";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Timer({ initialSeconds, onTimeUp }) {
  const [sec, setSec] = useState(initialSeconds);

  useEffect(() => {
    const t = setInterval(() => {
      setSec(prev => {
        if (prev <= 1) {
          clearInterval(t);
          onTimeUp && onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [initialSeconds, onTimeUp]);

  return (
    <div style={{
      padding: "8px 12px",
      borderRadius: 8,
      background: "#fff",
      display: "inline-block",
      border: "1px solid #e6e6e6",
      fontWeight: 600
    }}>
      Time remaining: {formatTime(sec)}
    </div>
  );
}
