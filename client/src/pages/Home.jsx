import PublicLayout from "../layouts/PublicLayout";

import HeroSlider from "../components/HeroSlider";

import { 
  FaChild, FaHandshake, FaStar, FaBullseye 
} from "react-icons/fa";

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
      <HeroSlider />

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
              src="/School Building.jpg"
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

      {/* PRINCIPAL SECTION */}
      <section className="py-24 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <div>

            <img
              src="/Dr Mrs UgoEjike.jpg"
              alt="Principal"
              className="rounded-3xl shadow-2xl"
            />

          </div>

          <div>

            <h2 className="text-5xl font-bold text-purple-800 mb-8">

              Welcome From The Principal

            </h2>

            <p className="text-lg text-gray-700 leading-9">

              At Grisfield Schools,
              we believe every child possesses
              unique greatness waiting to be developed.

              Our mission is to nurture confident,
              disciplined and globally competitive learners.

            </p>

            <div className="mt-8">

              <h3 className="font-bold text-2xl text-purple-700">

                Dr. Example Name

              </h3>

              <p className="text-gray-500">

                School Principal

              </p>

            </div>

          </div>

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

              <img src="Smart School.jpg" alt="Modern Facilities" />

              <p className="text-gray-600">

                Smart classrooms, laboratories and digital learning systems.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CORE VALUES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14 text-purple-800">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Godly Children */}
            <div className="bg-green-600 text-white p-10 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center">
              <FaChild className="text-5xl mb-4" />
              <h3 className="text-2xl font-bold">Godly Children</h3>
            </div>

            {/* Integrity */}
            <div className="bg-yellow-500 text-white p-10 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center">
              <FaHandshake className="text-5xl mb-4" />
              <h3 className="text-2xl font-bold">Integrity</h3>
            </div>

            {/* Excellence */}
            <div className="bg-purple-700 text-white p-10 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center">
              <FaStar className="text-5xl mb-4" />
              <h3 className="text-2xl font-bold">Excellence</h3>
            </div>

            {/* Goal Oriented */}
            <div className="bg-red-700 text-white p-10 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center">
              <FaBullseye className="text-5xl mb-4" />
              <h3 className="text-2xl font-bold">Goal Oriented</h3>
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
                className="bg-white rounded-3xl shadow-lg p-6 md:p-10"
              >

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-700">

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

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold text-purple-800">

              What Parents Say

            </h2>

            <p className="mt-5 text-gray-600">

              Testimonials from parents and guardians.

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[1,2,3].map((item) => (

              <div
                key={item}
                className="bg-gray-50 rounded-3xl p-8 shadow-lg"
              >

                <p className="text-gray-600 leading-8">

                  Grisfield Schools has transformed
                  my child academically and morally.

                </p>

                <div className="mt-6">

                  <h3 className="font-bold text-purple-700">

                    Parent Name

                  </h3>

                  <p className="text-sm text-gray-500">

                    Parent

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* NEWS */}
      <section className="py-24 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold text-purple-800">

              Latest News

            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[1,2,3].map((item) => (

              <div
                key={item}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >

                <img
                  src="/event.jpg"
                  alt="news"
                  className="h-60 w-full object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold text-purple-700">

                    Admission Ongoing

                  </h3>

                  <p className="mt-4 text-gray-600">

                    Registration for new students
                    has officially commenced.

                  </p>

                </div>

              </div>

            ))}

          </div>

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

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/2349060158332"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50 text-3xl"
      >

        💬

      </a>

    </PublicLayout>

  );

}

export default Home;