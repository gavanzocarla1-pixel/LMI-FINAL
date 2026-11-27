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

  return (
    <nav className="navbar">
      <Link to="/" className="logo">📚 LMI Library</Link>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/books">Books</Link>
        <Link to="/borrowed">Borrowed</Link>
        <Link to="/add">Add Book</Link>
        {user ? (
          <>
            <span style={{ fontSize: "13px", color: "#666" }}>{user.email}</span>
            <button className="btn btn-small" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn btn-small btn-primary">Login</Link>
        )}

        <footer/>
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
    </BrowserRouter>
  );
}