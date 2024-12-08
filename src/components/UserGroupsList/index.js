import React, { useState, useEffect } from "react";
import Header from "../Header";
import LoginModal from "../LoginModal";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import './UserGroupsList.css'
import { useNavigate } from "react-router-dom";

const UserGroupsList = () => {
  const [groups, setGroups] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "addresses"));
        const data = {};

        querySnapshot.forEach((doc) => {
          const entry = doc.data();
          const area = entry.area || "Unknown Area";
          if (!data[area]) {
            data[area] = { list: [], expand: false }
          }
          data[area].list.push({
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

  const toggleExpand = (locationKey) => {
    setGroups((prevGroups) => {
      const updatedGroups = { ...prevGroups };
      updatedGroups[locationKey] = {
        ...updatedGroups[locationKey],
        expand: !updatedGroups[locationKey].expand,
      };
      return updatedGroups;
    });
  }

  return (
    <div className="container">
      <Header title="User Groups by Area" description="" onClick={openModal} />
      <LoginModal isOpen={isOpen} onClose={closeModal} onsuccessLogin={() => { navigate("/add-address") }} />
      <section className="user-groups">
        <h2>User Groups by Area</h2>
        {Object.entries(groups).map(([area, users]) => {
          return (
            <div key={area} className="group">
              <div className="group-header">
                <h3>{area}</h3>
                <button className="expand-btn" onClick={() => toggleExpand(area)}>Expand</button>
              </div>
              {users?.expand && <ul className="user-list">
                {users?.list?.map((user, index) => (
                  <li key={index} className="user-item">
                    <div className="user-details">
                      <p className="user-name">Name: {user.name}</p>
                      <p className="user-address">Address: {user.address}</p>
                    </div>
                    <a href={`tel:${user.phone}`} className="phoneLink" >
                      Phone:📞 {user.phone}</a>
                  </li>
                ))}
              </ul>}
            </div>
          )
        })}
      </section>
    </div>
  );
};

export default UserGroupsList;
