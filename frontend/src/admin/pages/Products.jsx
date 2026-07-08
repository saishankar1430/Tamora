import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { db } from "../../firebase/firebase";

import AdminLayout from "../layouts/AdminLayout";

import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  async function fetchProducts() {
    const snapshot = await getDocs(collection(db, "products"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function deleteProduct(id) {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));

      toast.success("Product deleted successfully!");

      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product!");
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">Product</th>

              <th>Category</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">{product.name}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>{product.stock}</td>

                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-product/${product.id}`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Products;
