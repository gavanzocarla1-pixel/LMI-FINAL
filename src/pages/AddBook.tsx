import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import BookForm from "../components/BookForm";
import type { Book } from "../components/BookCard";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function AddBook() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const [initialBook, setInitialBook] = useState<Book | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(!!editId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!editId) return;
    const load = async () => {
      const snap = await getDoc(doc(db, "books", editId));
      if (snap.exists()) setInitialBook({ id: snap.id, ...snap.data() } as Book);
      setLoadingEdit(false);
    };
    load();
  }, [editId]);

  const handleSubmit = async (data: Omit<Book, "id">) => {
    setIsSaving(true);
    try {
      if (editId) {
        await updateDoc(doc(db, "books", editId), data);
      } else {
        await addDoc(collection(db, "books"), { ...data, createdAt: new Date() });
      }
      setTimeout(() => navigate("/books"), 800);
    } finally {
      setIsSaving(false);
    }
  };

  if (loadingEdit) return <div className="loading">Loading book...</div>;

  return (
    <div className="container">
      <h2 className="page-title">{editId ? "Edit Book" : "Add New Book"}</h2>
      <p className="page-subtitle">{editId ? "Update the details below." : "Fill in the details to add to your library."}</p>
      <BookForm initialBook={initialBook} onSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
}