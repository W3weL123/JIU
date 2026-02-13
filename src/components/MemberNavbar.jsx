import { useNavigate } from "react-router-dom";
import "./MemberNavbar.css";

export default function MemberNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="member-navbar">
      <div className="logo" onClick={() => navigate("/homeprofile")}>
        JIU Church
      </div>

      <ul className="nav-links">
        <li onClick={() => navigate("/homeprofile")}>Feed</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li onClick={() => navigate("/location")}>Location</li>
        <li
          className="logout"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
}
