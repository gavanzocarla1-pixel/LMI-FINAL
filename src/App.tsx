import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import Borrowed from "./pages/Borrowed";
import Login from "./pages/Login";
import "./App.css";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const initial = user?.email ? user.email.charAt(0).toUpperCase() : "";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">📚 LMI Library</Link>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/books">Books</Link>
        <Link to="/borrowed">Borrowed</Link>
        {user && <Link to="/add">Add Book</Link>}
        {user ? (
          <>
            <span
              title={user.email}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                maxWidth: "170px",
                fontSize: "13px",
                color: "#fff",
                background: "rgba(255,255,255,0.15)",
                padding: "5px 10px",
                borderRadius: "20px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <span
                style={{
                  width: "22px",
                  height: "22px",
                  background: "white",
                  color: "#9B1B30",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                {initial}
              </span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</span>
            </span>
            <button className="btn btn-small" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn btn-small btn-primary">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/borrowed" element={<Borrowed />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}