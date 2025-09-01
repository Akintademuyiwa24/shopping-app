import { addToCart } from "./features/product/cartSlice";
import { useGetAllProductsQuery } from "./features/product/productAPI";
// import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import { useDispatch } from "react-redux";

export default function Commerce() {
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  console.log("products", products);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    desc: string;
    // For any additional properties
  }

  function handleAddToCart(product: Product): void {
    dispatch(addToCart(product));
    // navigate('/cart'); // Navigate to the cart page after adding the product
  }

  return (
    <div>
      <NavBar />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>
          Error:{" "}
          {"status" in error
            ? JSON.stringify(error.data) || error.status
            : error.message || "An unknown error occurred"}
        </p>
      ) : (
        <>
          <h2 className="text-center mb-10 mt-10 text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            New Arrivals
          </h2>
          <div className="overflow-x-auto">
            <div className="w-full flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-8 max-w-[1900px] w-full">
                {products?.map((product, idx) => (
                  <div
                    key={product.id}
                    className="flex flex-col items-center p-6 rounded-2xl shadow-xl bg-white/70 backdrop-blur-md border border-gray-100 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 relative animate-fade-up"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(248,250,252,0.95) 60%, rgba(224,231,239,0.85) 100%)",
                      animationDelay: `${idx * 80}ms`,
                    }}
                  >
                    <div className="w-64 h-64 flex items-center justify-center rounded-xl mb-4 border border-gray-200 shadow-inner bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="max-w-[85%] max-h-[85%] object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 bg-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #f3f4f6 80%, #e0e7ef 100%)",
                          padding: "1rem",
                          borderRadius: "1rem",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      {/* Optional: Add a checkerboard bg for images with white bg */}
                      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6),linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6)] bg-[size:20px_20px] opacity-10 rounded-xl" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 text-center line-clamp-2 max-w-[90%]">
                      {product.title}
                    </h3>
                    <div className="mb-4">
                      <span className="text-xl font-bold text-green-600">
                        ${product.price}
                      </span>
                    </div>
                    <div className="flex space-x-2 w-full">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-purple-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounce-once"
                      >
                        Add to Cart
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition-all duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
