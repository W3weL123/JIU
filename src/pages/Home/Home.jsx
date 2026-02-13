import Navbar from "../../components/HomeNavbar";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

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

      <section id="events" className="events">
        <h2>Weekly Schedule</h2>
        <div className="event-cards">
          <div className="card">Sunday Worship – 9:30 AM</div>
          <div className="card">Bible Study – 7:30 PM Wednesday</div>
          <div className="card">Sunday School – 1:30 PM Sunday</div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Jesus Is Unity Church</p>
      </footer>
    </>
  );
}
