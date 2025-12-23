import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContextType, Children, Product } from "../types/types";

export const CartContext = createContext<CartContextType | null>(null);

function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "number")
  );
}

export function CartContextProvider({ children }: Children) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        if (Array.isArray(res.data) && res.data.length === 0) {
          setProducts([]);
          return;
        }
        setProducts(res.data);
        setIsLoading(false);
      } catch (err) {
        setError("Nie udało się pobrać produktów");
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState<number[]>([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);

      if (isNumberArray(parsed)) {
        setCartProducts(parsed);
      } else {
        console.error("Nieprawidlowy format koszyka");
      }
    } catch (e) {
      console.error("Blad parsowania koszyka", e);
    }
  }, []);

  const addToCart = (id: number) => {
    setCartProducts((prev) => [...prev, id]);
  };
  const getProductCount = (id: number): number => {
    return cartProducts.filter((itemId) => itemId === id).length;
  };
  const deleteFromCart = (id: number): void => {
    setCartProducts((prev) => {
      const pos = prev.indexOf(id);
      if (pos !== -1) {
        const newCart = prev.filter((value, index) => index !== pos);
        if (newCart.length === 0) {
          ls?.removeItem("cart");
        } else {
          ls?.setItem("cart", JSON.stringify(newCart));
        }
        return newCart;
      }
      return prev;
    });
  };

  return (
    <CartContext.Provider
      value={{
        error,
        getProductCount,
        cartProducts,
        products,
        setCartProducts,
        addToCart,
        deleteFromCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
