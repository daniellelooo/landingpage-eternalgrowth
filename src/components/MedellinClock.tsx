import React, { useEffect, useState } from "react";
import "./EternalGrowthLanding.css";

const MedellinClock: React.FC = () => {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const t = now.toLocaleTimeString("es-CO", {
        timeZone: "America/Bogota",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const d = now.toLocaleDateString("es-CO", {
        timeZone: "America/Bogota",
        weekday: "short",
        day: "2-digit",
        month: "short",
      });
      setTimeStr(t);
      setDateStr(d);
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="medellin-clock" aria-label="Hora de Medellín">
      <div className="clock-label">medellin:</div>
      <div className="clock-time">{timeStr}</div>
      <div className="clock-date">{dateStr}</div>
    </div>
  );
};

export default MedellinClock;
