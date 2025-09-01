import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSeerbitPayment } from "seerbit-reactjs";

type CartItem = {
  // Define the properties of a cart item, for example:
  id: string;
  title: string;
  quantity: number;
  price: number;
  desc: string;
  image: string;
  cartQuantity: number;
};

type CartState = {
  cart: {
    cartItems: CartItem[];
  };
};

export default function Cart() {
  const cart = useSelector((state: CartState) => state.cart);
  const dispatch = useDispatch();

  const cartTotalAmount = cart.cartItems
    .reduce((total, item) => total + item.price * item.cartQuantity, 0)
    .toFixed(2);

  function handleRemove(item: CartItem) {
    dispatch({ type: "cart/removeFromCart", payload: item });
  }
  function handleClearCart() {
    dispatch({ type: "cart/clearCart" });
  }
  function handleIncrement(item: CartItem) {
    dispatch({ type: "cart/incrementCartQuantity", payload: item });
  }
  function handleDecrement(item: CartItem) {
    dispatch({ type: "cart/decrementCartQuantity", payload: item });
  }
  useEffect(() => {
    dispatch({ type: "cart/getTotal" });
    localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
  }, [cart, dispatch]);

  const options = {
    public_key: "SBTESTPUBK_wLVXnn6YuGaTlOpUESrR7TzFwaDb2auC",
    amount: cartTotalAmount,
    tranref: new Date().getTime(),
    currency: "USD",
    email: "test@mail.com",
    full_name: "Sam Smart",
    mobile_no: "081234566789",
    description: "Shopping Items",
    tokenize: false,
    planId: "",
    pocketId: "",
    vendorId: "",
    customization: {
      theme: {
        border_color: "#000000",
        background_color: "#004C64",
        button_color: "#0084A0",
      },
      payment_method: ["card", "account", "transfer", "wallet", "ussd"],
      display_fee: true, // true
      display_type: "embed", //inline
      logo: "logo_url | base64",
    },
  };

  // Remove unused CloseFunction and CloseCallback interfaces and redefine close as a no-argument function
  const close = () => {
    console.log("Checkout closed");
  };

  const callback = (response: unknown, closeCheckout: () => void) => {
    console.log(response);

    setTimeout(() => closeCheckout(), 2000);
  };

  const initializePayment = useSeerbitPayment(options, callback, close);

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {cart.cartItems.length !== 0 && (
        <div className="mb-6">
          Go back to{" "}
          <Link to="/commerce" className="text-blue-500 hover:underline">
            Shopping
          </Link>
        </div>
      )}
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        🛒 Shopping Cart
      </h2>
      {cart.cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link
            to="/commerce"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go back to shopping
          </Link>
        </div>
      ) : (
        <div>
          {/* Cart Table Header */}
          <div className="grid grid-cols-5 gap-4 py-3 border-b font-semibold text-gray-700 uppercase text-sm">
            <div className="col-span-2">Product</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Price</div>
            <div className="text-center">Total</div>
          </div>
          {/* Cart Items */}
          <div>
            {cart.cartItems?.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 gap-4 items-center py-4 border-b hover:bg-gray-50 transition"
              >
                {/* Product Info */}
                <div className="flex items-center col-span-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded shadow mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                    <button
                      onClick={() => handleRemove(item)}
                      className="mt-2 text-red-500 hover:underline text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleDecrement(item)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="px-3">{item.cartQuantity}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
                {/* Price */}
                <div className="text-center text-gray-700 font-medium">
                  ${item.price.toFixed(2)}
                </div>
                {/* Total */}
                <div className="text-center text-gray-900 font-bold">
                  ${(item.price * item.cartQuantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          {/* Cart Summary */}
          <div className="mt-8 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6">
            <button
              onClick={handleClearCart}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition mb-4 md:mb-0"
            >
              Clear Cart
            </button>
            <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-6 shadow">
              <div className="flex justify-between mb-2 text-lg font-semibold">
                <span>Subtotal</span>
                <span>${cartTotalAmount}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Taxes and shipping calculated at checkout
              </p>
              <button
                onClick={initializePayment}
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-bold"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
