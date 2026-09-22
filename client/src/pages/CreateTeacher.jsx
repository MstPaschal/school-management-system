import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import { SERVER_BASE_URL } from "../config/apiConfig";

import api from "../services/api";

import { useNotification } from "../context/NotificationContext";


function CreateTeacher() {

  const navigate =
    useNavigate();

  const {
    notify,
    confirmAction
  } = useNotification();


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

  const [deletingId, setDeletingId] =
    useState(null);

  const [passport, setPassport] =
    useState(null);


  const [formData, setFormData] =
    useState({

      fullName: "",

      username: "",

      email: "",

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

        notify(
          error.response?.data?.message ||
          "Unable to load teachers.",
          "error"
        );

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

        notify(
          error.response?.data?.message ||
          "Unable to load classes.",
          "error"
        );

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
        e.target.files[0] || null
      );

    };


  // CREATE TEACHER
  const handleSubmit =
    async (e) => {

      e.preventDefault();


      // REQUIRED FIELD VALIDATION
      const requiredFields = [
        ["fullName", "Full Name"],
        ["username", "Username"],
        ["email", "Email"],
        ["password", "Password"]
      ];


      for (const [field, label] of requiredFields) {

        if (!formData[field].trim()) {

          notify(
            `${label} is required.`,
            "warning"
          );

          return;

        }

      }


      try {

        setLoading(true);


        const data =
          new FormData();


        Object.keys(formData)
          .forEach((key) => {

            data.append(
              key,
              formData[key].trim()
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


        notify(
          res.data.message ||
          "Teacher created successfully.",
          "success"
        );


        setFormData({

          fullName: "",

          username: "",

          email: "",

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


        const fileInput =
          document.getElementById(
            "teacher-passport"
          );

        if (fileInput) {

          fileInput.value = "";

        }


        fetchTeachers();

      } catch (error) {

        console.log(error);

        notify(

          error.response?.data?.message ||

          "Teacher creation failed.",

          "error"

        );

      } finally {

        setLoading(false);

      }

    };


  // DELETE TEACHER
  const handleDelete =
    async (id) => {

      const confirmed =
        await confirmAction(
          "This teacher will be permanently deleted. Do you want to continue?",
          {
            title: "Delete Teacher",
            confirmText: "Delete",
            cancelText: "Cancel"
          }
        );


      if (!confirmed) return;


      try {

        setDeletingId(id);


        const res =
          await api.delete(
            `/teachers/${id}`
          );


        notify(
          res.data.message ||
          "Teacher deleted successfully.",
          "success"
        );


        fetchTeachers();

      } catch (error) {

        console.log(error);

        notify(

          error.response?.data?.message ||

          "Delete failed.",

          "error"

        );

      } finally {

        setDeletingId(null);

      }

    };


  return (

    <div className="p-4 sm:p-6">

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">

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
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter full name"
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
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter username"
            />

          </div>


          {/* EMAIL */}
          <div>

            <label className="block mb-1 font-medium">

              Email

            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter email address"
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
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter password"
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
              placeholder="Enter phone number"
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
              placeholder="Enter next of kin"
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
              rows="3"
              className="w-full border rounded-lg px-4 py-3 resize-none"
              placeholder="Enter address"
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
              placeholder="Enter NOK contact"
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
              placeholder="Enter NOK address"
            />

          </div>


          {/* PASSPORT */}
          <div className="md:col-span-2">

            <label className="block mb-1 font-medium">

              Passport

            </label>

            <input
              id="teacher-passport"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded-lg px-4 py-3 text-sm"
            />

            {
              passport && (

                <p className="mt-2 text-sm text-slate-500 break-words">

                  Selected: {passport.name}

                </p>

              )
            }

          </div>


          {/* BUTTON */}
          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition"
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
        {/* TEACHERS TABLE */}
<div className="mt-4">

  <div className="mb-4">

    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
      Teachers
    </h2>

    <p className="text-sm text-slate-500 mt-1">
      Manage registered teachers and view their profiles.
    </p>

  </div>


  <div className="w-full overflow-hidden">

    <table className="w-full border-collapse">

      <thead>

        <tr className="bg-gray-100 text-left">

          <th className="p-2 sm:p-3 text-sm sm:text-base">
            Passport
          </th>

          <th className="p-2 sm:p-3 text-sm sm:text-base hidden md:table-cell">
            Reg Number
          </th>

          <th className="p-2 sm:p-3 text-sm sm:text-base">
            Full Name
          </th>

          <th className="p-2 sm:p-3 text-sm sm:text-base hidden md:table-cell">
            Username
          </th>

          <th className="p-2 sm:p-3 text-sm sm:text-base">
            Assigned Class
          </th>

          <th className="p-2 sm:p-3 text-sm sm:text-base hidden md:table-cell">
            Contact
          </th>

          <th className="p-2 sm:p-3 text-sm sm:text-base">
            Action
          </th>

        </tr>

      </thead>


      <tbody>

        {teachers.map((teacher) => (

          <tr
            key={teacher.id}
            className="border-b align-top"
          >

            {/* PASSPORT */}
            <td className="p-2 sm:p-3">

              {teacher.passport ? (

                <img
                  src={`${SERVER_BASE_URL}/uploads/${teacher.passport}`}
                  alt="Teacher passport"
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                />

              ) : (

                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-300" />

              )}

            </td>


            {/* REG NUMBER */}
            <td className="p-2 sm:p-3 font-medium break-words hidden md:table-cell">

              {teacher.regNumber}

            </td>


            {/* FULL NAME */}
            <td className="p-2 sm:p-3">

              <div className="font-medium break-words">

                {teacher.fullName}

              </div>

            </td>


            {/* USERNAME */}
            <td className="p-2 sm:p-3 break-words hidden md:table-cell">

              {teacher.User?.username || "N/A"}

            </td>


            {/* ASSIGNED CLASS */}
            <td className="p-2 sm:p-3">

              <div className="break-words">

                {
                  classes.find(
                    (cls) =>
                      String(cls.id) ===
                      String(teacher.assignedClass)
                  )?.className || "N/A"
                }

              </div>

            </td>


            {/* CONTACT */}
            <td className="p-2 sm:p-3 break-words hidden md:table-cell">

              {teacher.contact || "N/A"}

            </td>


            {/* ACTION */}
            <td className="p-2 sm:p-3">

              <div className="flex flex-col gap-2">

                {/* EDIT */}
                <button
                  onClick={() =>
                    navigate(
                      `/teachers/edit/${teacher.id}`
                    )
                  }
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
                >

                  Edit

                </button>


                {/* VIEW */}
                <button
                  onClick={() => {

                    setSelectedTeacher(teacher);

                    setShowProfile(true);

                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
                >

                  View

                </button>


                {/* DELETE */}
                <button
                  onClick={() =>
                    handleDelete(teacher.id)
                  }
                  disabled={
                    deletingId === teacher.id
                  }
                  className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
                >

                  {
                    deletingId === teacher.id
                      ? "Deleting..."
                      : "Delete"
                  }

                </button>

              </div>

            </td>

          </tr>

        ))}


        {teachers.length === 0 && (

          <tr>

            <td
              colSpan="7"
              className="p-8 text-center text-slate-500"
            >

              No teachers found.

            </td>

          </tr>

        )}

      </tbody>

    </table>

  </div>


  {/* PROFILE MODAL */}
  {
    showProfile && selectedTeacher && (

      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

          {/* HEADER */}
          <div className="bg-blue-700 text-white p-5 sm:p-6 text-center">

            <div className="flex justify-center mb-3">

              <img
                src="/Logo.png"
                alt="School Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover"
              />

            </div>

            <h1 className="text-2xl sm:text-3xl font-bold">
              GRISFIELD SCHOOLS
            </h1>

            <p className="text-base sm:text-lg mt-2">
              STAFF PROFILE
            </p>

          </div>


          {/* BODY */}
          <div className="p-5 sm:p-6">

            <div className="flex flex-col md:flex-row gap-6">

              {/* PASSPORT */}
              <div className="flex justify-center md:justify-start flex-shrink-0">

                {selectedTeacher.passport ? (

                  <img
                    src={`${SERVER_BASE_URL}/uploads/${selectedTeacher.passport}`}
                    alt="Teacher passport"
                    className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl object-cover border"
                  />

                ) : (

                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl bg-gray-300" />

                )}

              </div>


              {/* DETAILS */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <h3 className="font-bold text-gray-600">
                    Full Name
                  </h3>
                  <p className="break-words">
                    {selectedTeacher.fullName}
                  </p>
                </div>


                <div>
                  <h3 className="font-bold text-gray-600">
                    Reg Number
                  </h3>
                  <p className="break-words">
                    {selectedTeacher.regNumber}
                  </p>
                </div>


                <div>
                  <h3 className="font-bold text-gray-600">
                    Username
                  </h3>
                  <p className="break-words">
                    {selectedTeacher.User?.username || "N/A"}
                  </p>
                </div>


                <div>
                  <h3 className="font-bold text-gray-600">
                    Contact
                  </h3>
                  <p className="break-words">
                    {selectedTeacher.contact || "N/A"}
                  </p>
                </div>


                <div>
                  <h3 className="font-bold text-gray-600">
                    Date Of Birth
                  </h3>
                  <p className="break-words">
                    {selectedTeacher.dob || "N/A"}
                  </p>
                </div>


                <div>
                  <h3 className="font-bold text-gray-600">
                    Address
                  </h3>
                  <p className="break-words">
                    {selectedTeacher.address || "N/A"}
                  </p>
                </div>


                <div>
                  <h3 className="font-bold text-gray-600">
                    Next Of Kin
                  </h3>
                  <p className="break-words">
                    {selectedTeacher.nextOfKin || "N/A"}
                  </p>
                </div>


                <div>
                  <h3 className="font-bold text-gray-600">
                    NOK Contact
                  </h3>
                  <p className="break-words">
                    {selectedTeacher.nokContact || "N/A"}
                  </p>
                </div>


                <div>
                  <h3 className="font-bold text-gray-600">
                    NOK Address
                  </h3>
                  <p className="break-words">
                    {selectedTeacher.nokAddress || "N/A"}
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
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
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