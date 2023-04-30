import React from "react";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to="/login" state="valid">Go to Login Page</Link>
    </>
  );
};

export default Home;
