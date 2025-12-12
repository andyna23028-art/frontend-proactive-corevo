import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import googleIcon from "../images/google.png";
import logo from "../images/logo.png";
import "../styles/Auth.css";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    localStorage.setItem("token", "dummy-token");
    navigate("/home");
  };

  return (
    <div className="auth-page">
      {/* LEFT */}
      <div className="auth-left">
        <h2 className="brand">Corevo</h2>

        <div className="left-center">
          <img src={logo} alt="Corevo logo" className="mock-shape" />
          <h3>
            Your Online Hub for <br /> Productivity & Focus
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>
            Welcome <span>Back</span>
          </h2>

          <button className="google-btn">
            <img src={googleIcon} alt="Google" />
            Sign in with Google
          </button>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button type="submit" className="auth-btn">
              SIGN IN
            </button>
          </form>

          <p className="auth-footer">
            Need an account? <Link to="/signup">CREATE ONE</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
