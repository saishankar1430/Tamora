import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
function Orders() {
  const { currentUser } = useAuth();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      if (!currentUser) return;

      const q = query(
        collection(db, "orders"),
        where("userId", "==", currentUser.uid),
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    }

    fetchOrders();
  }, [currentUser]);

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center">
            <h2 className="text-3xl font-bold">No Orders Yet</h2>

            <p className="text-gray-500 mt-3">Your orders will appear here.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl shadow p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">
                      {order.orderNumber || `Order #${order.id.slice(0, 8)}`}
                    </h2>

                    <div className="flex items-center gap-2">
                      <span>Status:</span>
                      <StatusBadge status={order.orderStatus} />
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span>Payment:</span>
                      <StatusBadge status={order.paymentStatus} />
                    </div>
                  </div>

                  <div className="text-right">
                    <h2 className="text-2xl font-bold mb-3">₹{order.total}</h2>

                    <Link
                      to={`/orders/${order.id}`}
                      className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        {item.name} × {item.quantity}
                      </div>

                      <div>₹{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;
