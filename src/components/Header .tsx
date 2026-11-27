import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">LMI Library</div>
      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-active" : ""}>Dashboard</NavLink>
        <NavLink to="/books" className={({ isActive }) => isActive ? "nav-active" : ""}>Books</NavLink>
        <NavLink to="/borrowed" className={({ isActive }) => isActive ? "nav-active" : ""}>Borrowed</NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? "nav-active" : ""}>Add Book</NavLink>
        <NavLink to="/login" className={({ isActive }) => isActive ? "nav-active" : ""}>Login</NavLink>
      </nav>
    </header>
  );
}