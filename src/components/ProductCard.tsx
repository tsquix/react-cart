import { Product } from "../types/types";
import { useCart } from "../hooks/useCart";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, deleteFromCart, getProductCount } = useCart();

  const productCount = getProductCount(product.id);
  function formatPrice(price: number): string {
    return price.toFixed(2);
  }

  return (
    <li className="p-4 items-center justify-center flex flex-col bg-gray-50 shadow-md gap-2 mb-12">
      {product.category}
      <img
        src={product.image}
        alt={product.title}
        className="w-[200px] h-[200px] object-contain mb-4"
      />
      <p className="text-center">{product.title}</p>
      <div className="flex gap-8 text-nowrap">
        <span>{formatPrice(product.price)}</span>
        <span>rating: {product.rating.rate}</span>
      </div>
      <div>
        {productCount > 0 && (
          <span className="mr-2 bg-blue-200 rounded-full p-1.5">
            {productCount} x
          </span>
        )}
        <button
          className="px-2 py-1 bg-gray-200 rounded-lg hover:opacity-80"
          onClick={() => addToCart(product.id)}
        >
          add to cart
        </button>
        <button
          className="px-2 py-1 bg-red-200 rounded-lg hover:opacity-80"
          onClick={() => deleteFromCart(product.id)}
        >
          usun z koszyka
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
