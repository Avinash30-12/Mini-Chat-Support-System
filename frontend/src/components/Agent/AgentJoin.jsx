import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgentJoin = () => {
  const navigate = useNavigate();
  const [agentId, setAgentId] = useState("");

  const handleJoin = () => {
    if (!agentId) return alert("Select an agent");
    localStorage.setItem("agentId", agentId);
    navigate("/agent-dashboard");
  };

  return (
    <div style={styles.container}>
      <h2>🧑‍💼 Join as Agent</h2>
      <select value={agentId} onChange={(e) => setAgentId(e.target.value)} style={styles.select}>
        <option value="">-- Select Agent --</option>
        <option value="agent_1">Alice</option>
        <option value="agent_2">Bob</option>
        <option value="agent_3">Charlie</option>
      </select>
      <button onClick={handleJoin} style={styles.button}>Enter Dashboard</button>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "40px" },
  select: { padding: "10px", margin: "20px" },
  button: { padding: "10px 20px", background: "#3498db", color: "white", border: "none", borderRadius: "6px" }
};

export default AgentJoin;
