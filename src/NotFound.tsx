import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    // how do I style this using tailwind?
    // You can use Tailwind CSS classes to style the NotFound component.
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white px-8 py-10 rounded-xl shadow-lg flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-blue-400 mb-6"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-500 mb-6 text-center max-w-xs">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/commerce"
          className="inline-block px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go Home To Your Families
        </Link>
      </div>
    </div>
  );
}
