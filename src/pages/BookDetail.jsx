import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../hooks/useCart";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    axios
      .get(`https://bookstore-api-lk2h.onrender.com/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => setBook(null));
  }, [id]);

  if (!book) return <p className="text-center">Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
      <div className="bg-gray-200 border-2 border-dashed rounded-xl h-96" />
      <div>
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-lg text-gray-700 mt-2">by {book.author}</p>
        <p className="text-2xl font-semibold text-indigo-600 mt-4">${book.price}</p>
        <p className="mt-4 text-gray-600">{book.description}</p>
        <button
          onClick={() => addItem(book)}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
