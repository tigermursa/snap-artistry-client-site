import React, { useEffect, useState } from "react";
import "./Products.css"
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-500 text-2xl pulsate">
          &#9733;
        </span>
      );
    }

    return <div className="flex items-center">{stars}</div>;
  };

  const renderProductCard = (product) => {
    const isHotProduct = product.price >= 2000;

    return (
      <div key={product.id} className="bg-white p-4 shadow-md rounded-lg relative">
        {isHotProduct && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-bl">
            Hot Product
          </span>
        )}
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-60 object-scale-down rounded-lg"
        />
        <div className="mt-4">
          <p className="text-lg font-semibold text-black">{product.productName}</p>
          <p className="text-lime-600 text-xl font-semibold mt-1 mb-2">{product.brand}</p>
          <p className="text-black text-justify">{product.aboutProduct}</p>
          <div className="flex items-center justify-center mt-2">{renderStars(product.rating)}</div>
          <p className="text-black font-bold mt-2">Sold: {product.sold}</p>
          <p className="text-black font-bold text-2xl mt-2 mb-3">Price: ${product.price}</p>
          <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg">
            Add to Cart &#128722;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 mb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {products.map((product) => renderProductCard(product))}
      </div>
    </div>
  );
};

export default Products;
