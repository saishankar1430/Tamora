import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import ProductCard from "../components/products/ProductCard";

function ProductDetails() {
  const { id } = useParams();

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-5xl font-bold">
          Product Not Found
        </h1>
      </div>
    );
  }

  const cartItem = cart.find(
    (item) => item.id === product.id
  );

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <section className="bg-gray-50 min-h-screen py-20">

      <div className="max-w-7xl mx-auto px-8">

        {/* Top Section */}

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left */}

          <div>

            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-3xl shadow-lg"
            />

          </div>

          {/* Right */}

          <div>

            <p className="text-gray-500 uppercase tracking-widest">
              {product.category}
            </p>

            <h1 className="text-5xl font-bold mt-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-6">

              <span className="text-yellow-500 text-2xl">
                ⭐
              </span>

              <span className="text-lg">
                {product.rating} / 5
              </span>

            </div>

            <h2 className="text-4xl font-bold mt-8">
              ₹{product.price}
            </h2>

            <div className="mt-8">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                In Stock
              </span>

            </div>

            <p className="mt-10 text-gray-600 leading-8">

              Crafted with premium materials and modern
              engineering. Built to deliver exceptional
              performance, comfort and durability.

            </p>

            {/* Add To Cart */}

            <div className="mt-10">

              {!cartItem ? (

                <button
                  onClick={() => addToCart(product)}
                  className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>

              ) : (

                <div className="flex gap-4 items-center">

                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="text-xl font-semibold">
                    {cartItem.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="w-10 h-10 rounded-full bg-black text-white"
                  >
                    +
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* Specifications */}

        <div className="mt-24 bg-white rounded-3xl shadow p-10">

          <h2 className="text-3xl font-bold mb-8">
            Specifications
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <p className="text-gray-500">
                Brand
              </p>

              <h3 className="font-semibold">
                Tamora
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Warranty
              </p>

              <h3 className="font-semibold">
                1 Year
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Delivery
              </p>

              <h3 className="font-semibold">
                Free Shipping
              </h3>

            </div>

            <div>

              <p className="text-gray-500">
                Return Policy
              </p>

              <h3 className="font-semibold">
                7 Days Replacement
              </h3>

            </div>

          </div>

        </div>

        {/* Related Products */}

        <div className="mt-24">

          <h2 className="text-4xl font-bold mb-12">
            Related Products
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {relatedProducts.map((item) => (

              <ProductCard
                key={item.id}
                product={item}
              />

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;