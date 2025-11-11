import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],
  isUserLogin:false,

  addToCart: (product) =>
    set((s) => ({
      items: [...s.items, product],
    })),

  removeFromCart: (pid) =>
    set((s) => ({
      items: s.items.filter((eachItem) => eachItem.id != pid),
    })),

  clearCart: () =>
    set(() => ({
      items: [],
    })),

    setIsUserLogin: (value) => set({ isUserLogin: value }),
}));
