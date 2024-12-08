import React, { useEffect, useState } from "react";
import { arrayUnion, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Import the db object
import { useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal";

const ApproveAdmin = () => {
  const [uid, setUid] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const [area, setArea] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  console.log('adminLoggedInadminLoggedIn', adminLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      openModal()
    }, 10);
    return () => {
      setAdminLoggedIn(false)
    }
  }, [])


  const addAdminRole = async (uid) => {
    try {
      if (adminLoggedIn) {
        await setDoc(doc(db, "users", uid), { role: "admin" }, { merge: true });
        setMessage("Admin role added successfully!");
      } else {
        setMessage("Admin login required");
      }
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
  const addAreaToList = async (area) => {
    try {
      if (true) {
        const docRef = doc(db, "area_list", "areas");
        await setDoc(
          docRef,
          {
            areas: arrayUnion(area),
          },
          { merge: true }
        );

        setMessage("Area added successfully!");
      } else {
        setMessage("Admin login required");
      }
    } catch (error) {
      setMessage(`Error adding admin role: ${error.message}`);
    }
  };

  const handleSubmitArea = (e) => {
    e.preventDefault();
    if (area.trim() === "") {
      setMessage("Area cannot be empty.");
      return;
    }
    addAreaToList(area);
  };

  return (
    <div style={styles.container}>
      <button className="admin-login-btn" onClick={openModal}>
        Admin Login
      </button>
      <LoginModal isOpen={isOpen} onClose={closeModal} onsuccessLogin={() => { setAdminLoggedIn(true) }} />
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
      <div style={{ marginTop: 20, marginBottom: 20, height: 2, backgroundColor: 'grey' }} />
      <form onSubmit={handleSubmitArea} style={styles.form}>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Enter Area name"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Area
        </button>
        <button className="go-home-btn" onClick={() => navigate("/")}>
          Go to home
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
