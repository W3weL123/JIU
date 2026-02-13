import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../../components/HomeNavbar";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError("Invalid email or password");
        return;
      }

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      navigate("/HomeFeed");

    } catch (err) {
      setError("Cannot connect to server");
    }
  };

  return (
    <>
      <Navbar />

      <section className="login-hero">
        <div className="login-card">
          <h1>Welcome Back</h1>
          <p className="login-subtitle">
            Login to Jesus Is Unity Church
          </p>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="primary-btn">
              Login
            </button>
          </form>

          <p className="register-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>
              Register here
            </span>
          </p>

          <p className="back-home" onClick={() => navigate("/")}>
            ← Back to Home
          </p>
        </div>
      </section>
    </>
  );
}
