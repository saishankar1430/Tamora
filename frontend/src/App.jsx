// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";

// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import ProductDetails from "./pages/ProductDetails";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Cart from "./pages/Cart";
// import NotFound from "./pages/NotFound";

// import Dashboard from "./admin/pages/Dashboard";
// import AddProduct from "./admin/pages/AddProduct";
// import AdminProducts from "./admin/pages/Products";

// import EditProduct from "./admin/pages/EditProduct";

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>

//         <Route path="/admin/edit-product/:id" element={<EditProduct />} />
//         <Route path="/admin" element={<Dashboard />} />

//         <Route path="/admin/products" element={<AdminProducts />} />

//         <Route path="/admin/add-product" element={<AddProduct />} />

//         <Route path="/" element={<Home />} />

//         <Route path="/products" element={<Products />} />

//         <Route path="/products/:id" element={<ProductDetails />} />

//         <Route path="/about" element={<About />} />

//         <Route path="/contact" element={<Contact />} />

//         <Route path="/cart" element={<Cart />} />

//         <Route path="*" element={<NotFound />} />
//       </Routes>

//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;

// -------------------------------------------------------?

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Dashboard from "./admin/pages/Dashboard";
import AddProduct from "./admin/pages/AddProduct";
import AdminProducts from "./admin/pages/Products";
import Orders from "./pages/Orders";
import EditProduct from "./admin/pages/EditProduct";
import AdminRoute from "./components/AdminRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import OrderSuccess from "./pages/OrderSuccess";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderDetails from "./pages/OrderDetails";
import AdminOrders from "./admin/pages/Orders";
import AdminOrderDetails from "./admin/pages/OrderDetails";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Addresses from "./pages/Addresses";
function Layout() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}

      {/* <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<AdminProducts />} /> */}
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders/:id"
          element={
            <AdminRoute>
              <AdminOrderDetails />
            </AdminRoute>
          }
        />

        <Route path="/" element={<Home />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/products" element={<Products />} />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />

        <Route
          path="/addresses"
          element={
            <ProtectedRoute>
              <Addresses />
            </ProtectedRoute>
          }
        />

        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
