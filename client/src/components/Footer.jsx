function Footer() {

  return (

    <footer className="bg-purple-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>

          <h2 className="text-2xl font-bold mb-4">

            GRISFIELD SCHOOLS

          </h2>

          <p className="text-gray-300">

            Raising future leaders through excellence,
            discipline and innovation.

          </p>

        </div>

        <div>
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d253853.9180028169!2d6.54306248671875!3d6.201895900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgrisfield%20schools!5e0!3m2!1sen!2sng!4v1780012764190!5m2!1sen!2sng"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-2xl">
          </iframe>
        </div>

        <div>

          <h3 className="font-bold mb-4">

            Quick Links

          </h3>

          <div className="space-y-2">

            <p>About</p>

            <p>Admissions</p>

            <p>Portal</p>

            <p>Check Result</p>

          </div>

        </div>

        <div>

          <h3 className="font-bold mb-4">

            Contact

          </h3>

          <div className="space-y-2 text-gray-300">

            <p>Plot 107 Gracious Estate, Nkwelle Ezunaka, Anambra State.</p>

            <p>+234 9060158332</p>

            <p>info@grisfieldschools.com.ng</p>

          </div>

        </div>

      </div>

      <div className="border-t border-purple-700 text-center py-4 text-sm">

        © 2026 Grisfield Schools.
        All Rights Reserved.
        <span>Designed and Managed by 
          <a href="">Passy Technologies</a></span>

      </div>

    </footer>

  );

}

export default Footer;