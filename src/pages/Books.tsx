import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import type { Book } from "../components/BookCard";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
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

  const filtered = books.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || b.status === filter;
    return matchSearch && matchFilter;
  });

  if (loading) return <div className="loading">Loading books...</div>;

  return (
    <div className="container">
      <h2 className="page-title">All Books</h2>
      <p className="page-subtitle">{filtered.length} book(s) found</p>

      <SearchBar search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} />

      {filtered.length === 0 ? (
        <div className="empty">No books found. Try another search.</div>
      ) : (
        <div className="books-grid">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} onEdit={(b) => navigate(`/add?id=${b.id}`)} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}