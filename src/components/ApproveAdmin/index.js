import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Import the db object

const ApproveAdmin = () => {
  const [uid, setUid] = useState("");
  const [message, setMessage] = useState("");

  const addAdminRole = async (uid) => {
    try {
      await setDoc(doc(db, "users", uid), { role: "admin" }, { merge: true });
      setMessage("Admin role added successfully!");
    } catch (error) {
      setMessage(`Error adding admin role: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (uid.trim() === "") {
      setMessage("UID cannot be empty.");
      return;
    }
    addAdminRole(uid);
  };

  return (
    <div style={styles.container}>
      <h1>Approve Admin</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          placeholder="Enter User UID"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Admin Role
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Basic styles for the component
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  message: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#333",
  },
};

export default ApproveAdmin;
