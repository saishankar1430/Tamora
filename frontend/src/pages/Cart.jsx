import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();

  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-12">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-16 text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Your cart is empty 🛒
            </h2>

            <p className="text-gray-500">
              Add some amazing products to your cart.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow p-6 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                  {/* Left */}

                  <div className="flex items-center gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-2xl"
                    />

                    <div>
                      <p className="text-gray-500">{item.category}</p>

                      <h2 className="text-2xl font-bold mt-2">{item.name}</h2>

                      <p className="mt-3 text-xl font-semibold">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  {/* Right */}

                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition text-xl"
                    >
                      -
                    </button>

                    <span className="text-xl font-semibold w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-10 h-10 rounded-full bg-black text-white hover:bg-gray-800 transition text-xl"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}

            <div className="mt-12 bg-white rounded-3xl shadow p-8 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">Total</h2>

                <p className="text-gray-500 mt-2">Taxes included.</p>
              </div>

              <div className="text-right">
                <h2 className="text-4xl font-bold">₹{totalPrice}</h2>

                <button
                  onClick={() => navigate("/checkout")}
                  className="mt-5 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
