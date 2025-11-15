import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Home() {
  const [books, setBooks] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((e) => console.error("API Error:", e));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((b) => (
        <div key={b._id} className="border rounded-lg p-4 hover:shadow-lg transition">
          <Link to={`/book/${b._id}`}>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl h-48 mb-3" />
            <h3 className="font-semibold text-lg">{b.title}</h3>
            <p className="text-sm text-gray-600">{b.author}</p>
            <p className="text-indigo-600 font-bold mt-1">${b.price}</p>
          </Link>
          <button
            onClick={() => addItem(b)}
            className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
