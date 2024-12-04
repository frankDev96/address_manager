import React, { useState } from "react";

const UserGroupsList = () => {
  const [groups, setGroups] = useState({
    "New York": [
      { name: "John Doe", address: "456 7th Ave, NY", phone: "123-456-7890" },
      { name: "John Doe", address: "456 7th Ave, NY", phone: "123-456-7890" },
    ],
    Chicago: [
      {
        name: "Jane Smith",
        address: "403 Elm St, Chicago",
        phone: "987-654-3210",
      },
    ],
  });
  return (
    <section className="user-groups">
      <h2>User Groups by Area</h2>
      {Object.entries(groups).map(([area, users]) => (
        <div key={area} className="group">
          <div className="group-header">
            <h3>{area}</h3>
            <button className="expand-btn">Expand</button>
          </div>
          <ul className="user-list">
            {users.map((user, index) => (
              <li key={index} className="user-item">
                <div className="user-details">
                  <p className="user-name">{user.name}</p>
                  <p className="user-address">{user.address}</p>
                </div>
                <button className="contact-btn">📞 {user.phone}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default UserGroupsList;
