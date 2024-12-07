import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Header from "./components/Header";
import AddressPage from "./components/AddressPage";
import UserGroupsList from "./components/UserGroupsList";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ApproveAdmin from "./components/ApproveAdmin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/add-address"
          element={"user" ? <AddressPage /> : <Navigate to="/" />}
        />
        <Route path="/" element={<UserGroupsList />} />
        <Route path="/ApproveAdmin" element={<ApproveAdmin />} />
      </Routes>
    </Router>
  );
};

export default App;
