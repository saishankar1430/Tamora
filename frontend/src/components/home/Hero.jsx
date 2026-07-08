import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleExplore = () => {
    const section = document.getElementById("featured-products");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-8 w-full">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>

            <p className="uppercase tracking-[8px] text-gray-500 mb-4">
              Premium Collection
            </p>

            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight mb-8">
              Discover
              <br />
              Amazing Products
            </h1>

            <p className="text-gray-600 text-xl leading-9 mb-10">
              Premium quality products designed to elevate your everyday
              lifestyle.
            </p>

            <div className="flex gap-5">

              <button
                onClick={() => navigate("/products")}
                className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300"
              >
                Shop Now
              </button>

              <button
                onClick={handleExplore}
                className="border border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                Explore
              </button>

            </div>

          </div>

          {/* Right Content */}

          <div className="flex justify-center">

            <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-2xl flex items-center justify-center hover:scale-105 transition duration-500">

              <span className="text-8xl">
                🛍️
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;