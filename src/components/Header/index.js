import React from "react";

const Header = ({
  title = "User Management",
  description = "Manage User Information Efficiently",
  onClick = () => {},
}) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p>{description}</p>
      <button className="admin-login-btn" onClick={onClick}>
        Admin Login
      </button>
    </header>
  );
};

export default Header;
