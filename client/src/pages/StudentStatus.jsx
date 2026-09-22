import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  FaUserGraduate,
  FaUsers,
  FaToggleOn,
  FaToggleOff
} from "react-icons/fa";

import {
  useNotification
} from "../context/NotificationContext";


function StudentStatus() {

  const {
    notify,
    confirmAction
  } = useNotification();

  const [classes, setClasses] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [loadingClasses, setLoadingClasses] =
    useState(true);

  const [changingStatus, setChangingStatus] =
    useState(null);

  const [selectedClass, setSelectedClass] =
    useState("");


  // ==========================================
  // LOAD CLASSES
  // ==========================================

  useEffect(() => {

    fetchClasses();

  }, []);


  // ==========================================
  // FETCH CLASSES
  // ==========================================

  const fetchClasses =
    async () => {

      try {

        setLoadingClasses(true);

        const res =
          await api.get(
            "/classes"
          );

        setClasses(
          res.data
        );

      } catch (error) {

        console.log(
          "Failed to load classes:",
          error
        );

        notify(
          error.response?.data?.message ||
            "Failed to load classes.",
          "error"
        );

      } finally {

        setLoadingClasses(false);

      }

    };


  // ==========================================
  // HANDLE CLASS CHANGE
  // ==========================================

  const handleClassChange =
    (e) => {

      setSelectedClass(
        e.target.value
      );

      setStudents([]);

    };


  // ==========================================
  // LOAD STUDENTS
  // ==========================================

  const loadStudents =
    async () => {

      if (!selectedClass) {

        notify(
          "Please select a class.",
          "warning"
        );

        return;

      }

      try {

        setLoading(true);

        setStudents([]);

        const res =
          await api.get(
            "/students/status",
            {
              params: {
                classId:
                  selectedClass
              }
            }
          );

        setStudents(
          res.data
        );

        if (
          res.data.length === 0
        ) {

          notify(
            "No students were found in the selected class.",
            "info"
          );

        }

      } catch (error) {

        console.log(
          "Failed to load students:",
          error
        );

        notify(
          error.response?.data?.message ||
            "Failed to load students.",
          "error"
        );

      } finally {

        setLoading(false);

      }

    };


  // ==========================================
  // CHANGE STATUS
  // ==========================================

  const changeStatus =
    async (student) => {

      const isActive =
        student.status ===
        "ACTIVE";

      const action =
        isActive
          ? "deactivate"
          : "activate";

      const confirmed =
        await confirmAction(
          `Are you sure you want to ${action} ${student.fullName}'s student account?`,
          {
            title:
              isActive
                ? "Deactivate Student"
                : "Activate Student",

            confirmText:
              isActive
                ? "Deactivate"
                : "Activate",

            cancelText:
              "Cancel"
          }
        );

      if (!confirmed) {
        return;
      }

      try {

        setChangingStatus(
          student.id
        );

        const res =
          await api.put(
            `/students/status/${student.id}`
          );

        notify(
          res.data.message ||
            `Student account ${
              isActive
                ? "deactivated"
                : "activated"
            } successfully.`,
          "success"
        );

        await loadStudents();

      } catch (error) {

        console.log(
          "Failed to update status:",
          error
        );

        notify(
          error.response?.data?.message ||
            "Failed to update student status.",
          "error"
        );

      } finally {

        setChangingStatus(
          null
        );

      }

    };


  return (

    <div className="p-3 sm:p-4 md:p-6 overflow-x-hidden">

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="flex items-center gap-3 mb-6">

          <div className="bg-blue-100 text-blue-700 p-3 rounded-xl flex-shrink-0">

            <FaUserGraduate
              size={22}
            />

          </div>

          <div className="min-w-0">

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">

              Student Status Manager

            </h1>

            <p className="text-gray-500 text-sm sm:text-base mt-1">

              Activate or deactivate student
              accounts.

            </p>

          </div>

        </div>


        {/* ========================================
            FILTER
        ======================================== */}

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* CLASS */}

            <div className="md:col-span-2">

              <label className="block text-sm font-semibold text-gray-600 mb-2">

                Select Class

              </label>

              <select
                value={
                  selectedClass
                }
                onChange={
                  handleClassChange
                }
                disabled={
                  loading ||
                  loadingClasses
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >

                <option value="">

                  {loadingClasses
                    ? "Loading classes..."
                    : "Select Class"}

                </option>

                {
                  classes.map(
                    (cls) => (

                      <option
                        key={
                          cls.id
                        }
                        value={
                          cls.id
                        }
                      >

                        {
                          cls.className
                        }

                      </option>

                    )
                  )
                }

              </select>

            </div>


            {/* LOAD BUTTON */}

            <div className="flex items-end">

              <button
                onClick={
                  loadStudents
                }
                disabled={
                  loading ||
                  loadingClasses
                }
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg px-4 py-3 font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed min-h-[48px]"
              >

                {
                  loading
                    ? "Loading..."
                    : "Load Students"
                }

              </button>

            </div>

          </div>

        </div>


        {/* ========================================
            SUMMARY
        ======================================== */}

        {
          students.length > 0 && (

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">

                  <FaUsers />

                </div>

                <div>

                  <p className="text-sm text-blue-700">

                    Students Found

                  </p>

                  <p className="font-bold text-blue-900">

                    {
                      students.length
                    }{" "}
                    {
                      students.length === 1
                        ? "Student"
                        : "Students"
                    }

                  </p>

                </div>

              </div>

              <div className="text-sm font-semibold text-blue-700">

                {
                  students.filter(
                    (student) =>
                      student.status ===
                      "ACTIVE"
                  ).length
                } active ·{" "}

                {
                  students.filter(
                    (student) =>
                      student.status !==
                      "ACTIVE"
                  ).length
                } inactive

              </div>

            </div>

          )
        }


        {/* ========================================
            DESKTOP TABLE
        ======================================== */}

        {
          students.length > 0 && (

            <div className="hidden md:block overflow-hidden">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-3 text-left">

                      Student Name

                    </th>

                    <th className="p-3 text-left">

                      Reg Number

                    </th>

                    <th className="p-3 text-left">

                      Status

                    </th>

                    <th className="p-3 text-left">

                      Action

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    students.map(
                      (student) => {

                        const isActive =
                          student.status ===
                          "ACTIVE";

                        const isChanging =
                          changingStatus ===
                          student.id;

                        return (

                          <tr
                            key={
                              student.id
                            }
                            className="border-b hover:bg-gray-50"
                          >

                            {/* NAME */}

                            <td className="p-3 font-medium">

                              {
                                student.fullName
                              }

                            </td>


                            {/* REG NUMBER */}

                            <td className="p-3">

                              {
                                student.regNumber
                              }

                            </td>


                            {/* STATUS */}

                            <td className="p-3">

                              <span
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                                  isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >

                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    isActive
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }`}
                                />

                                {
                                  student.status
                                }

                              </span>

                            </td>


                            {/* ACTION */}

                            <td className="p-3">

                              <button
                                onClick={() =>
                                  changeStatus(
                                    student
                                  )
                                }
                                disabled={
                                  isChanging
                                }
                                className={`px-4 py-2 rounded-lg text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed ${
                                  isActive
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-green-600 hover:bg-green-700"
                                }`}
                              >

                                {
                                  isChanging
                                    ? "Processing..."
                                    : isActive
                                      ? "Deactivate"
                                      : "Activate"
                                }

                              </button>

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


        {/* ========================================
            MOBILE STUDENT CARDS
        ======================================== */}

        {
          students.length > 0 && (

            <div className="md:hidden space-y-3">

              {
                students.map(
                  (
                    student,
                    index
                  ) => {

                    const isActive =
                      student.status ===
                      "ACTIVE";

                    const isChanging =
                      changingStatus ===
                      student.id;

                    return (

                      <div
                        key={
                          student.id
                        }
                        className={`border rounded-2xl overflow-hidden transition ${
                          isActive
                            ? "border-green-100"
                            : "border-red-100"
                        }`}
                      >

                        {/* FIRST LINE */}

                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">

                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">

                            {
                              index + 1
                            }

                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="font-semibold text-gray-800 break-words">

                              {
                                student.fullName
                              }

                            </p>

                          </div>

                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                              isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >

                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />

                            {
                              isActive
                                ? "Active"
                                : "Inactive"
                            }

                          </span>

                        </div>


                        {/* SECOND LINE */}

                        <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">

                          <div className="min-w-0">

                            <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">

                              Reg Number

                            </p>

                            <p className="text-sm text-gray-700 font-medium break-all mt-0.5">

                              {
                                student.regNumber
                              }

                            </p>

                          </div>


                          <button
                            onClick={() =>
                              changeStatus(
                                student
                              )
                            }
                            disabled={
                              isChanging
                            }
                            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-white text-xs font-semibold flex-shrink-0 min-w-[100px] min-h-[42px] transition disabled:opacity-60 disabled:cursor-not-allowed ${
                              isActive
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >

                            {
                              isChanging ? (
                                "Processing..."
                              ) : (
                                <>
                                  {
                                    isActive
                                      ? <FaToggleOff />
                                      : <FaToggleOn />
                                  }

                                  {
                                    isActive
                                      ? "Deactivate"
                                      : "Activate"
                                  }
                                </>
                              )
                            }

                          </button>

                        </div>

                      </div>

                    );

                  }
                )
              }

            </div>

          )
        }


        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {
          !loading &&
          students.length === 0 &&
          selectedClass && (

            <div className="py-14 text-center">

              <FaUserGraduate
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />

              <h2 className="text-xl font-semibold text-gray-600">

                No students found

              </h2>

              <p className="text-gray-400 mt-2 px-4">

                No students were found in the
                selected class.

              </p>

            </div>

          )
        }


        {/* ========================================
            INITIAL STATE
        ======================================== */}

        {
          !loading &&
          students.length === 0 &&
          !selectedClass && (

            <div className="py-14 text-center">

              <FaUserGraduate
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />

              <h2 className="text-xl font-semibold text-gray-600">

                Select a class

              </h2>

              <p className="text-gray-400 mt-2 px-4">

                Choose a class above and load the
                students to manage their account status.

              </p>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default StudentStatus;