function ProductForm({
  formData,
  handleChange,
  handleSubmit,
  buttonText,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow space-y-6 max-w-3xl"
    >
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl h-32"
      />

      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Rating"
        value={formData.rating}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="w-full border p-3 rounded-xl"
      />

      <button
        type="submit"
        className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        {buttonText}
      </button>
    </form>
  );
}

export default ProductForm;