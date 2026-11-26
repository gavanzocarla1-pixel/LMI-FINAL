import { useState, useEffect } from "react";
import type { Book } from "./BookCard";

type Props = {
  initialBook?: Book | null;
  onSubmit: (data: Omit<Book, "id">) => Promise<void>;
  isSaving: boolean;
};

export default function BookForm({ initialBook, onSubmit, isSaving }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [status, setStatus] = useState<"Available" | "Borrowed" | "Overdue">("Available");
  const [isbn, setIsbn] = useState("");
  const [errors, setErrors] = useState<{ title?: string; author?: string }>({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title);
      setAuthor(initialBook.author);
      setCategory(initialBook.category);
      setStatus(initialBook.status);
      setIsbn(initialBook.isbn || "");
    }
  }, [initialBook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; author?: string } = {};
    if (title.trim().length < 3) newErrors.title = "Title must be at least 3 characters.";
    if (author.trim().length < 3) newErrors.author = "Author must be at least 3 characters.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    await onSubmit({ title: title.trim(), author: author.trim(), category, status, isbn: isbn.trim() });
    setSuccess(initialBook ? "Book updated successfully!" : "Book added successfully!");
    if (!initialBook) {
      setTitle(""); setAuthor(""); setIsbn(""); setCategory("Fiction"); setStatus("Available");
    }
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {success && <div className="success">✅ {success}</div>}

      <div className="form-group">
        <label>Title *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Noli Me Tangere" />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label>Author *</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. Jose Rizal" />
        {errors.author && <p className="error">{errors.author}</p>}
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Science</option>
          <option>History</option>
          <option>Math</option>
          <option>Biography</option>
        </select>
      </div>

      <div className="form-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
          <option>Available</option>
          <option>Borrowed</option>
          <option>Overdue</option>
        </select>
      </div>

      <div className="form-group">
        <label>ISBN (optional)</label>
        <input value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="e.g. 978-971-07-..." />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSaving} style={{ width: "100%", padding: "13px" }}>
        {isSaving ? "Saving..." : initialBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
}