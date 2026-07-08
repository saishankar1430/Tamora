import { useEffect, useState } from "react";
import { getProducts } from "../services/firebaseProducts";

import SearchBar from "../components/products/SearchBar";
import Filter from "../components/products/Filter";
import ProductGrid from "../components/products/ProductGrid";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selected === "All" || product.category === selected;

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-5xl font-bold mb-12">
          All Products
        </h1>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <Filter
          selected={selected}
          setSelected={setSelected}
        />

        <ProductGrid products={filteredProducts} />
      </div>
    </section>
  );
}

export default Products;