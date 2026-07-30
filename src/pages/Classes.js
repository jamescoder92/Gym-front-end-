import { useState, useEffect } from "react";
import apiRequest from "../api/api";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadClasses();
  }, []);

  function loadClasses() {
    apiRequest("/classes")
      .then((data) => setClasses(data))
      .catch(() => setError("Could not load classes"));
  }

  function handleEnroll(classId) {
    setMessage("");
    apiRequest("/enrollments", {
      method: "POST",
      body: JSON.stringify({ class_id: classId }),
    })
      .then(() => setMessage("Enrolled successfully!"))
      .catch(() => setMessage("Enrollment failed"));
  }

  return (
    <div>
      <h2>Classes</h2>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <ul>
        {classes.map((c) => (
          <li key={c.id}>
            {c.name} with {c.instructor} — {c.schedule_time} (capacity: {c.capacity})
            <button onClick={() => handleEnroll(c.id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Classes;