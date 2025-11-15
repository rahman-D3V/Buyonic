import React, { useMemo, useState } from "react";
import { FiChevronRight, FiSliders } from "react-icons/fi";
import { laptopsData } from "../../data";
import { useCart } from "../../stores/cartStore";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/ProductCard";

export default function GamingLaptop() {
  const [instantFilter, setInstantFilter] = useState(null);
  const [sort, setSort] = useState("");
  const addToCart = useCart((s) => s.addToCart);

  const navigate = useNavigate();

  // Get the updated product list after filtering and sorting
  const filteredProducts = useMemo(() => {
    let copy = structuredClone(laptopsData);

    if (instantFilter) {
      copy = copy.filter(
        (item) =>
          item.company == instantFilter ||
          item.processor == instantFilter ||
          item.size == instantFilter
      );
    }

    if (sort === "low-high") {
      copy.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      copy.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      copy.sort((a, b) => b.rating - a.rating);
    }

    return copy;
  }, [instantFilter, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:pt-34 pt-24">
      {/* Breadcrumbs */}
      <nav className="mb-5 flex items-center text-sm text-gray-600">
        <a
          onClick={() => navigate("/")}
          className="hover:underline cursor-pointer"
        >
          Home
        </a>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-900 font-medium">Gaming Laptops</span>
      </nav>

      {/* Header + Sort/Filters */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Gaming Laptops</h1>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setSort("relevance")}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 ${
              sort == "relevance" ? "bg-black text-white" : ""
            }`}
          >
            <FiSliders /> Relevance
          </button>
          <button
            onClick={() => setSort("low-high")}
            className={`rounded-xl border px-3 py-2 ${
              sort == "low-high" ? "bg-black text-white" : ""
            }`}
          >
            Price · Low to High
          </button>
          <button
            onClick={() => setSort("high-low")}
            className={`rounded-xl border px-3 py-2 ${
              sort == "high-low" ? "bg-black text-white" : ""
            }`}
          >
            Price · High to Low
          </button>
          <button
            onClick={() => setSort("rating")}
            className={`rounded-xl border px-3 py-2 ${
              sort == "rating" ? "bg-black text-white" : ""
            }`}
          >
            Customer Rating
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 items-center">
        {["Intel", "AMD Ryzen", "HP", "Acer", "15.6 inch"].map((chip) => {
          const active = chip === instantFilter;
          return (
            <button
              key={chip}
              onClick={() => setInstantFilter(chip)}
              className={`rounded-full px-3 py-1 text-sm cursor-pointer border transition
          ${
            active
              ? "bg-black text-white border-black"
              : "text-gray-700 hover:border-black hover:text-black"
          }`}
            >
              {chip}
            </button>
          );
        })}
        {instantFilter && (
          <button
            onClick={() => setInstantFilter(null)}
            className="rounded-full px-2.5 py-0.5 text-xs cursor-pointer border text-gray-500 hover:bg-gray-100 transition"
          >
            Reset ✕
          </button>
        )}
      </div>

      {/* Products */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((p) => (
          <ProductCard addToCart={addToCart} key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
