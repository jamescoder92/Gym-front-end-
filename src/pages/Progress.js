import { useState, useEffect } from "react";
import apiRequest from "../api/api";

function Progress() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/workouts")
      .then((data) => setWorkouts(data))
      .catch(() => setError("Could not load workouts"));
  }, []);

  return (
    <div>
      <h2>Your Progress</h2>
      {error && <p>{error}</p>}
      <ul>
        {workouts.map((w) => (
          <li key={w.id}>
            {w.exercise} — {w.sets}x{w.reps} @ {w.weight}kg ({w.date})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Progress;