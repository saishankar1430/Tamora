const categories = [
  "All",
  "Audio",
  "Accessories",
  "Wearables",
  "Displays",
];

function Filter({ selected, setSelected }) {
  return (
    <div className="flex flex-wrap gap-4 mb-10">

      {categories.map((category) => (

        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-5 py-2 rounded-full transition ${
            selected === category
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {category}
        </button>

      ))}

    </div>
  );
}

export default Filter;