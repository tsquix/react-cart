import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import FilterComponent from "./FilterComponent";
import ProductCard from "./ProductCard";
import { CartContext } from "../contexts/CartContext";
import LoadingSpinner from "./LoadingSpinner";
import { useCart } from "../hooks/useCart";
import { Product } from "../types/types";
const Products = () => {
  const { products, error } = useCart();
  const [sortedArray, setSortedArray] = useState<Product[]>([]);

  useEffect(() => {
    console.log(products);
  }, [products]);

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

  return (
    <>
      <div className="flex w-full mx-auto max-w-7xl flex-col">
        <FilterComponent handleSort={handleSort} />
        {error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : products.length > 0 ? (
          <div className="flex flex-col gap-8 items-center w-full">
            {(sortedArray.length > 0 ? sortedArray : products)?.map(
              (product) => (
                <ProductCard product={product} key={product.id} />
              )
            )}
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
};

export default Products;
