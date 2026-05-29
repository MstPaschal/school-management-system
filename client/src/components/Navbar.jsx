import {
  Link
} from "react-router-dom";

import {
  FaBars,
  FaTimes
} from "react-icons/fa";

import {
  useState
} from "react";

function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (

    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <img
            src="/Logo.png"
            alt="Logo"
            className="w-15 h-12"
          />

          <div>

            <h1 className="text-3xl font-bold text-purple-700">

              GRISFIELD SCHOOLS

            </h1>

            <p className="text-xs text-gray-500">

              Taking the child beyond the limit

            </p>

          </div>

        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8">

          <Link
            to="/"
            className="hover:text-purple-700 font-medium"
          >

            Home

          </Link>

          <Link
            to="/about"
            className="hover:text-purple-700 font-medium"
          >

            About

          </Link>

          <Link
            to="/events"
            className="hover:text-purple-700 font-medium"
          >

            Events

          </Link>

          <Link
            to="/gallery"
            className="hover:text-purple-700 font-medium"
          >

            Gallery

          </Link>

          <Link
            to="/contact"
            className="hover:text-purple-700 font-medium"
          >

            Contact

          </Link>

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
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="lg:hidden text-2xl"
        >

          {
            menuOpen
              ? <FaTimes />
              : <FaBars />
          }

        </button>

      </div>

      {/* MOBILE MENU */}
      {
        menuOpen && (

          <div className="lg:hidden bg-white border-t px-6 py-5 space-y-4">

            <Link
              to="/"
              className="block"
            >

              Home

            </Link>

            <Link
              to="/about"
              className="block"
            >

              About

            </Link>

            <Link
              to="/events"
              className="block"
            >

              Events

            </Link>

            <Link
              to="/gallery"
              className="block"
            >

              Gallery

            </Link>

            <Link
              to="/contact"
              className="block"
            >

              Contact

            </Link>

            <Link
              to="/result-checker"
              className="block text-orange-500 font-semibold"
            >

              Check Result

            </Link>

            <Link
              to="/portal"
              className="block text-blue-600 font-semibold"
            >

              Portal

            </Link>

            <Link
              to="/apply"
              className="block text-purple-700 font-semibold"
            >

              Apply Now

            </Link>

          </div>

        )
      }

    </nav>

  );

}

export default Navbar;