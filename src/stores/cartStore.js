import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set) => ({
      items: [],
      isUserLogin: false,

      addToCart: (product) =>
        set((s) => ({
          items: [product, ...s.items],
        })),

      removeFromCart: (pid) =>
        set((s) => ({
          items: s.items.filter((eachItem) => eachItem.id !== pid),
        })),

      clearCart: () =>
        set(() => ({
          items: [],
        })),

      setIsUserLogin: (value) => set({ isUserLogin: value }),
    }),
    {
      name: "cart-storage", 
      partialize: (state) => ({ items: state.items }), // persist only items
    }
  )
);
