import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeNavbar.css";

export default function Navbar() {
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
    <nav className="navbar">
      <div className="logo">JIU</div>
      <ul className="nav-links">
        <li><a onClick={() => navigate("/")}>Home</a></li>
        <li><a href="#events">About us</a></li>
        <li><a onClick={() => navigate("/location")}>Location</a></li>
      </ul>
    </nav>
  );
}
