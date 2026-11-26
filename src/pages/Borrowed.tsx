import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import type { Book } from "../components/BookCard";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";

export default function Borrowed() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "books"), (snap) => {
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Book));
      setBooks(all.filter((b) => b.status === "Borrowed" || b.status === "Overdue"));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "books", id));
  };

  if (loading) return <div className="loading">Loading borrowed books...</div>;

  return (
    <div className="container">
      <h2 className="page-title">Borrowed Books</h2>
      <p className="page-subtitle">{books.length} book(s) currently borrowed or overdue</p>

      {books.length === 0 ? (
        <div className="empty">No borrowed books right now. All books are available! 🎉</div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onEdit={(b) => navigate(`/add?id=${b.id}`)} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}