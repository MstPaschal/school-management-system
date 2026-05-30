import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-purple-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* SCHOOL INFO */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            GRISFIELD SCHOOLS
          </h2>

          <p className="text-gray-300 leading-7">
            Raising future leaders through excellence,
            discipline and innovation.
          </p>

          <div className="flex gap-4 mt-6 text-xl">

            <a
              href="#"
              className="hover:text-yellow-400 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="hover:text-yellow-400 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/2349060158332"
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow-400 transition"
            >
              <FaWhatsapp />
            </a>

          </div>
        </div>

        {/* MAP */}
        <div>
          <h3 className="font-bold mb-4">
            Find Us
          </h3>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d253853.9180028169!2d6.54306248671875!3d6.201895900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgrisfield%20schools!5e0!3m2!1sen!2sng!4v1780012764190!5m2!1sen!2sng"
            width="100%"
            height="180"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
            title="School Location"
          />
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-bold mb-4">
            Quick Links
          </h3>

          <div className="space-y-3">

            <Link
              to="/about"
              className="block hover:text-yellow-400 transition"
            >
              About Us
            </Link>

            <Link
              to="/apply"
              className="block hover:text-yellow-400 transition"
            >
              Admissions
            </Link>

            <Link
              to="/portal"
              className="block hover:text-yellow-400 transition"
            >
              Portal
            </Link>

            <Link
              to="/result-checker"
              className="block hover:text-yellow-400 transition"
            >
              Check Result
            </Link>

          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-bold mb-4">
            Contact Us
          </h3>

          <div className="space-y-3 text-gray-300">

            <p>
              Plot 107 Gracious Estate,
              Nkwelle Ezunaka,
              Anambra State.
            </p>

            <p>
              +234 906 015 8332
            </p>

            <p>
              info@grisfieldschools.com.ng
            </p>

          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-purple-700 text-center py-5 text-sm text-gray-300">

        © 2026 Grisfield Schools.
        All Rights Reserved.

        <div className="mt-2">
          Designed & Managed by{" "}
          <span className="font-semibold text-white">
            Passy Technologies
          </span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;