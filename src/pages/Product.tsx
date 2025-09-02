import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../features/product/productAPI";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../features/product/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductViewPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(Number(id));

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't load this product. Please try again later.
          </p>
          <Link
            to="/commerce"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            to="/commerce"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      {product && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 aspect-square flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-pink-200 to-yellow-200 rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-100">
                {/* Product Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < 4
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">(4.2)</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">1,247 reviews</span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${(product.price * 1.3).toFixed(2)}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      23% OFF
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {product.description ||
                      product.description ||
                      "Experience premium quality with this carefully crafted product. Designed with attention to detail and built to last, this item combines style, functionality, and durability to exceed your expectations."}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-medium text-gray-800 border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({ ...product, cartQuantity: quantity })
                      )
                    }
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`px-6 py-4 rounded-2xl font-semibold border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                      isWishlisted
                        ? "bg-red-50 border-red-500 text-red-600"
                        : "bg-white border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                    <span>{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
                    <Truck className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        Free Shipping
                      </p>
                      <p className="text-gray-600 text-xs">
                        On orders over $50
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        Warranty
                      </p>
                      <p className="text-gray-600 text-xs">2 year guarantee</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
                    <RotateCcw className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        Returns
                      </p>
                      <p className="text-gray-600 text-xs">30-day policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
