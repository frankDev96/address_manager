import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Header from "./components/Header";
import AddressPage from "./components/AddressPage";
import UserGroupsList from "./components/UserGroupsList";

const App = () => {
  return (
    <div className="container">
      {/* Header */}
      <Header />

      {/* Add / Update User Section */}
      {/* <AddressPage /> admin access only */}

      {/* User Groups Section */}
      <UserGroupsList />
    </div>
  );
};

export default App;
