import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../firebase/firebase";

import AdminLayout from "../layouts/AdminLayout";
import ProductForm from "../components/products/ProductForm";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    rating: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "products"), formData);

      toast.success("Product added successfully!");

      setFormData({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
        rating: "",
        stock: "",
      });
    } catch (error) {
      console.error(error);

      toast.error("Failed to add product!");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-8">Add Product</h1>

      <ProductForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Add Product"
      />
    </AdminLayout>
  );
}

export default AddProduct;
