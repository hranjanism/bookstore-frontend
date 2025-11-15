import { create } from "zustand";

export const useCart = create((set) => ({
  items: JSON.parse(localStorage.getItem("cart") || "[]"),

  addItem: (book) =>
    set((state) => {
      const existing = state.items.find((i) => i._id === book._id);
      let newItems;
      if (existing) {
        newItems = state.items.map((i) =>
          i._id === book._id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...book, qty: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { items: newItems };
    }),

  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((i) => i._id !== id);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { items: newItems };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  },

  get totalItems() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },
  get totalPrice() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);
  },
}));
