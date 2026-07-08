function Newsletter() {
  return (
    <section className="py-24">

      <div className="max-w-4xl mx-auto px-8">

        <div className="bg-black text-white rounded-[40px] p-16 text-center">

          <h2 className="text-5xl font-bold mb-6">
            Stay Updated
          </h2>

          <p className="text-gray-300 mb-10">
            Subscribe to receive our latest offers and product launches.
          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center">

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-black px-6 py-4 rounded-full flex-1 outline-none"
            />

            <button className="bg-white text-black px-10 rounded-full hover:scale-105 transition">
              Subscribe
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;