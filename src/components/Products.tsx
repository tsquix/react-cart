import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import { useCart } from "../hooks/useCart";
import { Product } from "../types/types";

const Products = () => {
  const { products, error, isLoading } = useCart();
  const [sortedArray, setSortedArray] = useState<Product[]>([]);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    const sorted = [...products];

    switch (option) {
      case "Title": {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      }
      case "Price": {
        sorted.sort((a, b) => b.price - a.price);
        break;
      }
      default:
        break;
    }
    setSortedArray(sorted);
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Brak produktów do wyświetlenia</p>
      </div>
    );
  }
  return (
    <div className="flex w-full mx-auto max-w-7xl flex-col">
      <FilterComponent handleSort={handleSort} />
      <ul className="flex flex-col items-center justify-center ">
        {(sortedArray.length ? sortedArray : products).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default Products;
