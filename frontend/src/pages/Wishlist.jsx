import { useWishlist } from "../context/WishlistContext";
import ProductGrid from "../components/products/ProductGrid";

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          My Wishlist ❤️
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-12 text-center">

            <h2 className="text-3xl font-bold">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mt-3">
              Save products to view them later.
            </p>

          </div>
        ) : (
          <ProductGrid products={wishlist} />
        )}

      </div>
    </section>
  );
}

export default Wishlist;