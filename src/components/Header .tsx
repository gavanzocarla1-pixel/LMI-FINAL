import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1>📚 LMI - Library Management</h1>
      <nav>
        <NavLink to="/" end>Home </NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/add">Add Book</NavLink>
        <NavLink to="/borrowed">Borrowed</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </header>
  );
}