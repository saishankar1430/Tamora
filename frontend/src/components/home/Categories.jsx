const categories = [
  {
    id: 1,
    name: "Audio",
    icon: "🎧",
  },
  {
    id: 2,
    name: "Wearables",
    icon: "⌚",
  },
  {
    id: 3,
    name: "Displays",
    icon: "🖥️",
  },
  {
    id: 4,
    name: "Accessories",
    icon: "⌨️",
  },
];

function Categories() {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-16">
          Shop By Category
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {categories.map((category) => (

            <div
              key={category.id}
              className="bg-white rounded-3xl p-10 text-center shadow hover:shadow-xl hover:-translate-y-2 transition cursor-pointer"
            >

              <div className="text-6xl mb-6">
                {category.icon}
              </div>

              <h3 className="text-2xl font-semibold">
                {category.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Categories;