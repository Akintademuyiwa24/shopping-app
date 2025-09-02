import { EllipsisVertical } from "lucide-react";
import { addToCart } from "./features/product/cartSlice";
import { useGetAllProductsQuery } from "./features/product/productAPI";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./components/dropdown";

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
    description: string;
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
        <ProductGridSkeleton />
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
                    <div className="relative w-full flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <span onClick={(e) => e.stopPropagation()}>
                            <EllipsisVertical className="h-4 w-4 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-200" />
                          </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md p-1 min-w-[4rem]">
                          <DropdownMenuItem
                            className="text-gray-100 text-center font-medium px-4 py-2  hover:text-green-600 cursor-pointer"
                            onSelect={() => {
                              /* handle approve */
                            }}
                          >
                            <Link to={`/product/${product.id}`}>View</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-white font-medium px-4 py-2 hover:text-green-600 cursor-pointer"
                            onSelect={() => {
                              handleAddToCart(product);
                            }}
                          >
                            Buy
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {/* <EllipsisVertical className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 w-10 h-5" /> */}
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
                      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6),linear-gradient(45deg,#f3f4f6_25%,transparent_25%,transparent_75%,#f3f4f6_75%,#f3f4f6)] bg-[size:20px_20px] opacity-10 rounded-xl" />
                    </div>
                    {/* title and price */}
                    <div className="max-w-full flex flex-col items-center mb-4 flex-1">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 text-center line-clamp-2 max-w-[90%]">
                        {product.title}
                      </h3>
                      <div className="mb-4">
                        <span className="text-xl font-bold text-green-600">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 w-full">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
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

const ProductCardSkeleton = ({ index }: { index: number }) => (
  <div
    className="flex flex-col items-center p-6 rounded-2xl shadow-xl bg-white/70 backdrop-blur-md border border-gray-100 animate-pulse"
    style={{
      background:
        "linear-gradient(135deg, rgba(248,250,252,0.95) 60%, rgba(224,231,239,0.85) 100%)",
      animationDelay: `${index * 80}ms`,
    }}
  >
    {/* Skeleton dropdown menu */}
    <div className="relative w-full flex justify-end mb-2">
      <div className="h-4 w-4 bg-gray-300 rounded"></div>
    </div>

    {/* Skeleton image */}
    <div className="w-64 h-64 flex items-center justify-center rounded-xl mb-4 border border-gray-200 shadow-inner bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
      <div className="w-[85%] h-[85%] bg-gray-300 rounded-lg animate-pulse"></div>
    </div>

    {/* Skeleton title and price */}
    <div className="max-w-full flex flex-col items-center mb-4 flex-1 w-full">
      {/* Title skeleton - 2 lines */}
      <div className="w-full mb-2">
        <div className="h-5 bg-gray-300 rounded mb-2 w-[90%] mx-auto"></div>
        <div className="h-5 bg-gray-300 rounded w-[70%] mx-auto"></div>
      </div>

      {/* Price skeleton */}
      <div className="mb-4">
        <div className="h-6 bg-gray-300 rounded w-16"></div>
      </div>
    </div>

    {/* Skeleton button */}
    <div className="flex space-x-2 w-full">
      <div className="flex-1 h-14 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl animate-pulse"></div>
    </div>
  </div>
);
const ProductGridSkeleton = () => (
  <>
    <div className="text-center mb-10 mt-10">
      <div className="h-9 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64 mx-auto animate-pulse"></div>
    </div>
    <div className="overflow-x-auto">
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-8 max-w-[1900px] w-full">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} index={idx} />
          ))}
        </div>
      </div>
    </div>
  </>
);
