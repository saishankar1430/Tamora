import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebase";
import AdminLayout from "../layouts/AdminLayout";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    try {
      const docRef = doc(db, "orders", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrder({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function updateStatus(status) {
  try {
    await updateDoc(doc(db, "orders", id), {
      orderStatus: status,
    });

    setOrder((prev) => ({
      ...prev,
      orderStatus: status,
    }));

    toast.success("Order status updated!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update order.");
  }
}

  if (!order) {
    return (
      <AdminLayout>
        <div className="text-center py-20">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-8">Order Details</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Customer */}

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Customer</h2>

          <p>
            <strong>Name:</strong> {order.shipping?.fullName}
          </p>

          <p>
            <strong>Email:</strong> {order.shipping?.email}
          </p>

          <p>
            <strong>Phone:</strong> {order.shipping?.phone}
          </p>
        </div>

        {/* Shipping */}

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

          <p>{order.shipping?.address}</p>

          <p>
            {order.shipping?.city}, {order.shipping?.state}
          </p>

          <p>{order.shipping?.pincode}</p>
        </div>
      </div>

      {/* Products */}

      <div className="bg-white rounded-2xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">Products</h2>

        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-4">
            <div>
              <h3 className="font-semibold">{item.name}</h3>

              <p>Qty : {item.quantity}</p>
            </div>

            <h3 className="font-bold">₹{item.price * item.quantity}</h3>
          </div>
        ))}
      </div>

      {/* Status */}

      <div className="bg-white rounded-2xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6">Order Status</h2>

        <select
          value={order.orderStatus}
          onChange={(e) => updateStatus(e.target.value)}
          className="border rounded-lg p-3 font-medium"
        >
          <option value="Placed">Placed</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Packed">Packed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
    </AdminLayout>
  );
}

export default OrderDetails;
