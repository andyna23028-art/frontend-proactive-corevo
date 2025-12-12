import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import googleIcon from "../images/google.png";
import "../styles/SignUp.css";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <div className="signup-page">
      {/* LEFT PANEL */}
      <div className="signup-left">
        <h2 className="brand">Corevo</h2>

        <div className="left-center">
          <div className="mock-shape" />

          <h3>Your Online Hub for Productivity & Focus</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="signup-right">
        <div className="signup-card">
          <h2>
            Start A <span>Productive</span> Journey <br />
            and Unlock Your Full Potential
          </h2>

          <button className="google-btn">
            <img src={googleIcon} alt="Google" />
            Sign up with Google
          </button>

          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" placeholder="Username" />

            <label>Email</label>
            <input type="email" placeholder="Email" />

            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <label>Confirm Password</label>
            <div className="password-field">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <span onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button type="submit" className="signup-btn">
              SIGN UP
            </button>
          </form>

          <p className="signin-link">
            Own an Account? <Link to="/signin">JUMP RIGHT IN</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
