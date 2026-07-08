import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccess() {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl w-full text-center">

        <CheckCircle
          size={90}
          className="mx-auto text-green-500"
        />

        <h1 className="text-4xl font-bold mt-6">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-4">
          Thank you for shopping with Tamora.
          <br />
          Your order has been received and is being processed.
        </p>

        <div className="mt-10 flex flex-col gap-4">

          <Link
            to="/orders"
            className="bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition"
          >
            View My Orders
          </Link>

          <Link
            to="/products"
            className="border border-black py-4 rounded-xl hover:bg-gray-100 transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </section>
  );
}

export default OrderSuccess;