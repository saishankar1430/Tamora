import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

import AdminLayout from "../layouts/AdminLayout";
import ProductForm from "../components/products/ProductForm";

function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    rating: "",
    stock: "",
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, "products", id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(
        doc(db, "products", id),
        formData
      );

      toast.success("Product updated successfully!");

      navigate("/admin/products");

    } catch (error) {
      console.error(error);
      toast.error("Failed to update product!");
    }
  };

  return (
    <AdminLayout>

      <h1 className="text-4xl font-bold mb-8">
        Edit Product
      </h1>

      <ProductForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Update Product"
      />

    </AdminLayout>
  );
}

export default EditProduct;