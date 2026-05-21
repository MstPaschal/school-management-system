import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";


function CreateTeacher() {

  const navigate =
  useNavigate();

  const [selectedTeacher,
    setSelectedTeacher] =
    useState(null);

  const [showProfile,
    setShowProfile] =
    useState(false);

  const [teachers, setTeachers] =
    useState([]);

  const [classes, setClasses] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [passport, setPassport] =
    useState(null);


  const [formData, setFormData] =
    useState({

      fullName: "",

      username: "",

      password: "",

      dob: "",

      contact: "",

      address: "",

      nextOfKin: "",

      nokContact: "",

      nokAddress: "",

      assignedClass: ""

    });


  // LOAD TEACHERS
  useEffect(() => {

    fetchTeachers();

    fetchClasses();

  }, []);


  // FETCH TEACHERS
  const fetchTeachers =
    async () => {

      try {

        const res =
          await api.get(
            "/teachers"
          );

        setTeachers(res.data);

      } catch (error) {

        console.log(error);

      }

    };


    // FETCH CLASSES
    const fetchClasses =
      async () => {

        try {

          const res =
            await api.get(
              "/classes"
            );

          setClasses(res.data);

        } catch (error) {

          console.log(error);

        }

      };


  // INPUT CHANGE
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  // FILE CHANGE
  const handleFileChange =
    (e) => {

      setPassport(
        e.target.files[0]
      );

    };


  // CREATE TEACHER
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          new FormData();

        Object.keys(formData)
          .forEach((key) => {

            data.append(
              key,
              formData[key]
            );

          });

        if (passport) {

          data.append(
            "passport",
            passport
          );

        }

        const res =
          await api.post(

            "/teachers",

            data,

            {

              headers: {

                "Content-Type":
                  "multipart/form-data"

              }

            }

          );

        alert(res.data.message);

        setFormData({

          fullName: "",

          username: "",

          password: "",

          dob: "",

          contact: "",

          address: "",

          nextOfKin: "",

          nokContact: "",

          nokAddress: "",

          assignedClass: ""

        });

        setPassport(null);

        fetchTeachers();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Teacher creation failed"

        );

      } finally {

        setLoading(false);

      }

    };


  // DELETE TEACHER
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this teacher?"
        );

      if (!confirmDelete) return;

      try {

        const res =
          await api.delete(
            `/teachers/${id}`
          );

        alert(res.data.message);

        fetchTeachers();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Delete failed"

        );

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Create Teacher

        </h1>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
        >

          {/* FULL NAME */}
          <div>

            <label className="block mb-1 font-medium">

              Full Name

            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* USERNAME */}
          <div>

            <label className="block mb-1 font-medium">

              Username

            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* PASSWORD */}
          <div>

            <label className="block mb-1 font-medium">

              Password

            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* DOB */}
          <div>

            <label className="block mb-1 font-medium">

              Date Of Birth

            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* CONTACT */}
          <div>

            <label className="block mb-1 font-medium">

              Contact

            </label>

            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* NEXT OF KIN */}
          <div>

            <label className="block mb-1 font-medium">

              Next Of Kin

            </label>

            <input
              type="text"
              name="nextOfKin"
              value={formData.nextOfKin}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* ASSIGNED CLASS */}
          <div>

            <label className="block mb-1 font-medium">

              Assigned Class

            </label>

            <select
              name="assignedClass"
              value={formData.assignedClass}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >

              <option value="">
                Select Class
              </option>

              {
                classes.map((cls) => (

                  <option
                    key={cls.id}
                    value={cls.id}
                  >

                    {cls.className}

                  </option>

                ))
              }

            </select>

          </div>


          {/* ADDRESS */}
          <div className="md:col-span-2">

            <label className="block mb-1 font-medium">

              Address

            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* NOK CONTACT */}
          <div>

            <label className="block mb-1 font-medium">

              NOK Contact

            </label>

            <input
              type="text"
              name="nokContact"
              value={formData.nokContact}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* NOK ADDRESS */}
          <div>

            <label className="block mb-1 font-medium">

              NOK Address

            </label>

            <input
              type="text"
              name="nokAddress"
              value={formData.nokAddress}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* PASSPORT */}
          <div className="md:col-span-2">

            <label className="block mb-1 font-medium">

              Passport

            </label>

            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* BUTTON */}
          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >

              {
                loading
                  ? "Creating..."
                  : "Create Teacher"
              }

            </button>

          </div>

        </form>


        {/* TEACHERS TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100 text-left">

                <th className="p-3">
                  Passport
                </th>

                <th className="p-3">
                  Reg Number
                </th>

                <th className="p-3">
                  Full Name
                </th>

                <th className="p-3">
                  Username
                </th>

                <th className="p-3">
                  Assigned Class
                </th>
                
                <th className="p-3">
                  Contact
                </th>

                <th className="p-3">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {
                teachers.map((teacher) => (

                  <tr
                    key={teacher.id}
                    className="border-b"
                  >

                    {/* PASSPORT */}
                    <td className="p-3">

                      {
                        teacher.passport
                          ? (

                            <img
                              src={`https://portal-grisfield-schools.onrender.com/uploads/${teacher.passport}`}
                              alt="passport"
                              className="w-16 h-16 rounded-full object-cover"
                            />

                          ) : (

                            <div className="w-16 h-16 rounded-full bg-gray-300" />

                          )
                      }

                    </td>


                    {/* REG NUMBER */}
                    <td className="p-3 font-medium">

                      {teacher.regNumber}

                    </td>


                    {/* FULL NAME */}
                    <td className="p-3">

                      {teacher.fullName}

                    </td>


                    {/* USERNAME */}
                    <td className="p-3">

                      {teacher.User?.username || "N/A"}

                    </td>


                    {/* ASSIGNED CLASS */}
                    <td className="p-3">

                      {
                        classes.find(
                          (cls) =>
                            String(cls.id) ===
                            String(teacher.assignedClass)
                        )?.className || "N/A"
                      }

                    </td>

                    {/* CONTACT */}
                    <td className="p-3">

                      {teacher.contact || "N/A"}

                    </td>


                    {/* ACTION */}
                    <td className="p-3 flex gap-2">

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          navigate(
                            `/teachers/edit/${teacher.id}`
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >

                        Edit

                      </button>


                      {/* VIEW */}
                      <button
                        onClick={() => {

                          setSelectedTeacher(teacher);

                          setShowProfile(true);

                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >

                        View

                      </button>


                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(teacher.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        {/* PROFILE MODAL */}
        {
          showProfile && selectedTeacher && (

            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">

                {/* HEADER */}
                <div className="bg-blue-700 text-white p-6 text-center">

                  {/* SCHOOL LOGO */}
                  <div className="flex justify-center mb-3">

                    <img
                      src="public/logo.png"
                      alt="School Logo"
                      className="w-24 h-24 rounded-full border-4 border-white object-cover"
                    />

                  </div>

                  <h1 className="text-3xl font-bold">

                    GRISFIELD SCHOOLS

                  </h1>

                  <p className="text-lg mt-2">

                    STAFF PROFILE

                  </p>

                </div>


                {/* BODY */}
                <div className="p-6">

                  <div className="flex flex-col md:flex-row gap-6">

                    {/* PASSPORT */}
                    <div className="flex justify-center">

                      {
                        selectedTeacher.passport
                          ? (

                            <img
                              src={`https://portal-grisfield-schools.onrender.com/uploads/${selectedTeacher.passport}`}
                              alt="passport"
                              className="w-44 h-44 rounded-xl object-cover border"
                            />

                          ) : (

                            <div className="w-44 h-44 rounded-xl bg-gray-300" />

                          )
                      }

                    </div>


                    {/* DETAILS */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

                      <div>

                        <h3 className="font-bold text-gray-600">

                          Full Name

                        </h3>

                        <p>

                          {selectedTeacher.fullName}

                        </p>

                      </div>


                      <div>

                        <h3 className="font-bold text-gray-600">

                          Reg Number

                        </h3>

                        <p>

                          {selectedTeacher.regNumber}

                        </p>

                      </div>


                      <div>

                        <h3 className="font-bold text-gray-600">

                          Username

                        </h3>

                        <p>

                          {
                            selectedTeacher.User?.username || "N/A"
                          }

                        </p>

                      </div>


                      <div>

                        <h3 className="font-bold text-gray-600">

                          Contact

                        </h3>

                        <p>

                          {selectedTeacher.contact}

                        </p>

                      </div>


                      <div>

                        <h3 className="font-bold text-gray-600">

                          Date Of Birth

                        </h3>

                        <p>

                          {selectedTeacher.dob}

                        </p>

                      </div>


                      <div>

                        <h3 className="font-bold text-gray-600">

                          Address

                        </h3>

                        <p>

                          {selectedTeacher.address}

                        </p>

                      </div>


                      <div>

                        <h3 className="font-bold text-gray-600">

                          Next Of Kin

                        </h3>

                        <p>

                          {selectedTeacher.nextOfKin}

                        </p>

                      </div>


                      <div>

                        <h3 className="font-bold text-gray-600">

                          NOK Contact

                        </h3>

                        <p>

                          {selectedTeacher.nokContact}

                        </p>

                      </div>


                      <div>

                        <h3 className="font-bold text-gray-600">

                          NOK Address

                        </h3>

                        <p>

                          {selectedTeacher.nokAddress}

                        </p>

                      </div>

                    </div>

                  </div>


                  {/* CLOSE BUTTON */}
                  <div className="mt-8 text-center">

                    <button
                      onClick={() =>
                        setShowProfile(false)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
                    >

                      Close

                    </button>

                  </div>

                </div>

              </div>

            </div>

          )
        }
        
        
        
        </div>

      </div>

    </div>

  );

}

export default CreateTeacher;