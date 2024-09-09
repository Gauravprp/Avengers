import React, { useEffect, useState } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://vinayk57.sg-host.com/wp-json/wp/v2/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <>
      <div>
        <h1>Shop Page</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="bg-black text-white min-h-screen p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Shop</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="Treatment-product bg-gray-800 p-6 rounded-lg"
            >
              {/* Fetch the featured image URL if available */}
              {product.featured_media ? (
                <img
                  src={product.featured_media_url} // Adjust according to your API response
                  alt={product.title.rendered}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 mb-4 rounded"></div> // Placeholder if no image
              )}

              <h2 className="text-2xl font-semibold mb-2">
                {product.title.rendered}
              </h2>

              {/* Product Price */}
              {product.price && (
                <p className="text-xl font-semibold mb-2">
                  ${product.price}{" "}
                  {/* Assuming price is available in the response */}
                </p>
              )}

              {/* Product Excerpt */}
              <p
                className="text-lg mb-4"
                dangerouslySetInnerHTML={{ __html: product.excerpt.rendered }}
              ></p>

              {/* Add to Cart Button */}
              <a
                href={`/product/${product.id}`}
                className="Treatment-button inline-block bg-blue-500 text-white px-4 py-2 rounded mb-2"
              >
                Add to Cart
              </a>

              {/* Product Ratings */}
              {product.average_rating && (
                <p className="text-yellow-400">
                  Rating: {product.average_rating} / 5
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
