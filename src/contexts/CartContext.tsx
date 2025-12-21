import React, { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { CartContextType, Children, Product } from "../types/types";

export const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({ children }: Children) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        setError("Nie udało się pobrać produktów");
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
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart") as any));
    }
  }, []);

  const addToCart = (id: number) => {
    setCartProducts((prev) => [...prev, id]);
    //   console.log(cartState);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
