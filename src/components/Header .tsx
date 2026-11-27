import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1>📚 LMI - Library Management</h1>
      <nav>
        <NavLink to="/" end style={({ isActive }) => ({ borderBottom: isActive ? "4px solid #FFD700" : "none", paddingBottom: "4px", fontWeight: isActive ? "bold" : "normal" })}>Dashboard</NavLink>
        <NavLink to="/books" style={({ isActive }) => ({ borderBottom: isActive ? "4px solid #FFD700" : "none", paddingBottom: "4px", fontWeight: isActive ? "bold" : "normal" })}>Books</NavLink>
        <NavLink to="/add" style={({ isActive }) => ({ borderBottom: isActive ? "4px solid #FFD700" : "none", paddingBottom: "4px", fontWeight: isActive ? "bold" : "normal" })}>Add Book</NavLink>
        <NavLink to="/borrowed" style={({ isActive }) => ({ borderBottom: isActive ? "4px solid #FFD700" : "none", paddingBottom: "4px", fontWeight: isActive ? "bold" : "normal" })}>Borrowed</NavLink>
        <NavLink to="/login" style={({ isActive }) => ({ borderBottom: isActive ? "4px solid #FFD700" : "none", paddingBottom: "4px", fontWeight: isActive ? "bold" : "normal" })}>Login</NavLink>
      </nav>
    </header>
  );
}