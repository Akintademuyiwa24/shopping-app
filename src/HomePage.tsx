import { useGetAllProductsQuery } from "./features/product/productAPI";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
];

export function HomePage() {
  const { data } = useGetAllProductsQuery();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  console.log("data", data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile Navigation Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 bg-white rounded-lg shadow-lg border border-gray-200"
        >
          {isMobileNavOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navigation />
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <MobileNavigation onClose={() => setIsMobileNavOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="md:ml-72 min-h-screen">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Content />
        </div>
      </main>
    </div>
  );
}

function Content() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 mx-2 sm:mx-4 md:mx-6 my-4 md:my-8">
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-6">
              Meet our leadership
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {people.map((person, idx) => (
              <div
                key={person.name}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    alt={person.name}
                    src={person.imageUrl}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg border-2 border-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                      {person.name}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-blue-600">
                      {person.role}
                    </p>
                    {person.email && (
                      <p className="text-xs sm:text-sm text-gray-500 truncate mt-1">
                        {person.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center space-x-2 text-xs sm:text-sm">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      person.lastSeen ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                  <span className="text-gray-600">
                    {person.lastSeen ? `Active ${person.lastSeen}` : "Offline"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navigation() {
  return (
    <aside className="fixed left-0 inset-y-0 w-72 bg-white/90 backdrop-blur-md border-r border-gray-200 shadow-xl flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-lg">
            <ShoppingBag className="h-16 w-16 text-blue-600" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Welcome to Our Store
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Discover amazing products and start your shopping journey with us
              today.
            </p>
          </div>

          <Link
            to="/commerce"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Start Shopping
          </Link>
        </div>
      </div>
    </aside>
  );
}

function MobileNavigation({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
            <ShoppingBag className="h-12 w-12 text-blue-600" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Welcome to Our Store
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Discover amazing products and start your shopping journey.
            </p>
          </div>

          <Link
            to="/commerce"
            onClick={onClose}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
