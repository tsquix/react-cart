import { ReactNode } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
};
export type Children = {
  children: ReactNode;
};

export type CartContextType = {
  products: Product[];
  cartProducts: number[];
  setCartProducts: React.Dispatch<React.SetStateAction<number[]>>;
  getProductCount: (id: number) => number;
  addToCart: (id: number) => void;
  deleteFromCart: (id: number) => void;
  error: string | null;
};
