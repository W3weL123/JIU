import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // STEP 1
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // STEP 2 - Address
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [barangay, setBarangay] = useState("");
  const [street, setStreet] = useState("");
  const [isNCR, setIsNCR] = useState(false);

  // Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  /* ===== FETCH REGIONS ===== */
  useEffect(() => {
    fetch("https://psgc.gitlab.io/api/regions/")
      .then(res => res.json())
      .then(data => setRegions(data));
  }, []);

  /* ===== REGION CHANGE ===== */
  useEffect(() => {
    if (!region) return;

    setProvince("");
    setCity("");
    setBarangay("");
    setCities([]);
    setBarangays([]);

    if (region === "130000000") {
      setIsNCR(true);
      setProvinces([]);

      fetch(`https://psgc.gitlab.io/api/regions/${region}/cities-municipalities`)
        .then(res => res.json())
        .then(data => setCities(data));
    } else {
      setIsNCR(false);

      fetch(`https://psgc.gitlab.io/api/regions/${region}/provinces`)
        .then(res => res.json())
        .then(data => setProvinces(data));
    }
  }, [region]);

  /* ===== PROVINCE CHANGE ===== */
  useEffect(() => {
    if (!province || isNCR) return;

    fetch(`https://psgc.gitlab.io/api/provinces/${province}/cities-municipalities`)
      .then(res => res.json())
      .then(data => setCities(data));
  }, [province, isNCR]);

  /* ===== CITY CHANGE ===== */
  useEffect(() => {
    if (!city) return;

    fetch(`https://psgc.gitlab.io/api/cities-municipalities/${city}/barangays`)
      .then(res => res.json())
      .then(data => setBarangays(data));
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const address = `${street}, ${barangay}, ${city}${isNCR ? "" : ", " + province}`;

    console.log({
      name,
      birthdate,
      phone,
      email,
      address,
      password,
    });

    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">JIU</div>
        <ul className="nav-links">
          <li><a onClick={() => navigate("/")}>Home</a></li>
          <li><a>Member</a></li>
          <li><a>Location</a></li>
        </ul>
      </nav>

      {/* REGISTER */}
      <section className="auth-hero">
        <div className="auth-card">
          <h1>Create Account</h1>
          <p className="login-subtitle">
            Jesus Is Unity Church Registration
          </p>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} required />
                <input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
                <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />

                <button type="button" className="primary-btn" onClick={() => setStep(2)}>
                  Next →
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <select value={region} onChange={e => setRegion(e.target.value)} required>
                  <option value="">Select Region</option>
                  {regions.map(r => (
                    <option key={r.code} value={r.code}>{r.name}</option>
                  ))}
                </select>

                {!isNCR && (
                  <select value={province} onChange={e => setProvince(e.target.value)} required>
                    <option value="">Select Province</option>
                    {provinces.map(p => (
                      <option key={p.code} value={p.code}>{p.name}</option>
                    ))}
                  </select>
                )}

                <select value={city} onChange={e => setCity(e.target.value)} required>
                  <option value="">Select City / Municipality</option>
                  {cities.map(c => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>

                <select value={barangay} onChange={e => setBarangay(e.target.value)} required>
                  <option value="">Select Barangay</option>
                  {barangays.map(b => (
                    <option key={b.code} value={b.name}>{b.name}</option>
                  ))}
                </select>

                <input placeholder="Street / House No." value={street} onChange={e => setStreet(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

                <div className="step-buttons">
                  <button type="button" className="secondary-btn" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button type="submit" className="primary-btn">
                    Register
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="back-home" onClick={() => navigate("/login")}>
            ← Back to Login
          </p>
        </div>
      </section>
    </>
  );
}
