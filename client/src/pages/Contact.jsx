import {
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp
} from "react-icons/fa";

import PublicLayout from "../layouts/PublicLayout";

import api from "../services/api";

import {
  useNotification
} from "../context/NotificationContext";


function Contact() {

  const {
    notify
  } = useNotification();


  const [formData, setFormData] =
    useState({

      name: "",

      phone: "",

      email: "",

      message: ""

    });


  const [loading, setLoading] =
    useState(false);


  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  const handleSubmit =
    async (e) => {

      e.preventDefault();


      // =========================
      // VALIDATE REQUIRED FIELDS
      // =========================

      const missingFields = [];


      if (!formData.name.trim()) {

        missingFields.push("Full Name");

      }


      if (!formData.email.trim()) {

        missingFields.push("Email Address");

      }


      if (!formData.message.trim()) {

        missingFields.push("Message");

      }


      if (missingFields.length > 0) {

        notify(

          `Please fill in: ${missingFields.join(", ")}`,

          "warning"

        );

        return;

      }


      try {

        setLoading(true);


        const res =
          await api.post(

            "/contact",

            {

              name:
                formData.name.trim(),

              phone:
                formData.phone.trim(),

              email:
                formData.email.trim(),

              message:
                formData.message.trim()

            }

          );


        notify(

          res.data.message ||

          "Message sent successfully",

          "success"

        );


        setFormData({

          name: "",

          phone: "",

          email: "",

          message: ""

        });


      } catch (error) {

        console.log(error);

        notify(

          error.response?.data?.message ||

          "Failed to send message",

          "error"

        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <PublicLayout>

      {/* =========================
          HERO
      ========================= */}

      <section className="relative h-[280px] sm:h-[320px] md:h-[350px]">

        <img

          src="/school-building.jpg"

          alt="Contact Grisfield Schools"

          className="
            w-full
            h-full
            object-cover
          "

        />


        <div
          className="
            absolute
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
          "
        >

          <div
            className="
              text-center
              text-white
              px-5
              sm:px-6
            "
          >

            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-6xl
                font-bold
              "
            >

              Contact Us

            </h1>


            <p
              className="
                mt-3
                sm:mt-4
                text-base
                sm:text-lg
              "
            >

              We'd love to hear from you

            </p>

          </div>

        </div>

      </section>


      {/* =========================
          CONTACT INFO
      ========================= */}

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-4
              gap-5
              sm:gap-6
            "
          >

            {/* ADDRESS */}

            <motion.div

              whileHover={{
                y: -5
              }}

              className="
                bg-white
                p-5
                sm:p-6
                rounded-3xl
                shadow-lg
                text-center
              "

            >

              <FaMapMarkerAlt
                className="
                  text-4xl
                  text-purple-700
                  mx-auto
                  mb-4
                "
              />


              <h3
                className="
                  font-bold
                  text-lg
                  sm:text-xl
                  mb-2
                "
              >

                Address

              </h3>


              <p className="text-gray-600 leading-6">

                Plot 107 Gracious Estate,

                <br />

                Nkwelle Ezunaka,

                <br />

                Anambra State

              </p>

            </motion.div>


            {/* PHONE */}

            <motion.div

              whileHover={{
                y: -5
              }}

              className="
                bg-white
                p-5
                sm:p-6
                rounded-3xl
                shadow-lg
                text-center
              "

            >

              <FaPhone
                className="
                  text-4xl
                  text-green-600
                  mx-auto
                  mb-4
                "
              />


              <h3
                className="
                  font-bold
                  text-lg
                  sm:text-xl
                  mb-2
                "
              >

                Phone

              </h3>


              <p className="text-gray-600">

                +234 9060158332

              </p>

            </motion.div>


            {/* EMAIL */}

            <motion.div

              whileHover={{
                y: -5
              }}

              className="
                bg-white
                p-5
                sm:p-6
                rounded-3xl
                shadow-lg
                text-center
              "

            >

              <FaEnvelope
                className="
                  text-4xl
                  text-blue-600
                  mx-auto
                  mb-4
                "
              />


              <h3
                className="
                  font-bold
                  text-lg
                  sm:text-xl
                  mb-2
                "
              >

                Email

              </h3>


              <p
                className="
                  text-gray-600
                  break-all
                  text-sm
                  sm:text-base
                "
              >

                info@grisfieldschools.com.ng

              </p>

            </motion.div>


            {/* OFFICE HOURS */}

            <motion.div

              whileHover={{
                y: -5
              }}

              className="
                bg-white
                p-5
                sm:p-6
                rounded-3xl
                shadow-lg
                text-center
              "

            >

              <FaClock
                className="
                  text-4xl
                  text-orange-500
                  mx-auto
                  mb-4
                "
              />


              <h3
                className="
                  font-bold
                  text-lg
                  sm:text-xl
                  mb-2
                "
              >

                Office Hours

              </h3>


              <p className="text-gray-600 leading-6">

                Mon - Fri

                <br />

                8:00 AM - 4:00 PM

              </p>

            </motion.div>

          </div>

        </div>

      </section>


      {/* =========================
          CONTACT FORM
      ========================= */}

      <section className="py-12 sm:py-16 md:py-20 bg-white">

        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-8
              md:gap-12
            "
          >

            {/* INTRODUCTION */}

            <div>

              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-purple-800
                  mb-5
                  sm:mb-6
                "
              >

                Send Us A Message

              </h2>


              <p
                className="
                  text-gray-600
                  leading-7
                  sm:leading-8
                "
              >

                Have questions about admissions,
                academics or school activities?
                Fill out the form and we'll
                respond as soon as possible.

              </p>


              <a

                href="https://wa.me/2349060158332"

                target="_blank"

                rel="noreferrer"

                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  mt-7
                  sm:mt-8
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  w-full
                  sm:w-auto
                  transition
                "

              >

                <FaWhatsapp />

                Chat On WhatsApp

              </a>

            </div>


            {/* FORM */}

            <form

              onSubmit={handleSubmit}

              className="
                bg-gray-50
                p-5
                sm:p-7
                md:p-8
                rounded-2xl
                sm:rounded-3xl
                shadow-lg
              "

            >

              <div className="space-y-5">

                {/* NAME */}

                <div>

                  <label
                    htmlFor="name"
                    className="
                      block
                      mb-1.5
                      text-sm
                      font-medium
                      text-gray-700
                    "
                  >

                    Full Name

                  </label>


                  <input

                    id="name"

                    type="text"

                    name="name"

                    placeholder="Full Name"

                    value={formData.name}

                    onChange={handleChange}

                    className="
                      w-full
                      border
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:ring-2
                      focus:ring-purple-200
                      focus:border-purple-500
                      transition
                    "

                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="
                      block
                      mb-1.5
                      text-sm
                      font-medium
                      text-gray-700
                    "
                  >

                    Email Address

                  </label>


                  <input

                    id="email"

                    type="email"

                    name="email"

                    placeholder="Email Address"

                    value={formData.email}

                    onChange={handleChange}

                    className="
                      w-full
                      border
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:ring-2
                      focus:ring-purple-200
                      focus:border-purple-500
                      transition
                    "

                  />

                </div>


                {/* PHONE */}

                <div>

                  <label
                    htmlFor="phone"
                    className="
                      block
                      mb-1.5
                      text-sm
                      font-medium
                      text-gray-700
                    "
                  >

                    Phone Number
                    <span className="text-gray-400 font-normal">
                      {" "} (Optional)
                    </span>

                  </label>


                  <input

                    id="phone"

                    type="tel"

                    name="phone"

                    placeholder="Phone Number"

                    value={formData.phone}

                    onChange={handleChange}

                    inputMode="tel"

                    className="
                      w-full
                      border
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:ring-2
                      focus:ring-purple-200
                      focus:border-purple-500
                      transition
                    "

                  />

                </div>


                {/* MESSAGE */}

                <div>

                  <label
                    htmlFor="message"
                    className="
                      block
                      mb-1.5
                      text-sm
                      font-medium
                      text-gray-700
                    "
                  >

                    Message

                  </label>


                  <textarea

                    id="message"

                    rows="6"

                    name="message"

                    placeholder="Your Message"

                    value={formData.message}

                    onChange={handleChange}

                    className="
                      w-full
                      border
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      resize-y
                      focus:ring-2
                      focus:ring-purple-200
                      focus:border-purple-500
                      transition
                    "

                  />

                </div>


                {/* SUBMIT */}

                <button

                  type="submit"

                  disabled={loading}

                  className="
                    w-full
                    bg-purple-700
                    hover:bg-purple-800
                    disabled:bg-purple-400
                    disabled:cursor-not-allowed
                    text-white
                    py-3.5
                    sm:py-4
                    rounded-xl
                    font-semibold
                    transition
                  "

                >

                  {

                    loading

                      ? "Sending..."

                      : "Submit Message"

                  }

                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

    </PublicLayout>

  );

}

export default Contact;