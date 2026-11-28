import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setEmail(user?.email || "");
    });
    return () => unsub();
  }, []);

  const initial = email ? email.charAt(0).toUpperCase() : "";

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#9B1B30] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-[64px] flex items-center justify-between gap-4">
        
        {/* LEFT - LOGO */}
        <Link to="/" className="flex items-center gap-2 font-bold text-[20px] whitespace-nowrap">
          <span>📚</span> LMI Library
        </Link>

        {/* CENTER - MENU */}
        <nav className="hidden md:flex items-center gap-7 font-semibold text-[15px]">
          <NavLink to="/" end className={({ isActive }) => isActive ? "underline underline-offset-4" : "hover:opacity-80"}>Dashboard</NavLink>
          <NavLink to="/books" className={({ isActive }) => isActive ? "underline underline-offset-4" : "hover:opacity-80"}>Books</NavLink>
          <NavLink to="/borrowed" className={({ isActive }) => isActive ? "underline underline-offset-4" : "hover:opacity-80"}>Borrowed</NavLink>
          {email && <NavLink to="/add" className={({ isActive }) => isActive ? "underline underline-offset-4" : "hover:opacity-80"}>Add Book</NavLink>}
        </nav>

        {/* RIGHT - USER */}
        <div className="flex items-center gap-3 shrink-0">
          {email ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-full max-w-[200px]">
                <span className="w-6 h-6 bg-white text-[#9B1B30] rounded-full flex items-center justify-center font-bold text-[13px] shrink-0">
                  {initial}
                </span>
                <span className="text-[13px] truncate" title={email}>{email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-[#9B1B30] px-4 py-1.5 rounded-full font-bold text-[14px] hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-[#9B1B30] px-4 py-1.5 rounded-full font-bold text-[14px]">Login</Link>
          )}
        </div>
      </div>

      {/* MOBILE MENU - nasa baba pag maliit screen */}
      <nav className="md:hidden flex justify-around py-2 border-t border-white/20 font-semibold text-[14px]">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/borrowed">Borrowed</NavLink>
        {email && <NavLink to="/add">Add Book</NavLink>}
      </nav>
    </header>
  );
}