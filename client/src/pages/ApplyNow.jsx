import PublicLayout from "../layouts/PublicLayout";
import { useState } from "react";
import api from "../services/api";

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

const handleChange = (e) => {

  setFormData({

    ...formData,

    [e.target.name]:
      e.target.value

  });

};

const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      const res =
        await api.post(
          "/admissions",
          formData
        );

      alert(res.data.message);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to submit application"
      );

    }

  };

function ApplyNow() {

  return (

    <PublicLayout>

      <section className="py-20 bg-gray-50">

        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-purple-800 mb-10">

            Apply For Admission

          </h1>

          <form
            onSubmit={handleSubmit} 
            className="bg-white shadow-xl rounded-3xl p-8 space-y-6"
          >

            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Student Full Name"
              className="w-full border rounded-xl px-4 py-4"
            />

            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              placeholder="Parent Name"
              className="w-full border rounded-xl px-4 py-4"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border rounded-xl px-4 py-4"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-xl px-4 py-4"
            />

            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-4"
            >

              <option>
                Select Class
              </option>

              <option>
                Nursery
              </option>

              <option>
                Primary
              </option>

              <option>
                Secondary
              </option>

            </select>

            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              placeholder="Specify Class"
              className="w-full border rounded-xl px-4 py-4"
            />

            <input
              type="text"
              name="lastSchool"
              value={formData.lastSchool}
              onChange={handleChange}
              placeholder="Last School attended"
              className="w-full border rounded-xl px-4 py-4"
            />

            <button
              className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-xl"
            >

              Submit Application

            </button>

          </form>

        </div>

      </section>

    </PublicLayout>

  );

}

export default ApplyNow;