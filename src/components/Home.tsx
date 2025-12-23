import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import { useCart } from "../hooks/useCart";
import { Product } from "../types/types";

const Home = () => {
  const { products, error } = useCart();
  const [randomProduct, setRandomProduct] = useState<Product | null>(null);

  const getRandomProduct = (): Product | null => {
    if (products.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  };
  useEffect(() => {
    if (products.length > 0) {
      setRandomProduct(getRandomProduct());
    }
  }, [products]);

  return (
    <>
      {error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : products.length > 0 ? (
        <>
          {randomProduct && (
            <div className="flex w-full mx-auto max-w-7xl flex-col">
              <ul className="flex justify-center">
                <ProductCard key={randomProduct.id} product={randomProduct} />
              </ul>
            </div>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Home;
