import PublicLayout from "../layouts/PublicLayout";

import { useState } from "react";

import api from "../services/api";

import {
  useNotification
} from "../context/NotificationContext";


function ApplyNow() {

  const { notify } = useNotification();

  const [formData, setFormData] =
    useState({

      studentName: "",

      parentName: "",

      phone: "",

      email: "",

      level: "",

      className: "",

      lastSchool: ""

    });


  const [submitting, setSubmitting] =
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
      // REQUIRED FIELD VALIDATION
      // =========================

      const requiredFields = [
        {
          key: "studentName",
          label: "Student Full Name"
        },
        {
          key: "parentName",
          label: "Parent Name"
        },
        {
          key: "phone",
          label: "Phone Number"
        },
        {
          key: "email",
          label: "Email"
        },
        {
          key: "level",
          label: "Class Level"
        },
        {
          key: "className",
          label: "Specific Class"
        }
      ];


      const missingFields =
        requiredFields
          .filter(
            (field) =>
              !formData[field.key].trim()
          )
          .map(
            (field) =>
              field.label
          );


      if (missingFields.length > 0) {

        notify(
          `Please fill in: ${missingFields.join(", ")}`,
          "warning"
        );

        return;

      }


      try {

        setSubmitting(true);


        const res =
          await api.post(

            "/admissions",

            formData

          );


        notify(

          res.data.message ||
          "Application submitted successfully",

          "success"

        );


        // Clear the form after
        // successful submission.
        setFormData({

          studentName: "",

          parentName: "",

          phone: "",

          email: "",

          level: "",

          className: "",

          lastSchool: ""

        });


      } catch (error) {

        console.log(error);

        notify(

          error.response?.data?.message ||

          "Failed to submit application",

          "error"

        );

      } finally {

        setSubmitting(false);

      }

    };


  return (

    <PublicLayout>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">

        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <h1
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              font-bold
              text-purple-800
              mb-8
              sm:mb-10
              text-center
              md:text-left
            "
          >

            Apply For Admission

          </h1>


          <form

            onSubmit={handleSubmit}

            className="
              bg-white
              shadow-xl
              rounded-2xl
              sm:rounded-3xl
              p-5
              sm:p-7
              md:p-8
              space-y-5
              sm:space-y-6
            "

          >

            {/* STUDENT NAME */}
            <div>

              <label
                htmlFor="studentName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Student Full Name
              </label>

              <input

                id="studentName"

                type="text"

                name="studentName"

                value={formData.studentName}

                onChange={handleChange}

                placeholder="Student Full Name"

                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3.5
                  sm:py-4
                  text-sm
                  sm:text-base
                  outline-none
                  focus:ring-2
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                "

              />

            </div>


            {/* PARENT NAME */}
            <div>

              <label
                htmlFor="parentName"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Parent / Guardian Name
              </label>

              <input

                id="parentName"

                type="text"

                name="parentName"

                value={formData.parentName}

                onChange={handleChange}

                placeholder="Parent Name"

                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3.5
                  sm:py-4
                  text-sm
                  sm:text-base
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
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>

              <input

                id="phone"

                type="tel"

                name="phone"

                value={formData.phone}

                onChange={handleChange}

                placeholder="Phone Number"

                inputMode="tel"

                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3.5
                  sm:py-4
                  text-sm
                  sm:text-base
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
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input

                id="email"

                type="email"

                name="email"

                value={formData.email}

                onChange={handleChange}

                placeholder="Email"

                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3.5
                  sm:py-4
                  text-sm
                  sm:text-base
                  outline-none
                  focus:ring-2
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                "

              />

            </div>


            {/* LEVEL */}
            <div>

              <label
                htmlFor="level"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Class Level
              </label>

              <select

                id="level"

                name="level"

                value={formData.level}

                onChange={handleChange}

                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3.5
                  sm:py-4
                  text-sm
                  sm:text-base
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                "

              >

                <option value="">
                  Select Class Level
                </option>

                <option value="Nursery">
                  Nursery
                </option>

                <option value="Primary">
                  Primary
                </option>

                <option value="Secondary">
                  Secondary
                </option>

              </select>

            </div>


            {/* CLASS */}
            <div>

              <label
                htmlFor="className"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Specific Class
              </label>

              <input

                id="className"

                type="text"

                name="className"

                value={formData.className}

                onChange={handleChange}

                placeholder="Specify Class"

                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3.5
                  sm:py-4
                  text-sm
                  sm:text-base
                  outline-none
                  focus:ring-2
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                "

              />

            </div>


            {/* LAST SCHOOL */}
            <div>

              <label
                htmlFor="lastSchool"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Last School Attended
                <span className="text-gray-400 font-normal">
                  {" "} (Optional)
                </span>
              </label>

              <input

                id="lastSchool"

                type="text"

                name="lastSchool"

                value={formData.lastSchool}

                onChange={handleChange}

                placeholder="Last School attended"

                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3.5
                  sm:py-4
                  text-sm
                  sm:text-base
                  outline-none
                  focus:ring-2
                  focus:ring-purple-200
                  focus:border-purple-500
                  transition
                "

              />

            </div>


            {/* SUBMIT */}
            <div className="pt-2">

              <button

                type="submit"

                disabled={submitting}

                className="
                  w-full
                  sm:w-auto
                  bg-purple-700
                  hover:bg-purple-800
                  disabled:bg-purple-400
                  disabled:cursor-not-allowed
                  text-white
                  px-8
                  py-3.5
                  sm:py-4
                  rounded-xl
                  font-semibold
                  transition
                  shadow-md
                  hover:shadow-lg
                "

              >

                {
                  submitting
                    ? "Submitting..."
                    : "Submit Application"
                }

              </button>

            </div>

          </form>

        </div>

      </section>

    </PublicLayout>

  );

}

export default ApplyNow;