import { useState, useEffect } from "react";
import apiRequest from "../api/api";

function Membership() {
  const [membership, setMembership] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/membership")
      .then((data) => setMembership(data))
      .catch(() => setError("No membership found"));
  }, []);

  return (
    <div>
      <h2>Membership</h2>
      {error && <p>{error}</p>}
      {membership && (
        <div>
          <p>Plan: {membership.plan_type}</p>
          <p>Status: {membership.status}</p>
          <p>Start: {membership.start_date}</p>
          <p>End: {membership.end_date}</p>
        </div>
      )}
    </div>
  );
}

export default Membership;