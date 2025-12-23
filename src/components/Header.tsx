import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Header = () => {
  const { cartProducts } = useCart();
  return (
    <header className="sticky top-0 z-50 bg-gray-200 shadow-xl p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto gap-12">
        <nav className="flex gap-6">
          <Link to="/" className="hover:opacity-70">
            Home
          </Link>
          <Link to="/products" className="hover:opacity-70">
            Products
          </Link>
        </nav>

        <div className="relative">
          <span className="absolute -top-2 -right-2 rounded-full px-1.5 text-xs bg-red-500 text-white">
            {cartProducts?.length || 0}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
