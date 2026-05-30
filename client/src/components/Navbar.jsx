import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <img
            src="/Logo.png"
            alt="Logo"
            className="w-14 h-12 object-contain"
          />

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-purple-700 leading-tight">
              GRISFIELD SCHOOLS
            </h1>
            <p className="text-xs text-gray-500">
              Taking the child beyond the limit
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8">
          {["/", "/about", "/events", "/gallery", "/contact"].map(
            (path, i) => (
              <Link
                key={i}
                to={path}
                className="hover:text-purple-700 font-medium capitalize"
              >
                {path === "/" ? "Home" : path.replace("/", "")}
              </Link>
            )
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/result-checker"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
          >
            Check Result
          </Link>

          <Link
            to="/portal"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Portal
          </Link>

          <Link
            to="/apply"
            className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg"
          >
            Apply Now
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-2xl z-50"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/40 lg:hidden"
        />
      )}

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          lg:hidden bg-white border-t px-6 py-5 space-y-4
          absolute w-full left-0 top-full
          transition-all duration-300 ease-in-out
          ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
        `}
      >
        {[
          { name: "Home", to: "/" },
          { name: "About", to: "/about" },
          { name: "Events", to: "/events" },
          { name: "Gallery", to: "/gallery" },
          { name: "Contact", to: "/contact" },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={closeMenu}
            className="block hover:text-purple-700 font-medium"
          >
            {item.name}
          </Link>
        ))}

        <Link
          to="/result-checker"
          onClick={closeMenu}
          className="block text-orange-500 font-semibold"
        >
          Check Result
        </Link>

        <Link
          to="/portal"
          onClick={closeMenu}
          className="block text-blue-600 font-semibold"
        >
          Portal
        </Link>

        <Link
          to="/apply"
          onClick={closeMenu}
          className="block text-purple-700 font-semibold"
        >
          Apply Now
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;