import React, { useState, useEffect } from "react";
import Header from "../Header";
import LoginModal from "../LoginModal";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const UserGroupsList = () => {
  const [groups, setGroups] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "addresses"));
        const data = {};

        querySnapshot.forEach((doc) => {
          const entry = doc.data();
          const area = entry.area || "Unknown Area";
          if (!data[area]) {
            data[area] = [];
          }
          data[area].push({
            name: entry.name,
            address: entry.address,
            phone: entry.phone,
          });
        });

        setGroups(data);
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, [db]);

  return (
    <div className="container">
      <Header title="User Groups by Area" description="" onClick={openModal} />
      <LoginModal isOpen={isOpen} onClose={closeModal} />
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
                    <p className="user-name">Name: {user.name}</p>
                    <p className="user-address">Address: {user.address}</p>
                  </div>
                  <button className="contact-btn">Phone:📞 {user.phone}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserGroupsList;
