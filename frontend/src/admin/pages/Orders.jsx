import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import AdminLayout from "../layouts/AdminLayout";

import StatusBadge from "../../components/StatusBadge";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const snapshot = await getDocs(collection(db, "orders"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-8">
        Orders
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-black text-white">

            <tr>
              <th className="p-4 text-left">Order No.</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No Orders Found
                </td>
              </tr>

            ) : (

              orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="p-4 font-medium">
                    {order.orderNumber || order.id.slice(0, 8)}
                  </td>

                  <td>
                    {order.shipping?.fullName || "N/A"}
                  </td>

                  <td>
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                      <StatusBadge status={order.orderStatus} />
                    </span>
                  </td>

                  <td>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                     <StatusBadge status={order.paymentStatus} />
                    </span>
                  </td>

                  <td className="font-semibold">
                    ₹{order.total}
                  </td>

                  <td>

                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
    </AdminLayout>
  );
}

export default Orders;