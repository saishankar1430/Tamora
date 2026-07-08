import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import AdminLayout from "../layouts/AdminLayout";

function Dashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    products: 0,
    users: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const productsSnap = await getDocs(collection(db, "products"));
      const ordersSnap = await getDocs(collection(db, "orders"));
      const usersSnap = await getDocs(collection(db, "users"));

      let revenue = 0;

      ordersSnap.forEach((doc) => {
        revenue += Number(doc.data().total || 0);
      });

      const recentQuery = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc"),
        limit(5)
      );

      const recentSnap = await getDocs(recentQuery);

      const recent = recentSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRecentOrders(recent);

      setStats({
        revenue,
        orders: ordersSnap.size,
        products: productsSnap.size,
        users: usersSnap.size,
      });

    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  }

  return (
    <AdminLayout>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold mt-2">
            ₹{stats.revenue}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.orders}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Products</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.products}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Users</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.users}
          </h2>
        </div>

      </div>

      {/* Recent Orders */}

      <div className="bg-white rounded-2xl shadow mt-10 overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            Recent Orders
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-left">
                Payment
              </th>

              <th className="text-left">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {recentOrders.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center p-8 text-gray-500"
                >
                  No Recent Orders
                </td>

              </tr>

            ) : (

              recentOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {order.shipping?.fullName || "Unknown"}
                  </td>

                  <td>
                    {order.orderStatus}
                  </td>

                  <td>
                    {order.paymentStatus}
                  </td>

                  <td>
                    ₹{order.total}
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

export default Dashboard;