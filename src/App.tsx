import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

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
      <Link to="/" className="logo">📚 LMI</Link>

      {/* ROW 1 RIGHT - G at Logout, pantay kay LMI */}
      <div className="nav-user">
        {user ? (
          <>
            <span style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#dc2626",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "16px",
            }}>
              {initial}
            </span>
            <button className="btn btn-small" onClick={handleLogout}>Logout</button>
          </>
        ) : location.pathname !== "/login" && (
          <Link to="/login" className="btn btn-small btn-primary">Login</Link>
        )}
      </div>

      {/* ROW 2 - Dashboard | Books | Borrowed | Add Book */}
      <div className="nav-links">
        {user && (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/books">Books</Link>
            <Link to="/borrowed">Borrowed</Link>
          </>
        )}
        {user && <Link to="/add">Add Book</Link>}
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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
  <Navbar />
  <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <Routes>
    
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
<Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
<Route path="/books" element={user ? <Books /> : <Navigate to="/login" replace />} />
<Route path="/add" element={user ? <AddBook /> : <Navigate to="/login" replace />} />
<Route path="/borrowed" element={user ? <Borrowed /> : <Navigate to="/login" replace />} />
      </Routes>
      </main>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}