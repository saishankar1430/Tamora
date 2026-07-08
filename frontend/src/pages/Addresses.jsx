function Addresses() {
  return (
    <section className="min-h-screen bg-gray-100 py-16">

      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          Saved Addresses
        </h1>

        <div className="bg-white rounded-3xl shadow p-8">

          <button className="bg-black text-white px-6 py-3 rounded-xl">
            + Add Address
          </button>

          <p className="text-gray-500 mt-6">
            No addresses added yet.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Addresses;