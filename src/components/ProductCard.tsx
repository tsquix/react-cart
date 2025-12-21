import { Product } from "../types/types";
import { useCart } from "../hooks/useCart";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, deleteFromCart, getProductCount } = useCart();

  return (
    <div
      key={product?.id}
      className="p-4 flex flex-col items-center bg-gray-50 shadow-md gap-2"
    >
      {product?.category}
      <img
        src={product?.image}
        alt={product?.title}
        className="w-[200px] h-[200px] object-contain mb-4"
      />
      <p className="text-center">{product?.title}</p>
      <div className="flex justify-between w-1/2">
        <div>price: {product?.price}</div>
        <div>rating: {product?.rating.rate}</div>
      </div>
      <div>
        {getProductCount(product?.id) > 0 && (
          <span className="mr-2 bg-blue-200 rounded-full p-1.5">
            {getProductCount(product?.id) || 0} x
          </span>
        )}
        <button
          className="px-2 py-1 bg-gray-200 rounded-lg hover:opacity-80"
          onClick={() => addToCart(product?.id)}
        >
          add to cart
        </button>
        <button
          className="px-2 py-1 bg-red-200 rounded-lg hover:opacity-80"
          onClick={() => deleteFromCart(product?.id)}
        >
          usun z koszyka
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
