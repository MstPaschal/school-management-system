import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../services/api";

import { useNotification } from "../context/NotificationContext";


function EditTeacher() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const {
    notify
  } = useNotification();


  const [loading, setLoading] =
    useState(false);

  const [classes, setClasses] =
    useState([]);


  const [formData, setFormData] =
    useState({

      fullName: "",

      username: "",

      password: "",

      contact: "",

      dob: "",

      address: "",

      nextOfKin: "",

      nokContact: "",

      nokAddress: "",

      assignedClass: ""

    });


  // LOAD TEACHER
  useEffect(() => {

    fetchTeacher();

    fetchClasses();

  }, []);


  // FETCH SINGLE TEACHER
  const fetchTeacher =
    async () => {

      try {

        const res =
          await api.get(
            `/teachers/${id}`
          );


        setFormData({

          fullName:
            res.data.fullName || "",

          username:
            res.data.User?.username || "",

          password: "",

          contact:
            res.data.contact || "",

          dob:
            res.data.dob || "",

          address:
            res.data.address || "",

          nextOfKin:
            res.data.nextOfKin || "",

          nokContact:
            res.data.nokContact || "",

          nokAddress:
            res.data.nokAddress || "",

          assignedClass:
            res.data.assignedClass || ""

        });

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to load teacher details.",
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

        setClasses(
          res.data
        );

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to load classes.",
          "error"
        );

      }

    };


  // HANDLE CHANGE
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  // UPDATE TEACHER
  const handleSubmit =
    async (e) => {

      e.preventDefault();


      const fullName =
        formData.fullName.trim();

      const username =
        formData.username.trim();

      const assignedClass =
        formData.assignedClass;


      // VALIDATION
      if (!fullName) {

        notify(
          "Please enter the teacher's full name.",
          "warning"
        );

        return;

      }


      if (!username) {

        notify(
          "Please enter the teacher's username.",
          "warning"
        );

        return;

      }


      if (!assignedClass) {

        notify(
          "Please select the teacher's assigned class.",
          "warning"
        );

        return;

      }


      try {

        setLoading(true);


        const data = {

          ...formData,

          fullName,

          username,

          contact:
            formData.contact.trim(),

          address:
            formData.address.trim(),

          nextOfKin:
            formData.nextOfKin.trim(),

          nokContact:
            formData.nokContact.trim(),

          nokAddress:
            formData.nokAddress.trim()

        };


        const res =
          await api.put(

            `/teachers/${id}`,

            data

          );


        notify(
          res.data.message ||
          "Teacher updated successfully.",
          "success"
        );


        setTimeout(() => {

          navigate(
            "/teachers"
          );

        }, 700);

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Update failed.",
          "error"
        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="p-4 sm:p-6">

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6 max-w-4xl mx-auto">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">

          Edit Teacher

        </h1>


        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >


          {/* FULL NAME */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Full Name

            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* USERNAME */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Username

            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* PASSWORD */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              New Password

            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password (optional)"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

            <p className="mt-1.5 text-xs text-slate-400">

              Leave empty to keep the current password.

            </p>

          </div>


          {/* CONTACT */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Contact

            </label>

            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* DOB */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Date Of Birth

            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* NEXT OF KIN */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Next Of Kin

            </label>

            <input
              type="text"
              name="nextOfKin"
              value={formData.nextOfKin}
              onChange={handleChange}
              placeholder="Next Of Kin"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* NOK CONTACT */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              NOK Contact

            </label>

            <input
              type="text"
              name="nokContact"
              value={formData.nokContact}
              onChange={handleChange}
              placeholder="NOK Contact"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* NOK ADDRESS */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              NOK Address

            </label>

            <input
              type="text"
              name="nokAddress"
              value={formData.nokAddress}
              onChange={handleChange}
              placeholder="NOK Address"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* ADDRESS */}
          <div className="md:col-span-2">

            <label className="block mb-1.5 font-medium text-slate-700">

              Address

            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              rows="3"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* ASSIGNED CLASS */}
          <div className="md:col-span-2">

            <label className="block mb-1.5 font-medium text-slate-700">

              Assigned Class

            </label>

            <select
              name="assignedClass"
              value={formData.assignedClass}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
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


          {/* BUTTON */}
          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition"
            >

              {
                loading
                  ? "Updating..."
                  : "Update Teacher"
              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditTeacher;