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


function EditStudent() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    notify
  } = useNotification();


  const [classes, setClasses] =
    useState([]);

  const [passport, setPassport] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  const [formData, setFormData] =
    useState({

      fullName: "",

      admissionNumber: "",

      dob: "",

      gender: "",

      address: "",

      contact1: "",

      contact2: "",

      currentClass: ""

    });


  useEffect(() => {

    fetchStudent();

    fetchClasses();

  }, []);


  // FETCH STUDENT
  const fetchStudent =
    async () => {

      try {

        const res =
          await api.get(
            `/students/${id}`
          );


        setFormData({

          fullName:
            res.data.fullName || "",

          admissionNumber:
            res.data.admissionNumber || "",

          dob:
            res.data.dob || "",

          gender:
            res.data.gender || "",

          address:
            res.data.address || "",

          contact1:
            res.data.contact1 || "",

          contact2:
            res.data.contact2 || "",

          currentClass:
            res.data.currentClass || ""

        });

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to load student details.",
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


  // CHANGE
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  // FILE
  const handleFileChange =
    (e) => {

      setPassport(
        e.target.files[0] || null
      );

    };


  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();


      const fullName =
        formData.fullName.trim();

      const admissionNumber =
        formData.admissionNumber.trim();

      const currentClass =
        formData.currentClass;


      // VALIDATION
      if (!fullName) {

        notify(
          "Please enter the student's full name.",
          "warning"
        );

        return;

      }


      if (!admissionNumber) {

        notify(
          "Please enter the admission number.",
          "warning"
        );

        return;

      }


      if (!currentClass) {

        notify(
          "Please select the student's class.",
          "warning"
        );

        return;

      }


      try {

        setLoading(true);


        const data =
          new FormData();


        Object.keys(formData)
          .forEach((key) => {

            data.append(

              key,

              key === "fullName" ||
              key === "admissionNumber" ||
              key === "address" ||
              key === "contact1" ||
              key === "contact2"

                ? formData[key].trim()

                : formData[key]

            );

          });


        if (passport) {

          data.append(
            "passport",
            passport
          );

        }


        const res =
          await api.put(

            `/students/${id}`,

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
          "Student updated successfully.",
          "success"
        );


        setTimeout(() => {

          navigate(
            "/students/view"
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

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6 max-w-4xl">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">

          Edit Student

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
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Enter student's full name"
            />

          </div>


          {/* ADMISSION NUMBER */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Admission Number

            </label>

            <input
              type="text"
              name="admissionNumber"
              value={formData.admissionNumber}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Enter admission number"
            />

          </div>


          {/* DOB */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Date of Birth

            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* GENDER */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Gender

            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

            </select>

          </div>


          {/* CONTACT 1 */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Contact 1

            </label>

            <input
              type="text"
              name="contact1"
              value={formData.contact1}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Enter primary contact"
            />

          </div>


          {/* CONTACT 2 */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Contact 2

            </label>

            <input
              type="text"
              name="contact2"
              value={formData.contact2}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Enter secondary contact"
            />

          </div>


          {/* CLASS */}
          <div>

            <label className="block mb-1.5 font-medium text-slate-700">

              Class

            </label>

            <select
              name="currentClass"
              value={formData.currentClass}
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


          {/* ADDRESS */}
          <div className="md:col-span-2">

            <label className="block mb-1.5 font-medium text-slate-700">

              Address

            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full border border-slate-200 rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              placeholder="Enter address"
            />

          </div>


          {/* PASSPORT */}
          <div className="md:col-span-2">

            <label className="block mb-1.5 font-medium text-slate-700">

              Passport

            </label>

            <input
              id="student-passport"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm"
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
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition"
            >

              {
                loading
                  ? "Updating..."
                  : "Update Student"
              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditStudent;