import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";
import StatusBadge from "../components/StatusBadge";
function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        console.log("URL ID:", id);

        const docRef = doc(db, "orders", id);
        const docSnap = await getDoc(docRef);

        console.log("Document Exists:", docSnap.exists());

        if (docSnap.exists()) {
          setOrder({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          console.log("Order not found");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Order not found.</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow p-8">
          <h1 className="text-4xl font-bold mb-8">Order Details</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Information</h2>

              <p>
                <strong>Order No:</strong> {order.orderNumber}
              </p>

              <p className="flex items-center gap-2">
                <strong>Status:</strong>
                <StatusBadge status={order.orderStatus} />
              </p>

              <p className="flex items-center gap-2 mt-3">
                <strong>Payment:</strong>
                <StatusBadge status={order.paymentStatus} />
              </p>

              <p>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

              <p>{order.shipping.fullName}</p>

              <p>{order.shipping.phone}</p>

              <p>{order.shipping.email}</p>

              <p>{order.shipping.address}</p>

              <p>
                {order.shipping.city}, {order.shipping.state}
              </p>

              <p>{order.shipping.pincode}</p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Products</h2>

            <div className="space-y-5">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border rounded-2xl p-4"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>

                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>

                  <h3 className="font-bold">₹{item.price * item.quantity}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t pt-6 text-right">
            <h2 className="text-3xl font-bold">Total ₹{order.total}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;
