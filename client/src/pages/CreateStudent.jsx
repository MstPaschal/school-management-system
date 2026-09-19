import {
  useEffect,
  useState
} from "react";

import {
  FaCheckCircle,
  FaCopy,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaTimes,
  FaUserGraduate
} from "react-icons/fa";

import api from "../services/api";


function CreateStudent() {

  const [classes, setClasses] =
    useState([]);

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


  const [passport, setPassport] =
    useState(null);


  // PORTAL CREDENTIAL MODAL
  const [credentials, setCredentials] =
    useState(null);


  // PASSWORD VISIBILITY
  const [showPassword, setShowPassword] =
    useState(false);


  // COPIED STATE
  const [copiedField, setCopiedField] =
    useState("");


  // ==========================================
  // LOAD CLASSES
  // ==========================================

  useEffect(() => {

    fetchClasses();

  }, []);


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


  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  // ==========================================
  // FILE CHANGE
  // ==========================================

  const handleFileChange =
    (e) => {

      setPassport(
        e.target.files[0]
      );

    };


  // ==========================================
  // COPY TO CLIPBOARD
  // ==========================================

  const copyToClipboard =
    async (value, field) => {

      try {

        await navigator.clipboard.writeText(
          value
        );

        setCopiedField(field);

        setTimeout(() => {

          setCopiedField("");

        }, 2000);

      } catch (error) {

        console.log(
          "Copy failed:",
          error
        );

      }

    };


  // ==========================================
  // COPY BOTH CREDENTIALS
  // ==========================================

  const copyAllCredentials =
    async () => {

      if (!credentials) return;

      const text = `
GRISFIELD SCHOOLS
Student Portal Credentials

Student:
${credentials.studentName}

Username:
${credentials.username}

Password:
${credentials.password}
      `.trim();

      try {

        await navigator.clipboard.writeText(
          text
        );

        setCopiedField("all");

        setTimeout(() => {

          setCopiedField("");

        }, 2000);

      } catch (error) {

        console.log(
          "Copy failed:",
          error
        );

      }

    };


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          new FormData();


        // APPEND TEXT FIELDS

        Object.keys(formData)
          .forEach((key) => {

            data.append(
              key,
              formData[key]
            );

          });


        // APPEND FILE

        if (passport) {

          data.append(
            "passport",
            passport
          );

        }


        const res =
          await api.post(

            "/students",

            data,

            {

              headers: {

                "Content-Type":
                  "multipart/form-data"

              }

            }

          );


        // ======================================
        // SHOW PORTAL CREDENTIALS
        // ======================================

        setCredentials({

          studentName:
            res.data.student?.fullName ||
            formData.fullName,

          username:
            res.data.credentials?.username,

          password:
            res.data.credentials?.password

        });


        // ======================================
        // RESET FORM
        // ======================================

        setFormData({

          fullName: "",

          admissionNumber: "",

          dob: "",

          gender: "",

          address: "",

          contact1: "",

          contact2: "",

          currentClass: ""

        });

        setPassport(null);


      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Something went wrong"

        );

      } finally {

        setLoading(false);

      }

    };


  // ==========================================
  // CLOSE CREDENTIAL MODAL
  // ==========================================

  const closeCredentials =
    () => {

      setCredentials(null);

      setShowPassword(false);

      setCopiedField("");

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6 max-w-4xl">

        <h1 className="text-3xl font-bold mb-2">

          Create Student

        </h1>

        <p className="text-gray-500 mb-6">

          Register a new student and automatically
          create their student portal account.

        </p>


        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >


          {/* =====================================
              FULL NAME
          ====================================== */}

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

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

          </div>


          {/* =====================================
              ADMISSION NUMBER
          ====================================== */}

          <div>

            <label className="block mb-1 font-medium">

              Admission Number

            </label>

            <input

              type="text"

              name="admissionNumber"

              value={formData.admissionNumber}

              onChange={handleChange}

              required

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

          </div>


          {/* =====================================
              DATE OF BIRTH
          ====================================== */}

          <div>

            <label className="block mb-1 font-medium">

              Date of Birth

            </label>

            <input

              type="date"

              name="dob"

              value={formData.dob}

              onChange={handleChange}

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

          </div>


          {/* =====================================
              GENDER
          ====================================== */}

          <div>

            <label className="block mb-1 font-medium">

              Gender

            </label>

            <select

              name="gender"

              value={formData.gender}

              onChange={handleChange}

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

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


          {/* =====================================
              CONTACT 1
          ====================================== */}

          <div>

            <label className="block mb-1 font-medium">

              Contact 1

            </label>

            <input

              type="text"

              name="contact1"

              value={formData.contact1}

              onChange={handleChange}

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

          </div>


          {/* =====================================
              CONTACT 2
          ====================================== */}

          <div>

            <label className="block mb-1 font-medium">

              Contact 2

            </label>

            <input

              type="text"

              name="contact2"

              value={formData.contact2}

              onChange={handleChange}

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

          </div>


          {/* =====================================
              CLASS
          ====================================== */}

          <div>

            <label className="block mb-1 font-medium">

              Class

            </label>

            <select

              name="currentClass"

              value={formData.currentClass}

              onChange={handleChange}

              required

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

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


          {/* =====================================
              ADDRESS
          ====================================== */}

          <div className="md:col-span-2">

            <label className="block mb-1 font-medium">

              Address

            </label>

            <textarea

              name="address"

              value={formData.address}

              onChange={handleChange}

              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

            />

          </div>


          {/* =====================================
              PASSPORT
          ====================================== */}

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


          {/* =====================================
              BUTTON
          ====================================== */}

          <div className="md:col-span-2">

            <button

              type="submit"

              disabled={loading}

              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition"

            >

              {

                loading

                  ? "Creating Student..."

                  : "Create Student"

              }

            </button>

          </div>

        </form>

      </div>


      {/* ==================================================
          STUDENT PORTAL CREDENTIAL MODAL
      =================================================== */}

      {credentials && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">


            {/* ==========================================
                HEADER
            =========================================== */}

            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-7 relative">

              <button

                type="button"

                onClick={closeCredentials}

                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"

              >

                <FaTimes />

              </button>


              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                  <FaCheckCircle className="text-3xl" />

                </div>


                <div>

                  <h2 className="text-2xl font-bold">

                    Portal Account Created

                  </h2>

                  <p className="text-blue-100 text-sm mt-1">

                    Student account created successfully

                  </p>

                </div>

              </div>

            </div>


            {/* ==========================================
                BODY
            =========================================== */}

            <div className="p-7">

              {/* STUDENT */}

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

                  <FaUserGraduate />

                </div>

                <div>

                  <p className="text-xs text-gray-500 uppercase tracking-wide">

                    Student

                  </p>

                  <p className="font-bold text-gray-800">

                    {credentials.studentName}

                  </p>

                </div>

              </div>


              {/* SECURITY NOTICE */}

              <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">

                <FaLock className="text-amber-600 mt-1 shrink-0" />

                <p className="text-sm text-amber-800">

                  Keep these login credentials secure.
                  The student will use them to access
                  the Student Portal.

                </p>

              </div>


              {/* USERNAME */}

              <div className="mb-4">

                <label className="block text-sm font-semibold text-gray-600 mb-2">

                  Username

                </label>

                <div className="flex items-center gap-2">

                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-gray-800">

                    {credentials.username}

                  </div>

                  <button

                    type="button"

                    onClick={() =>
                      copyToClipboard(
                        credentials.username,
                        "username"
                      )
                    }

                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"

                    title="Copy username"

                  >

                    {copiedField === "username"

                      ? <FaCheckCircle />

                      : <FaCopy />

                    }

                  </button>

                </div>

              </div>


              {/* PASSWORD */}

              <div className="mb-6">

                <label className="block text-sm font-semibold text-gray-600 mb-2">

                  Password

                </label>

                <div className="flex items-center gap-2">

                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono text-gray-800 tracking-wide">

                    {showPassword

                      ? credentials.password

                      : "••••••••••••"

                    }

                  </div>


                  <button

                    type="button"

                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }

                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"

                    title={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }

                  >

                    {showPassword

                      ? <FaEyeSlash />

                      : <FaEye />

                    }

                  </button>


                  <button

                    type="button"

                    onClick={() =>
                      copyToClipboard(
                        credentials.password,
                        "password"
                      )
                    }

                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"

                    title="Copy password"

                  >

                    {copiedField === "password"

                      ? <FaCheckCircle />

                      : <FaCopy />

                    }

                  </button>

                </div>

              </div>


              {/* COPY ALL */}

              <button

                type="button"

                onClick={copyAllCredentials}

                className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white py-3.5 rounded-xl font-semibold transition"

              >

                {copiedField === "all"

                  ? <FaCheckCircle />

                  : <FaCopy />

                }

                {copiedField === "all"

                  ? "Credentials Copied"

                  : "Copy All Credentials"

                }

              </button>


              {/* CLOSE */}

              <button

                type="button"

                onClick={closeCredentials}

                className="w-full mt-3 py-3 text-gray-600 hover:text-gray-900 font-medium transition"

              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


export default CreateStudent;