export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  status: "Available" | "Borrowed" | "Overdue";
  isbn?: string;
};

type Props = {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
};

export default function BookCard({ book, onEdit, onDelete }: Props) {
  const badgeClass =
    book.status === "Available"
      ? "badge badge-available"
      : book.status === "Borrowed"
      ? "badge badge-borrowed"
      : "badge badge-overdue";

  return (
    <div className="book-card">
      <div className="book-card-cover">
        {book.title.charAt(0).toUpperCase()}
      </div>
      <div className="book-card-body">
        <h3>{book.title}</h3>
        <p className="author">by {book.author}</p>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "8px" }}>
          {book.category} • {book.isbn || "No ISBN"}
        </p>
        <span className={badgeClass}>{book.status}</span>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => onEdit(book)}>
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (confirm(`Delete "${book.title}"?`)) onDelete(book.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}