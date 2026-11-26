import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import type { Book } from "../components/BookCard";
import BookCard from "../components/BookCard";
import StatsCard from "../components/StatsCard";
import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "books"), (snap) => {
      setBooks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Book)));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "books", id));
  };

  if (loading) return <div className="loading">Loading books...</div>;

  const total = books.length;
  const available = books.filter((b) => b.status === "Available").length;
  const borrowed = books.filter((b) => b.status === "Borrowed").length;
  const overdue = books.filter((b) => b.status === "Overdue").length;

  return (
    <div className="container">
      <h2 className="page-title">Dashboard</h2>
      <p className="page-subtitle">Welcome back! Here's your library at a glance.</p>

      <div className="stats-grid">
        <StatsCard title="Total Books" value={total} />
        <StatsCard title="Available" value={available} />
        <StatsCard title="Borrowed" value={borrowed} />
        <StatsCard title="Overdue" value={overdue} />
      </div>

      <h3 style={{ marginBottom: "14px" }}>Recent Books</h3>
      {books.length === 0 ? (
        <div className="empty">
          <p>No books yet. Add your first book!</p>
          <br />
          <button className="btn btn-primary" onClick={() => navigate("/add")}>+ Add Book</button>
        </div>
      ) : (
        <div className="books-grid">
          {books.slice(0, 6).map((book) => (
            <BookCard key={book.id} book={book} onEdit={(b) => navigate(`/add?id=${b.id}`)} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}