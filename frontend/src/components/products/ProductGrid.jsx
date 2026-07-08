import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

    </div>
  );
}

export default ProductGrid;