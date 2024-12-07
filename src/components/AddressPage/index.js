import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./AddressPage.css";

const AddressPage = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState([51.505, -0.09]);
  const [error, setError] = useState("");
  const [area, setArea] = useState("Kazhakkuttam");
  const navigate = useNavigate();
  const handleSave = async () => {
    if (!name || !address || !phone) {
      setError("All fields are required.");
      return;
    }

    try {
      // Save data to Firestore
      await addDoc(collection(db, "addresses"), {
        name,
        area,
        address,
        phone,
        location, // Store location as an array (latitude and longitude)
      });

      alert("Address saved successfully!");
      // Clear the form
      setName("");
      setAddress("");
      setPhone("");
      setError("");
      setArea("Kazhakkuttam");
    } catch (err) {
      console.error("Error saving address: ", err);
      setError("Failed to save address. Please try again.");
    }
  };

  return (
    <section className="user-form">
      <h2>Add / Update User Details</h2>
      <input
        type="text"
        placeholder="Enter area name"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        maxLength={10}
        onChange={(e) => setPhone(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="map-container">
        <MapContainer
          center={location}
          zoom={13}
          style={{ height: "200px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </MapContainer>
      </div>
      <button className="save-btn" onClick={handleSave}>
        Save
      </button>
      <button className="go-home-btn" onClick={() => navigate("/")}>
        Go to home
      </button>
    </section>
  );
};

export default AddressPage;
