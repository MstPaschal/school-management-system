import PublicLayout from "../layouts/PublicLayout";
import HeroSlider from "../components/HeroSlider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaChild,
  FaHandshake,
  FaStar,
  FaBullseye,
} from "react-icons/fa";

function Home() {
  const stats = [
    ["500+", "Students"],
    ["50+", "Teachers"],
    ["6+", "Years Experience"],
    ["95%", "Success Rate"],
  ];

  const testimonials = [1, 2, 3];

  const news = [1, 2, 3];

  const events = [1, 2, 3];

  const campus = [1, 2, 3];

  return (
    <PublicLayout>

      {/* HERO */}
      <HeroSlider />

      {/* ABOUT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <motion.img
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            src="/school-building.jpg"
            alt="School"
            className="rounded-3xl shadow-2xl"
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-purple-800 mb-8">
              About Grisfield Schools
            </h2>

            <p className="text-lg text-gray-700 leading-9">
              Grisfield Schools is committed to developing morally upright,
              academically excellent and globally competitive students.
              We provide a modern learning environment that inspires creativity,
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

      {/* VIDEO */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-purple-800 mb-12">
            Watch Life At Grisfield
          </h2>

          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-[500px]"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="School Video"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* PRINCIPAL */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <img
            src="/Dr Mrs UgoEjike.jpg"
            alt="Principal"
            className="rounded-3xl shadow-2xl"
          />

          <div>
            <h2 className="text-5xl font-bold text-purple-800 mb-8">
              Note of Welcome from the Proprietress
            </h2>

            <p className="text-lg text-gray-700 leading-9">
              At Grisfield Schools, we believe every child possesses unique greatness
              waiting to be developed. Our mission is to nurture confident,
              disciplined and globally competitive learners.
            </p>

            <div className="mt-8">
              <h3 className="font-bold text-2xl text-purple-700">
                Dr. Mrs. Ugo-Ejike Miracle Nkeiruka
              </h3>
              <p className="text-gray-500">Proprietress</p>
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

            {[
              {
                title: "Quality Education",
                img: "Classroom.jpg",
                text: "World-class academic standards with experienced educators.",
                color: "text-purple-700",
              },
              {
                title: "Moral Excellence",
                img: "/reading-pose.png",
                text: "We raise disciplined children with strong moral values.",
                color: "text-blue-700",
              },
              {
                title: "Modern Facilities",
                img: "smart-school.jpg",
                text: "Smart classrooms and digital learning systems.",
                color: "text-orange-600",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className={`text-2xl font-bold mb-4 ${item.color}`}>
                  {item.title}
                </h3>

                <img src={item.img} alt={item.title} className="rounded-xl" />

                <p className="text-gray-600 mt-4">{item.text}</p>
              </div>
            ))}

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

            {[
              { icon: FaChild, title: "Godly Children", bg: "bg-green-600" },
              { icon: FaHandshake, title: "Integrity", bg: "bg-yellow-500" },
              { icon: FaStar, title: "Excellence", bg: "bg-purple-700" },
              { icon: FaBullseye, title: "Goal Oriented", bg: "bg-red-700" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`${item.bg} text-white p-10 rounded-2xl shadow-lg flex flex-col items-center text-center`}
                >
                  <Icon className="text-5xl mb-4" />
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {stats.map(([num, label], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <h3 className="text-4xl font-extrabold text-purple-700">
                {num}
              </h3>
              <p className="mt-4 text-gray-600">{label}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center text-purple-800 mb-16">
            What Parents Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t} className="bg-gray-50 rounded-3xl p-8 shadow-lg">
                <p className="text-gray-600 leading-8">
                  Grisfield Schools has transformed my child academically and morally.
                </p>

                <div className="mt-6">
                  <h3 className="font-bold text-purple-700">Parent Name</h3>
                  <p className="text-sm text-gray-500">Parent</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-800 to-blue-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-5xl font-bold">
            Give Your Child The Best Education
          </h2>

          <p className="mt-6 text-xl text-gray-200">
            Admissions are currently ongoing.
          </p>

          <Link
            to="/apply"
            className="inline-block mt-10 bg-orange-500 hover:bg-orange-600 px-10 py-5 rounded-2xl text-xl font-semibold"
          >
            Apply Now
          </Link>

        </div>
      </section>

      {/* FLOAT */}
      <a
        href="https://wa.me/2349060158332"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl text-3xl"
      >
        💬
      </a>

    </PublicLayout>
  );
}

export default Home;