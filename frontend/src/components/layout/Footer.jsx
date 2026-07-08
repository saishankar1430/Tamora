import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Tamora</h2>

          <p className="text-gray-400 leading-7">
            Discover premium products crafted for modern lifestyles.
            Quality, elegance and simplicity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">

            <Link to="/" className="hover:text-white transition">
              Home
            </Link>

            <Link to="/products" className="hover:text-white transition">
              Products
            </Link>

            <Link to="/about" className="hover:text-white transition">
              About
            </Link>

            <Link to="/contact" className="hover:text-white transition">
              Contact
            </Link>

          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Support
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">

            <p>Email</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>FAQs</p>

          </div>
        </div>

        {/* Newsletter */}
        <div>

          <h3 className="font-semibold text-lg mb-4">
            Stay Updated
          </h3>

          <p className="text-gray-400 mb-5">
            Subscribe for new arrivals and offers.
          </p>

          <div className="flex">

            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-4 py-3 rounded-l-lg bg-gray-900 border border-gray-700 outline-none"
            />

            <button className="bg-white text-black px-5 rounded-r-lg hover:bg-gray-200 transition">
              Join
            </button>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-800 py-6 text-center text-gray-500">
        © 2026 Tamora. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;