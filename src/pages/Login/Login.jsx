import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (!navbar) return;

      if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    alert("Login submitted (connect backend next)");
  };

  return (
    <>
      {/* NAVBAR (UNCHANGED) */}
      <nav className="navbar">
        <div className="logo">JIU</div>
        <ul className="nav-links">
          <li><a onClick={() => navigate("/")}>Home</a></li>
          <li><a>Member</a></li>
          <li><a>Location</a></li>
        </ul>
      </nav>

      {/* LOGIN SECTION */}
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
