import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { items, removeItem, clearCart, totalPrice } = useCart();

  if (items.length === 0)
    return (
      <div className="text-center py-10">
        <p className="text-xl">Your cart is empty.</p>
        <Link to="/" className="text-indigo-600 underline">Continue shopping</Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {items.map((i) => (
        <div key={i._id} className="flex items-center border-b py-4 gap-4">
          <div className="bg-gray-200 border-2 border-dashed rounded w-20 h-20" />
          <div className="flex-1">
            <h3 className="font-semibold">{i.title}</h3>
            <p className="text-sm text-gray-600">{i.author}</p>
          </div>
          <p className="font-medium">${i.price}</p>
          <p className="mx-4">× {i.qty}</p>
          <button onClick={() => removeItem(i._id)} className="text-red-600 hover:underline">
            Remove
          </button>
        </div>
      ))}
      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ${totalPrice}</p>
        <button onClick={clearCart} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Clear Cart
        </button>
      </div>
      <button className="mt-4 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
        Proceed to Checkout (demo)
      </button>
    </div>
  );
}
