import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaCheck,
  FaLock,
  FaUserGraduate
} from "react-icons/fa";


function StudentCredentials() {

  const [classes, setClasses] =
    useState([]);

  const [selectedClass, setSelectedClass] =
    useState("");

  const [students, setStudents] =
    useState([]);

  const [loadingClasses, setLoadingClasses] =
    useState(true);

  const [loadingStudents, setLoadingStudents] =
    useState(false);

  const [loadingCredential, setLoadingCredential] =
    useState(null);

  const [credentials, setCredentials] =
    useState({});

  const [visiblePasswords, setVisiblePasswords] =
    useState({});

  const [copied, setCopied] =
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

        setLoadingClasses(true);

        const res =
          await api.get("/classes");

        setClasses(res.data);

      } catch (error) {

        console.log(
          "Failed to load classes:",
          error
        );

      } finally {

        setLoadingClasses(false);

      }

    };


  // ==========================================
  // LOAD STUDENTS WHEN CLASS CHANGES
  // ==========================================

  useEffect(() => {

    if (!selectedClass) {

      setStudents([]);

      setCredentials({});

      setVisiblePasswords({});

      return;

    }

    fetchStudentsByClass();

  }, [selectedClass]);


  const fetchStudentsByClass =
    async () => {

      try {

        setLoadingStudents(true);

        setCredentials({});

        setVisiblePasswords({});

        const res =
          await api.get(
            `/students/credentials/class/${selectedClass}`
          );

        setStudents(res.data);

      } catch (error) {

        console.log(
          "Failed to load student credentials:",
          error
        );

        alert(
          error.response?.data?.message ||
          "Failed to load students"
        );

      } finally {

        setLoadingStudents(false);

      }

    };


  // ==========================================
  // LOAD ONE STUDENT'S PASSWORD
  // ==========================================

  const handleShowPassword =
    async (student) => {

      const studentId =
        student.id;


      // If already loaded, simply toggle visibility
      if (credentials[studentId]) {

        setVisiblePasswords((prev) => ({

          ...prev,

          [studentId]:
            !prev[studentId]

        }));

        return;

      }


      try {

        setLoadingCredential(studentId);

        const res =
          await api.get(
            `/students/credentials/${studentId}`
          );


        setCredentials((prev) => ({

          ...prev,

          [studentId]: {

            username:
              res.data.username,

            password:
              res.data.password

          }

        }));


        setVisiblePasswords((prev) => ({

          ...prev,

          [studentId]: true

        }));

      } catch (error) {

        console.log(
          "Failed to retrieve credential:",
          error
        );

        alert(

          error.response?.data?.message ||

          "Failed to retrieve student credential"

        );

      } finally {

        setLoadingCredential(null);

      }

    };


  // ==========================================
  // COPY TO CLIPBOARD
  // ==========================================

  const handleCopy =
    async (text, key) => {

      try {

        await navigator.clipboard.writeText(text);

        setCopied(key);

        setTimeout(() => {

          setCopied("");

        }, 2000);

      } catch (error) {

        console.log(
          "Copy failed:",
          error
        );

      }

    };


  // ==========================================
  // COPY BOTH USERNAME & PASSWORD
  // ==========================================

  const handleCopyAll =
    async (student) => {

      const credential =
        credentials[student.id];

      if (!credential) {

        return;

      }

      const text =
        `Student: ${student.fullName}\n` +
        `Username: ${credential.username}\n` +
        `Password: ${credential.password}`;


      await handleCopy(
        text,
        `all-${student.id}`
      );

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <div>

            <div className="flex items-center gap-3">

              <div className="bg-blue-100 text-blue-700 p-3 rounded-xl">

                <FaUserGraduate
                  size={22}
                />

              </div>

              <h1 className="text-3xl font-bold">

                Student Credentials

              </h1>

            </div>

            <p className="text-gray-500 mt-2">

              View and manage student portal login credentials.

            </p>

          </div>


          {/* CLASS SELECTOR */}

          <div className="w-full md:w-72">

            <label className="block text-sm font-semibold text-gray-600 mb-2">

              Select Class

            </label>

            <select
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(
                  e.target.value
                )
              }
              disabled={loadingClasses}
              className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">

                {loadingClasses
                  ? "Loading classes..."
                  : "Select a class"
                }

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

        </div>


        {/* ========================================
            INFORMATION BOX
        ======================================== */}

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">

          <div className="flex gap-3">

            <FaLock
              className="text-blue-600 mt-1"
            />

            <div>

              <p className="font-semibold text-blue-800">

                Credential Security

              </p>

              <p className="text-sm text-blue-700 mt-1">

                Student passwords are hidden by default.
                Click the eye button to securely retrieve
                and reveal a student's password.

              </p>

            </div>

          </div>

        </div>


        {/* ========================================
            NO CLASS SELECTED
        ======================================== */}

        {
          !selectedClass && (

            <div className="py-16 text-center">

              <FaUserGraduate
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />

              <h2 className="text-xl font-semibold text-gray-600">

                Select a class

              </h2>

              <p className="text-gray-400 mt-2">

                Choose a class above to view
                student portal credentials.

              </p>

            </div>

          )
        }


        {/* ========================================
            LOADING STUDENTS
        ======================================== */}

        {
          selectedClass &&
          loadingStudents && (

            <div className="py-16 text-center">

              <div className="animate-spin w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4" />

              <p className="text-gray-500">

                Loading students...

              </p>

            </div>

          )
        }


        {/* ========================================
            NO STUDENTS
        ======================================== */}

        {
          selectedClass &&
          !loadingStudents &&
          students.length === 0 && (

            <div className="py-16 text-center">

              <FaUserGraduate
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />

              <h2 className="text-xl font-semibold text-gray-600">

                No students found

              </h2>

              <p className="text-gray-400 mt-2">

                There are no active students with
                portal accounts in this class.

              </p>

            </div>

          )
        }


        {/* ========================================
            STUDENTS TABLE
        ======================================== */}

        {
          selectedClass &&
          !loadingStudents &&
          students.length > 0 && (

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-100 text-left">

                    <th className="p-3">

                      #

                    </th>

                    <th className="p-3">

                      Student Name

                    </th>

                    <th className="p-3">

                      Reg Number

                    </th>

                    <th className="p-3">

                      Username

                    </th>

                    <th className="p-3">

                      Password

                    </th>

                    <th className="p-3">

                      Actions

                    </th>

                  </tr>

                </thead>


                <tbody>

                  {
                    students.map(
                      (student, index) => {

                        const credential =
                          credentials[student.id];

                        const passwordVisible =
                          visiblePasswords[student.id];

                        const isLoading =
                          loadingCredential ===
                          student.id;


                        return (

                          <tr
                            key={student.id}
                            className="border-b hover:bg-gray-50"
                          >

                            {/* NUMBER */}

                            <td className="p-3 text-gray-500">

                              {index + 1}

                            </td>


                            {/* NAME */}

                            <td className="p-3 font-medium">

                              {student.fullName}

                            </td>


                            {/* REG NUMBER */}

                            <td className="p-3">

                              {student.regNumber}

                            </td>


                            {/* USERNAME */}

                            <td className="p-3">

                              {
                                credential
                                  ? (

                                    <div className="flex items-center gap-2">

                                      <span>

                                        {credential.username}

                                      </span>

                                      <button
                                        onClick={() =>
                                          handleCopy(
                                            credential.username,
                                            `username-${student.id}`
                                          )
                                        }
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Copy username"
                                      >

                                        {
                                          copied ===
                                          `username-${student.id}`
                                            ? (
                                              <FaCheck
                                                className="text-green-600"
                                              />
                                            )
                                            : (
                                              <FaCopy />
                                            )
                                        }

                                      </button>

                                    </div>

                                  )
                                  : (

                                    <span className="text-gray-400">

                                      Click eye to load

                                    </span>

                                  )
                              }

                            </td>


                            {/* PASSWORD */}

                            <td className="p-3">

                              {
                                credential
                                  ? (

                                    <div className="flex items-center gap-2">

                                      <span className="font-mono">

                                        {
                                          passwordVisible
                                            ? credential.password
                                            : "••••••••••"
                                        }

                                      </span>

                                      <button
                                        onClick={() =>
                                          handleShowPassword(
                                            student
                                          )
                                        }
                                        className="text-blue-600 hover:text-blue-800"
                                        title={
                                          passwordVisible
                                            ? "Hide password"
                                            : "Show password"
                                        }
                                      >

                                        {
                                          passwordVisible
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                        }

                                      </button>

                                    </div>

                                  )
                                  : (

                                    <button
                                      onClick={() =>
                                        handleShowPassword(
                                          student
                                        )
                                      }
                                      disabled={isLoading}
                                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                                    >

                                      {
                                        isLoading
                                          ? (
                                            <>
                                              <span className="animate-spin w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full" />

                                              Loading...

                                            </>
                                          )
                                          : (
                                            <>
                                              <FaEye />

                                              View Password

                                            </>
                                          )
                                      }

                                    </button>

                                  )
                              }

                            </td>


                            {/* ACTIONS */}

                            <td className="p-3">

                              {
                                credential && (

                                  <button
                                    onClick={() =>
                                      handleCopyAll(
                                        student
                                      )
                                    }
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                  >

                                    {
                                      copied ===
                                      `all-${student.id}`
                                        ? (
                                          <>
                                            <FaCheck />

                                            Copied

                                          </>
                                        )
                                        : (
                                          <>
                                            <FaCopy />

                                            Copy All

                                          </>
                                        )
                                    }

                                  </button>

                                )
                              }

                            </td>

                          </tr>

                        );

                      }
                    )
                  }

                </tbody>

              </table>

            </div>

          )
        }

      </div>

    </div>

  );

}


export default StudentCredentials;