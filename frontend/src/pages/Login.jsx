import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";
import { resetPassword } from "../services/authService";
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser(formData.email, formData.password);

      toast.success("Welcome back!");

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }

    try {
      await resetPassword(email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            Forgot Password?
          </button>
        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
