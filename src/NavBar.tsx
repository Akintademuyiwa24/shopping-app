import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

import "./App.css";

export default function NavBar() {
  const cartQuantity = useSelector(
    (state: RootState) => state.cart.cartTotalQuantity
  );
  const auth = useSelector((state: RootState) => state);
  console.log(auth);

  return (
    <div>
      <nav className="bg-gray-800 p-4 nav-bar relative">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <Link
              to="/commerce"
              className="hover:text-gray-300 transition-colors"
            >
              MyCommerce
            </Link>
          </div>

          {/* Cart Icon - Fixed Position */}
          <div className="fixed top-4 right-4 z-50">
            <Link
              to="/cart"
              className="relative bg-gray-800/90 backdrop-blur-sm text-white hover:text-gray-300 p-3 rounded-full shadow-lg hover:bg-gray-700/90 transition-all duration-200 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-cart-dash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1" />
              </svg>

              {/* Cart Quantity Badge */}
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {cartQuantity > 99 ? "99+" : cartQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
