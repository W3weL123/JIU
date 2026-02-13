import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Location.css";
import Navbar from "../../components/HomeNavbar";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const church = [14.860434037371075, 120.90163389821882];

function FitBounds({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length) {
      map.fitBounds(coords);
    }
  }, [coords, map]);
  return null;
}

export default function Location() {
  const navigate = useNavigate();
  const [routeCoords, setRouteCoords] = useState([]);

  const handleRoute = async () => {
    const originText = document.getElementById("origin-input").value;
    if (!originText) return alert("Enter your location");

    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${originText}`
    );
    const geoData = await geoRes.json();
    if (!geoData.length) return alert("Location not found");

    const origin = [
      parseFloat(geoData[0].lat),
      parseFloat(geoData[0].lon),
    ];

    const routeRes = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${church[1]},${church[0]}?overview=full&geometries=geojson`
    );
    const routeData = await routeRes.json();

    const coords = routeData.routes[0].geometry.coordinates.map((c) => [
      c[1],
      c[0],
    ]);

    setRouteCoords(coords);
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="location-hero">
        <h1>Find Us</h1>
        <p className="tagline">
          Visit Jesus Is Unity Church and worship with us
        </p>
      </section>

      {/* MAP SECTION */}
      <section className="map-section">
        <p className="address">
          JIU Church Balagtas Satellite, Balagtas, Bulacan, Philippines
        </p>

        <div className="map-container">
          <MapContainer
            center={church}
            zoom={14}
            style={{ height: "450px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={church}>
              <Popup>JIU Church</Popup>
            </Marker>

            {routeCoords.length > 0 && (
              <>
                <Polyline positions={routeCoords} />
                <FitBounds coords={routeCoords} />
              </>
            )}
          </MapContainer>
        </div>

        <div className="route-box">
          <input
            id="origin-input"
            type="text"
            placeholder="Enter your location"
          />
          <button onClick={handleRoute}>Show Route</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Jesus Is Unity Church</p>
      </footer>
    </>
  );
}
