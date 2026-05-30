import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp
} from "react-icons/fa";

import PublicLayout from "../layouts/PublicLayout";
import api from "../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        "/contact",
        formData
      );

      alert(
        res.data.message ||
          "Message sent successfully"
      );

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: ""
      });

    } catch (error) {
      console.log(error);

      alert(
        "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>

      {/* HERO */}
      <section className="relative h-[350px]">
        <img
          src="/school-building.jpg"
          alt="Contact Grisfield Schools"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-6">

            <h1 className="text-5xl md:text-6xl font-bold">
              Contact Us
            </h1>

            <p className="mt-4 text-lg">
              We'd love to hear from you
            </p>

          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-6">

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl shadow-lg text-center"
            >
              <FaMapMarkerAlt className="text-4xl text-purple-700 mx-auto mb-4" />

              <h3 className="font-bold text-xl mb-2">
                Address
              </h3>

              <p className="text-gray-600">
                Plot 107 Gracious Estate,
                Nkwelle Ezunaka,
                Anambra State
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl shadow-lg text-center"
            >
              <FaPhone className="text-4xl text-green-600 mx-auto mb-4" />

              <h3 className="font-bold text-xl mb-2">
                Phone
              </h3>

              <p className="text-gray-600">
                +234 9060158332
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl shadow-lg text-center"
            >
              <FaEnvelope className="text-4xl text-blue-600 mx-auto mb-4" />

              <h3 className="font-bold text-xl mb-2">
                Email
              </h3>

              <p className="text-gray-600 break-all">
                info@grisfieldschools.com.ng
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-3xl shadow-lg text-center"
            >
              <FaClock className="text-4xl text-orange-500 mx-auto mb-4" />

              <h3 className="font-bold text-xl mb-2">
                Office Hours
              </h3>

              <p className="text-gray-600">
                Mon - Fri
                <br />
                8:00 AM - 4:00 PM
              </p>
            </motion.div>

          </div>

        </div>

      </section>

      {/* CONTACT FORM */}
      <section className="py-20 bg-white">

        <div className="max-w-5xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12">

            <div>

              <h2 className="text-4xl font-bold text-purple-800 mb-6">
                Send Us A Message
              </h2>

              <p className="text-gray-600 leading-8">
                Have questions about admissions,
                academics or school activities?
                Fill out the form and we'll
                respond as soon as possible.
              </p>

              <a
                href="https://wa.me/2349060158332"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                <FaWhatsapp />
                Chat On WhatsApp
              </a>

            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 p-8 rounded-3xl shadow-lg"
            >

              <div className="space-y-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

                <textarea
                  rows="6"
                  name="message"
                  placeholder="Your Message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white py-4 rounded-xl font-semibold"
                >
                  {loading
                    ? "Sending..."
                    : "Submit Message"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

      {/* MAP */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-purple-800 mb-10">
            Find Us
          </h2>

          <div className="rounded-3xl overflow-hidden shadow-xl">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3964.0923023926953!2d7.52!3d6.51!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10438d0b788d4ae3%3A0x6a2d9c32a7eca17b!2sGrisfield%20Schools!5e0!3m2!1sen!2sng!4v1780159231510!5m2!1sen!2sng"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>

      </section>

    </PublicLayout>
  );
}

export default Contact;