import { useState, useEffect } from "react";

export default function AllProducts() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-medium text-gray-800 mb-2">All Products</h1>
        <p className="text-sm text-gray-400 mb-6">{filtered.length} products found</p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 text-sm mb-8 focus:outline-none focus:border-gray-500"
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col hover:shadow-sm transition"
            >
              <div className="h-40 flex items-center justify-center mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-xs text-gray-400 mb-1 capitalize">{product.category}</p>
              <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
              <p className="text-blue-500 font-medium text-sm mt-auto">${product.price}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}