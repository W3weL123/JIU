import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

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

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">JIU</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#schedule">Member</a></li>
          <li><a href="#location">Location</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <h1>Jesus Is Unity Church</h1>

        <p className="tagline">
          One Body. One Spirit. One Lord.
        </p>

        <p className="verse">
          “Make every effort to keep the unity of the Spirit through the bond of peace.”
          <br />
          <span>— Ephesians 4:3</span>
        </p>

        <div className="buttons">
          <button
            className="btn-join"
            onClick={() => navigate("/login")}
          >
            Join Us
          </button>

          <button className="secondary">
            Our Ministries
          </button>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="events">
        <h2>Weekly Schedule</h2>
        <div className="event-cards">
          <div className="card">Sunday Worship – 9:00 AM</div>
          <div className="card">Youth Fellowship – Saturday</div>
          <div className="card">Prayer Night – Friday</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Jesus Is Unity Church</p>
      </footer>
    </>
  );
}
