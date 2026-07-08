import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { Star, Heart } from "lucide-react";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const { addToWishlist, isInWishlist } = useWishlist();

  const cartItem = cart.find((item) => item.id === product.id);

  const liked = isInWishlist(product.id);

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer relative"
    >
      {/* Wishlist */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          addToWishlist(product);
        }}
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:scale-110 transition"
      >
        <Heart
          className={`w-6 h-6 ${
            liked
              ? "fill-red-500 text-red-500"
              : "text-gray-400"
          }`}
        />
      </button>

      {/* Product Image */}

      <div className="h-72 bg-gray-100 flex items-center justify-center rounded-t-3xl">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-60 max-w-[85%] object-contain transition duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}

      <div className="p-6">

        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h3 className="text-2xl font-semibold mt-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />

          <span className="text-gray-600">
            {product.rating}
          </span>
        </div>

        <div className="flex justify-between items-center mt-6">

          <span className="text-xl font-bold">
            ₹{product.price}
          </span>

          {!cartItem ? (

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Add
            </button>

          ) : (

            <div className="flex items-center gap-3">

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseQuantity(product.id);
                }}
                className="w-9 h-9 rounded-full bg-gray-200"
              >
                −
              </button>

              <span className="font-semibold">
                {cartItem.quantity}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  increaseQuantity(product.id);
                }}
                className="w-9 h-9 rounded-full bg-black text-white"
              >
                +
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProductCard;