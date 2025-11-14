import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [user, setUser] = useState(null);
//   const [rooms, setRooms] = useState([]);

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
      });
      const result=await response.json()

      console.log(result);

      if(result.success){

      }else{
        
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
        <section className="placeholder-section">
          <h2>More Components</h2>
          <p>Add anything here — cards, charts, stats, lists, etc.</p>
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
