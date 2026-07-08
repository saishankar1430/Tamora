import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../services/paymentService";

import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };
async function handleRazorpayPayment() {
  try {
    // Create order from backend
    const order = await createRazorpayOrder(totalPrice);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "Tamora",

      description: "Order Payment",

      order_id: order.id,

     handler: async function (response) {
  const verification = await verifyPayment(response);

  if (!verification.success) {
    toast.error("Payment verification failed.");
    return;
  }

  await addDoc(collection(db, "orders"), {
    orderNumber: "TMR-" + Date.now(),

    userId: currentUser.uid,

    items: cart,

    shipping,

    subtotal: totalPrice,

    shippingCost: 0,

    total: totalPrice,

    paymentMethod: "Razorpay",

    paymentStatus: "Paid",

    paymentId: response.razorpay_payment_id,

    razorpayOrderId: response.razorpay_order_id,

    razorpaySignature: response.razorpay_signature,

    orderStatus: "Placed",

    createdAt: serverTimestamp(),
  });

  clearCart();

  toast.success("Payment Successful!");

  navigate("/order-success");
},

      prefill: {
        name: shipping.fullName,
        email: shipping.email,
        contact: shipping.phone,
      },

      theme: {
        color: "#000000",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (error) {
    console.error(error);

    toast.error("Payment Failed");
  }
}
  const handlePlaceOrder = async () => {
    if (!currentUser) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (paymentMethod === "razorpay") {
  return handleRazorpayPayment();
}
    try {
      await addDoc(collection(db, "orders"), {
  orderNumber: "TMR-" + Date.now(),

  userId: currentUser.uid,

  items: cart,

  shipping,

  subtotal: totalPrice,

  shippingCost: 0,

  total: totalPrice,

  paymentMethod: "Cash on Delivery",

  paymentStatus: "Pending",

  orderStatus: "Placed",

  createdAt: serverTimestamp(),
});

      clearCart();

      toast.success("Order placed successfully!");

      navigate("/order-success");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    }
  };
  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-12">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Shipping Form */}

          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-3xl font-bold mb-8">Shipping Details</h2>

            <div className="space-y-5">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shipping.fullName}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={shipping.phone}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={shipping.email}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <textarea
                name="address"
                placeholder="Address"
                value={shipping.address}
                onChange={handleChange}
                className="w-full border rounded-xl p-4 h-32"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={shipping.city}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={shipping.state}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={shipping.pincode}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />
            </div>
          </div>
<div className="bg-white rounded-3xl shadow p-8 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Payment Method
  </h2>

  <label className="flex items-center gap-3 mb-4 cursor-pointer">

    <input
      type="radio"
      value="cod"
      checked={paymentMethod === "cod"}
      onChange={(e) =>
        setPaymentMethod(e.target.value)
      }
    />

    Cash on Delivery

  </label>

  <label className="flex items-center gap-3 cursor-pointer">

    <input
      type="radio"
      value="razorpay"
      checked={paymentMethod === "razorpay"}
      onChange={(e) =>
        setPaymentMethod(e.target.value)
      }
    />

    Razorpay

  </label>

</div>
          {/* Order Summary */}

          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-3xl font-bold mb-8">Order Summary</h2>

            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-4"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>

                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>

                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t pt-6">
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>

                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Shipping</span>

                <span className="text-green-600">FREE</span>
              </div>

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>

                <span>₹{totalPrice}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-8 bg-black text-white py-4 rounded-full hover:bg-gray-800 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
