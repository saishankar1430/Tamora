import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heart, User, LogOut } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-black"
      : "text-gray-600 hover:text-black transition";

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-bold"
        >
          Tamora
        </Link>

        {/* Desktop */}

        <div className="hidden md:flex items-center gap-8">

          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>

          <NavLink to="/about" className={navClass}>
            About
          </NavLink>

          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>

          {/* Wishlist */}

          <Link to="/wishlist">
            <Heart className="w-6 h-6" />
          </Link>

          {/* Cart */}

          <Link
            to="/cart"
            className="relative bg-black text-white px-5 py-2 rounded-full"
          >
            🛒

            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Logged Out */}

          {!currentUser ? (
            <div className="flex gap-3">

              <Link
                to="/login"
                className="px-4 py-2 border rounded-lg"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>

            </div>
          ) : (
            <div className="relative">

              <button
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
              >
                <User className="w-7 h-7" />
              </button>

              {profileOpen && (

                <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border">

                  <Link
                    to="/profile"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    className="block px-5 py-3 hover:bg-gray-100"
                  >
                    Wishlist
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>

                </div>

              )}

            </div>
          )}

        </div>

        {/* Mobile */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl"
        >
          ☰
        </button>

      </div>

    </nav>
  );
}

export default Navbar;