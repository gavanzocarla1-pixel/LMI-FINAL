import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
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
        {user && (
  <>
    <Link to="/">Dashboard</Link>
    <Link to="/books">Books</Link>
    <Link to="/borrowed">Borrowed</Link>
  </>
)}
        {user && <Link to="/add">Add Book</Link>}
        {user ? (
          <>
            <span
              title={user.email}
              style={{
                width: "32px",
                height: "32px",
                background: "white",
                color: "#9B1B30",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {initial}
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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div style={{padding: 40, textAlign: "center"}}>Loading...</div>;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
<Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
<Route path="/books" element={user ? <Books /> : <Navigate to="/login" replace />} />
<Route path="/add" element={user ? <AddBook /> : <Navigate to="/login" replace />} />
<Route path="/borrowed" element={user ? <Borrowed /> : <Navigate to="/login" replace />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}