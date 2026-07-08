import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-black text-white"
        : "hover:bg-gray-200 text-gray-700"
    }`;

  return (
    <aside className="w-72 bg-white shadow-lg p-6">

      <h1 className="text-3xl font-bold mb-10">
        Tamora Admin
      </h1>

      <nav className="space-y-2">

        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          <Package size={20} />
          Products
        </NavLink>

        <NavLink to="/admin/add-product" className={linkClass}>
          <PlusCircle size={20} />
          Add Product
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          <ShoppingCart size={20} />
          Orders
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Users size={20} />
          Users
        </NavLink>

        <NavLink to="/admin/settings" className={linkClass}>
          <Settings size={20} />
          Settings
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;