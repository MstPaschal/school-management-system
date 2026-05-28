import PublicLayout from "../layouts/PublicLayout";

import {
  motion
} from "framer-motion";

import {
  Link
} from "react-router-dom";

function Home() {

  return (

    <PublicLayout>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-purple-900 via-blue-800 to-purple-700 text-white">

        {/* BACKGROUND OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

          <motion.h1
            initial={{
              opacity: 0,
              y: -50
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 1
            }}
            className="text-5xl md:text-7xl font-extrabold leading-tight"
          >

            Welcome to

            <span className="block text-orange-400 mt-3">

              GRISFIELD SCHOOLS

            </span>

          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.3,
              duration: 1
            }}
            className="mt-8 text-xl md:text-2xl max-w-3xl mx-auto text-gray-200"
          >

            Raising future leaders through
            academic excellence, innovation,
            discipline and creativity.

          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.6
            }}
            className="mt-10 flex flex-wrap justify-center gap-5"
          >

            <Link
              to="/apply"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
            >

              Apply Now

            </Link>

            <Link
              to="/result-checker"
              className="bg-white text-purple-800 hover:bg-gray-200 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
            >

              Check Result

            </Link>

            <Link
              to="/portal"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
            >

              School Portal

            </Link>

          </motion.div>

        </div>

      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <div>

            <motion.img
              initial={{
                opacity: 0,
                x: -50
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 1
              }}
              src="/school-building.jpg"
              alt="School"
              className="rounded-3xl shadow-2xl"
            />

          </div>

          <motion.div
            initial={{
              opacity: 0,
              x: 50
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 1
            }}
          >

            <h2 className="text-5xl font-bold text-purple-800 mb-8">

              About Grisfield Schools

            </h2>

            <p className="text-lg text-gray-700 leading-9">

              Grisfield Schools is committed
              to developing morally upright,
              academically excellent and globally
              competitive students.

              We provide a modern learning
              environment that inspires creativity,
              leadership and innovation.

            </p>

            <Link
              to="/about"
              className="inline-block mt-8 bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-xl"
            >

              Learn More

            </Link>

          </motion.div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14 text-purple-800">

            Why Choose Us

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-lg">

              <h3 className="text-2xl font-bold mb-4 text-purple-700">

                Quality Education

              </h3>

              <p className="text-gray-600">

                We provide world-class academic standards
                with experienced educators.

              </p>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">

              <h3 className="text-2xl font-bold mb-4 text-blue-700">

                Moral Excellence

              </h3>

              <p className="text-gray-600">

                We raise disciplined children with strong
                moral values.

              </p>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">

              <h3 className="text-2xl font-bold mb-4 text-orange-600">

                Modern Facilities

              </h3>

              <p className="text-gray-600">

                Smart classrooms, laboratories and digital learning systems.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* STATISTICS */}
      <section className="py-20 bg-amber-50">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {
            [
              ["500+", "Students"],
              ["50+", "Teachers"],
              ["6+", "Years Experience"],
              ["95%", "Success Rate"]
            ].map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.2
                }}
                className="bg-white rounded-3xl shadow-lg p-10"
              >

                <h3 className="text-5xl font-extrabold text-purple-700">

                  {item[0]}

                </h3>

                <p className="mt-4 text-gray-600 text-lg">

                  {item[1]}

                </p>

              </motion.div>

            ))
          }

        </div>

      </section>

      {/* EVENTS SECTION */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold text-purple-800">

              Latest Events

            </h2>

            <p className="text-gray-600 mt-5 text-lg">

              Stay updated with activities happening
              at Grisfield Schools.

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-10">

            {
              [1, 2, 3].map((item) => (

                <motion.div
                  key={item}
                  whileHover={{
                    y: -10
                  }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >

                  <img
                    src="/event.jpg"
                    alt="Event"
                    className="h-64 w-full object-cover"
                  />

                  <div className="p-6">

                    <h3 className="text-2xl font-bold text-purple-800">

                      Inter-House Sports

                    </h3>

                    <p className="mt-4 text-gray-600">

                      Students showcasing excellence,
                      teamwork and leadership.

                    </p>

                  </div>

                </motion.div>

              ))
            }

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-800 to-blue-700 text-white text-center">

        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-5xl font-bold leading-tight">

            Give Your Child The Best Education

          </h2>

          <p className="mt-8 text-xl text-gray-200">

            Admissions are currently ongoing
            for the new academic session.

          </p>

          <Link
            to="/apply"
            className="inline-block mt-10 bg-orange-500 hover:bg-orange-600 px-10 py-5 rounded-2xl text-xl font-semibold"
          >

            Apply Now

          </Link>

        </div>

      </section>

    </PublicLayout>

  );

}

export default Home;