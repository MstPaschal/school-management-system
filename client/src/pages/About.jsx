import PublicLayout from "../layouts/PublicLayout";
import { motion } from "framer-motion";
import { FaHistory, FaBullseye, FaEye } from "react-icons/fa";

function About() {
  return (
    <PublicLayout>

      {/* HERO */}
      <section className="relative h-[400px]">
        <img
          src="/school-building.jpg"
          alt="Grisfield Schools"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              About Grisfield Schools
            </h1>

            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Raising academically excellent, morally upright
              and globally competitive children.
            </p>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/school-building.jpg"
                alt="School Building"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-purple-800 mb-6">
                Welcome To Our School
              </h2>

              <p className="text-lg text-gray-700 leading-8">
                Grisfield Schools is committed to raising
                academically excellent and morally upright
                children prepared for the future.

                We welcome parents and guardians'
                involvement in the activities of our school
                because we believe that the best education
                comes when there is a close partnership
                between the school and the home.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* HISTORY */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <div className="flex items-center gap-4 mb-6">
              <FaHistory className="text-purple-700 text-4xl" />

              <h2 className="text-4xl font-bold text-purple-800">
                Our History
              </h2>
            </div>

            <p className="text-gray-700 leading-8 text-lg">
              Grisfield Schools was founded in the year 2021
              with the full approval of the Anambra State Government.

              The school has grown into an outstanding institution,
              providing pupils with innovative and practical academic
              experiences alongside a wide range of extracurricular activities.

              Our continuous growth and acceptance within the community
              are attributed to our well-structured programmes and our
              dedicated staff who serve as second parents to our pupils.

              The learning environment at Grisfield Schools is designed
              to provide quality teaching and learning experiences,
              enabling pupils to develop the skills and attitudes
              necessary to thrive in an ever-changing global society.

              We invite you to give your child the best learning
              experience with us at Grisfield Schools.
            </p>

          </div>

        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-8">

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-lg"
            >
              <FaEye className="text-5xl text-purple-700 mb-5" />

              <h3 className="text-3xl font-bold text-purple-700 mb-4">
                Our Vision
              </h3>

              <p className="text-gray-700 leading-8">
                To provide comprehensive educational programmes
                that challenge pupils to perform at their highest
                potential academically, morally and socially.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-3xl shadow-lg"
            >
              <FaBullseye className="text-5xl text-orange-500 mb-5" />

              <h3 className="text-3xl font-bold text-purple-700 mb-4">
                Our Mission
              </h3>

              <p className="text-gray-700 leading-8">
                To teach and prepare every child for success
                through rigorous and relevant learning activities
                that promote academic, physical, emotional and
                character development.
              </p>
            </motion.div>

          </div>

        </div>

      </section>

      {/* OVERVIEW */}
      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-purple-800 mb-8">
            Academic Overview
          </h2>

          <p className="text-lg text-gray-700 leading-9 max-w-4xl mx-auto">
            The curriculum at Grisfield Schools is continually
            updated to incorporate modern teaching methodologies
            while retaining proven educational practices.

            Our teachers are encouraged to exercise creativity
            and professional judgement to create stimulating
            classroom experiences.

            We recognise every child's unique capabilities and
            limitations, providing personalised support that
            inspires a love for learning and strong reading habits.
          </p>

        </div>

      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-blue-700 text-white">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl md:text-5xl font-bold">
            Give Your Child The Best Start
          </h2>

          <p className="mt-6 text-xl text-gray-200">
            Join a school where excellence, discipline,
            innovation and character are nurtured every day.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/apply"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl"
            >
              Apply Now
            </Link>

            <Link
              to="/contact"
              className="bg-white text-purple-800 px-8 py-4 rounded-xl"
            >
              Contact Us
            </Link>
          </div>

        </div>

      </section>

    </PublicLayout>
  );
}

export default About;