import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import SearchBar from "../SearchBar/SearchBar";


function ProductList(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products",
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        console.log(data);

        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );


  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {filteredProducts.length === 0 ? (
        <p className="text-center py-10">No products found for "{searchTerm}"</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList
