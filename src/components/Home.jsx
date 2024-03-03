/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

function Home() {
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInTime, setSignInTime] = useState(null);
  const [signOutTime, setSignOutTime] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkSignInStatus();
    const interval = setInterval(() => {
      setCurrentDate(DateTime.now().toFormat("dd/MM/yy"));
      setCurrentTime(DateTime.now().toFormat("hh:mm:ss a"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkSignInStatus = async () => {
    const token = localStorage.getItem("token");
    const isSignedInStorage = localStorage.getItem("isSignedIn") === "true";
    setIsSignedIn(isSignedInStorage);
    if (token && isSignedInStorage) {
      try {
        const response = await axios.get("http://localhost:5000/api/signin", {
          headers: { Authorization: token },
        });
        if (response.data.signInTime) {
          setSignInTime(response.data.signInTime);
          if (response.data.signOutTime) {
            setSignOutTime(response.data.signOutTime);
          }
        }
      } catch (error) {
        console.error("Error fetching sign-in status:", error);
      }
    }
  };

  const handleSignIn = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/signin",
          null,
          { withCredentials: true }
        );
        setSignInTime(response.data);
        setIsSignedIn(true);
        localStorage.setItem("isSignedIn", "true");
        setSuccessMessage("Sign-in successful.");
      } catch (error) {
        console.error("Sign-in failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignOut = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setLoading(true);
        await axios.post("http://localhost:5000/api/signout", null, {
          withCredentials: true,
        });
        setSignOutTime(DateTime.now().toFormat("hh:mm:ss a"));
        setIsSignedIn(false);
        localStorage.setItem("isSignedIn", "false");
        setSuccessMessage("Sign-out successful.");
      } catch (error) {
        console.error("Sign-out failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

const handleLogout = () => {
  // Remove token from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("isSignedIn");
  setIsSignedIn(false);

  // Clear authToken cookie
  document.cookie =
    "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect to home page
  navigate("/");
};


  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  return (
    <div className="h-[500px] flex flex-col justify-center items-center bg-slate-100">
      <div className="w-[350px] h-[400px] border-4 flex flex-col justify-center gap-6 items-center bg-slate-200 outline-white border-slate-400 relative">
        <h2 className="font-bold absolute top-4">Home</h2>
        <p className="absolute top-16"> {currentDate}</p>
        <p className="absolute top-28"> {currentTime}</p>
        {isSignedIn ? (
          <div className="flex flex-col items-center">
            <button
              className="bg-red-500 border-2 w-[120px] h-[30px] mt-4 rounded-lg"
              onClick={handleSignOut}
              disabled={loading}
            >
              Sign Out
            </button>
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
          </div>
        ) : (
          <button
            className="bg-slate-300 border-2 w-[120px] h-[30px] mt-8 rounded-lg"
            onClick={handleSignIn}
            disabled={loading}
          >
            Sign In
          </button>
        )}
        <button
          className="bg-slate-300 border-2 w-[200px] h-[40px] mt-4 p-2 rounded-lg"
          onClick={() => navigate("/attendance-report")}
        >
          View Attendance Report
        </button>
      </div>
      <button
        className="bg-red-500 border-2 w-[120px] h-[30px] absolute top-5 right-10 rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
