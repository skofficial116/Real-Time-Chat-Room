import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
// import { handleError } from "../utils/utils";
import { toast } from "react-toastify";
import { SlPeople } from "react-icons/sl";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFromLocal = () => {
      const p = JSON.parse(localStorage.getItem("user"));

      if (p) {
        setUser(p);
      } else {
        console.log("No user found in localStorage");
      }
    };

    const fetchRooms = async () => {
      let url = `${import.meta.env.VITE_API_URL}/room/getAllRooms`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include"
      });
      const result = await response.json();

      console.log(result);

      if (result.success) {
        setRooms(result.rooms);
      } else {
        toast.error("Error in loading the Chat Rooms.");
      }
    };

    fetchUserFromLocal();
    fetchRooms();
  }, []);

  return user ? (
    <>
      <div className="home-container">
        <header className="home-header">
          <h1>
            Welcome, <span>{user.name}</span> 👋
          </h1>
          <p className="sub-text">Your personalised dashboard</p>
        </header>

        <section className="user-card">
          <h2>User Details</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Member Since:</strong>{" "}
            {new Date(user.memberSince).toDateString()}
          </p>
        </section>

        {/* Easily add more components below */}
        <section className="rooms-section">
          <h2>Available Chat Rooms</h2>
          <br />
          {rooms.length === 0 ? (
            <p>No rooms available.</p>
          ) : (
            <div className="rooms-list">
              {rooms.map((room) => (
                <div className="room-card" key={room._id}>
                  <h3>{room.name}</h3>
                  <p>{room.description}</p>

                  <div className="room-footer">
                    
                    <span>
                         <SlPeople color="#ffcc00ff" size={18} />
                     {"  "}
                      {room.activeMembers} active
                    </span>
                    <button onClick={() => navigate(`/chat/${room._id}`)}>
                      Join Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  ) : (
    <>
      <div className="home-container">
        <header className="home-header">
          <h1>Welcome to the Live Chat Room</h1>
          <br />
          <h2>Kindly Login/Sign Up to access this page</h2>
        </header>

        <button onClick={() => navigate("/login")}>Login</button>
        <br></br>
        <button onClick={() => navigate("/signup")}>SignUp</button>
      </div>
    </>
  );
}
