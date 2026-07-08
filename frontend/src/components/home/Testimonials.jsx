const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    review: "Absolutely loved the quality. Everything arrived perfectly.",
  },
  {
    id: 2,
    name: "Priya Patel",
    review: "Beautiful website and amazing customer experience.",
  },
  {
    id: 3,
    name: "Aman Verma",
    review: "One of the best online shopping experiences I've had.",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-gray-100">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-16">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl shadow p-10"
            >

              <p className="text-gray-600 leading-8 italic">
                "{item.review}"
              </p>

              <h3 className="mt-8 font-bold text-xl">
                {item.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;