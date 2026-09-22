import {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { SERVER_BASE_URL } from "../config/apiConfig";

import {
  FaUserGraduate,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt
} from "react-icons/fa";

import {
  useNotification
} from "../context/NotificationContext";


function ViewStudents() {

  const navigate =
    useNavigate();

  const {
    notify,
    confirmAction
  } = useNotification();

  const [students, setStudents] =
    useState([]);

  const [
    filteredStudents,
    setFilteredStudents
  ] = useState([]);

  const [classes, setClasses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedClass,
    setSelectedClass
  ] = useState("");

  const [
    selectedStudent,
    setSelectedStudent
  ] = useState(null);

  const [
    showProfile,
    setShowProfile
  ] = useState(false);

  const [
    loadingStudents,
    setLoadingStudents
  ] = useState(true);

  const [
    deletingId,
    setDeletingId
  ] = useState(null);


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    fetchStudents();
    fetchClasses();

  }, []);


  // ==========================================
  // FETCH STUDENTS
  // ==========================================

  const fetchStudents =
    async () => {

      try {

        setLoadingStudents(true);

        const res =
          await api.get(
            "/students"
          );

        setStudents(
          res.data
        );

        setFilteredStudents(
          res.data
        );

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

        setLoadingStudents(false);

      }

    };


  // ==========================================
  // FETCH CLASSES
  // ==========================================

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

        console.log(
          "Failed to load classes:",
          error
        );

        notify(
          error.response?.data?.message ||
            "Failed to load classes.",
          "error"
        );

      }

    };


  // ==========================================
  // DELETE STUDENT
  // ==========================================

  const handleDelete =
    async (student) => {

      const confirmed =
        await confirmAction(
          `Are you sure you want to permanently delete ${student.fullName}? This action cannot be undone.`,
          {
            title:
              "Delete Student",

            confirmText:
              "Delete Student",

            cancelText:
              "Cancel"
          }
        );

      if (!confirmed) {
        return;
      }


      try {

        setDeletingId(
          student.id
        );

        const res =
          await api.delete(
            `/students/${student.id}`
          );

        notify(
          res.data.message ||
            "Student deleted successfully.",
          "success"
        );

        if (
          selectedStudent?.id ===
          student.id
        ) {

          setSelectedStudent(
            null
          );

          setShowProfile(
            false
          );

        }

        await fetchStudents();

      } catch (error) {

        console.log(
          "Delete student error:",
          error
        );

        notify(
          error.response?.data?.message ||
            "Delete failed.",
          "error"
        );

      } finally {

        setDeletingId(
          null
        );

      }

    };


  // ==========================================
  // SEARCH & FILTER
  // ==========================================

  useEffect(() => {

    let data =
      students;


    // SEARCH

    if (
      search.trim()
    ) {

      const searchValue =
        search
          .trim()
          .toLowerCase();

      data =
        data.filter(
          (student) =>
            student.fullName
              ?.toLowerCase()
              .includes(
                searchValue
              ) ||

            student.regNumber
              ?.toLowerCase()
              .includes(
                searchValue
              ) ||

            student.admissionNumber
              ?.toLowerCase()
              .includes(
                searchValue
              )
        );

    }


    // FILTER BY CLASS

    if (
      selectedClass
    ) {

      data =
        data.filter(
          (student) =>
            String(
              student.currentClass
            ) ===
            String(
              selectedClass
            )
        );

    }


    setFilteredStudents(
      data
    );

  }, [

    search,

    selectedClass,

    students

  ]);


  // ==========================================
  // OPEN PROFILE
  // ==========================================

  const openProfile =
    (student) => {

      setSelectedStudent(
        student
      );

      setShowProfile(
        true
      );

    };


  // ==========================================
  // CLOSE PROFILE
  // ==========================================

  const closeProfile =
    () => {

      setShowProfile(
        false
      );

      setSelectedStudent(
        null
      );

    };


  return (

    <div className="p-3 sm:p-4 md:p-6 overflow-x-hidden">

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

          <div className="flex items-center gap-3 min-w-0">

            <div className="bg-blue-100 text-blue-700 p-3 rounded-xl flex-shrink-0">

              <FaUserGraduate
                size={22}
              />

            </div>

            <div className="min-w-0">

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">

                Students

              </h1>

              <p className="text-gray-500 text-sm mt-1">

                View, search and manage
                student records.

              </p>

            </div>

          </div>


          {/* SEARCH + FILTER */}

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

            {/* SEARCH */}

            <div className="relative w-full sm:w-64">

              <FaSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search student..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* FILTER */}

            <select
              value={
                selectedClass
              }
              onChange={(e) =>
                setSelectedClass(
                  e.target.value
                )
              }
              className="w-full sm:w-52 border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >

              <option value="">

                All Classes

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

        </div>


        {/* ========================================
            SUMMARY
        ======================================== */}

        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5">

          <p className="text-sm text-blue-700">

            Showing{" "}

            <span className="font-bold">

              {
                filteredStudents.length
              }

            </span>{" "}

            of{" "}

            <span className="font-bold">

              {
                students.length
              }

            </span>{" "}

            students

          </p>

        </div>


        {/* ========================================
            LOADING
        ======================================== */}

        {
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
            DESKTOP TABLE
        ======================================== */}

        {
          !loadingStudents &&
          filteredStudents.length > 0 && (

            <div className="hidden md:block overflow-hidden">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-100 text-left">

                    <th className="p-3">

                      Passport

                    </th>

                    <th className="p-3">

                      Full Name

                    </th>

                    <th className="p-3">

                      Gender

                    </th>

                    <th className="p-3">

                      Reg Number

                    </th>

                    <th className="p-3">

                      Admission No

                    </th>

                    <th className="p-3">

                      Status

                    </th>

                    <th className="p-3">

                      Actions

                    </th>

                  </tr>

                </thead>


                <tbody>

                  {
                    filteredStudents.map(
                      (student) => {

                        const isDeleting =
                          deletingId ===
                          student.id;

                        return (

                          <tr
                            key={
                              student.id
                            }
                            className="border-b hover:bg-gray-50"
                          >

                            {/* PASSPORT */}

                            <td className="p-3">

                              {
                                student.passport
                                  ? (

                                    <img
                                      src={`${SERVER_BASE_URL}/uploads/${student.passport}`}
                                      alt={
                                        student.fullName ||
                                        "Student"
                                      }
                                      className="w-14 h-14 rounded-full object-cover"
                                    />

                                  )
                                  : (

                                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">

                                      <FaUserGraduate />

                                    </div>

                                  )
                              }

                            </td>


                            {/* NAME */}

                            <td className="p-3 font-medium">

                              {
                                student.fullName
                              }

                            </td>


                            {/* GENDER */}

                            <td className="p-3">

                              {
                                student.gender
                              }

                            </td>


                            {/* REG NUMBER */}

                            <td className="p-3">

                              {
                                student.regNumber
                              }

                            </td>


                            {/* ADMISSION NUMBER */}

                            <td className="p-3">

                              {
                                student.admissionNumber
                              }

                            </td>


                            {/* STATUS */}

                            <td className="p-3">

                              <span
                                className={`inline-flex px-3 py-1 rounded-full text-white text-sm font-semibold ${
                                  student.status ===
                                  "ACTIVE"
                                    ? "bg-green-500"
                                    : student.status ===
                                      "INACTIVE"
                                    ? "bg-red-500"
                                    : "bg-purple-500"
                                }`}
                              >

                                {
                                  student.status
                                }

                              </span>

                            </td>


                            {/* ACTIONS */}

                            <td className="p-3">

                              <div className="flex items-center gap-2">

                                <button
                                  onClick={() =>
                                    navigate(
                                      `/students/edit/${student.id}`
                                    )
                                  }
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition"
                                >

                                  <FaEdit />

                                  <span>
                                    Edit
                                  </span>

                                </button>


                                <button
                                  onClick={() =>
                                    openProfile(
                                      student
                                    )
                                  }
                                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition"
                                >

                                  <FaEye />

                                  <span>
                                    View
                                  </span>

                                </button>


                                <button
                                  onClick={() =>
                                    handleDelete(
                                      student
                                    )
                                  }
                                  disabled={
                                    isDeleting
                                  }
                                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
                                >

                                  <FaTrash />

                                  <span>

                                    {
                                      isDeleting
                                        ? "Deleting..."
                                        : "Delete"
                                    }

                                  </span>

                                </button>

                              </div>

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
          !loadingStudents &&
          filteredStudents.length > 0 && (

            <div className="md:hidden space-y-3">

              {
                filteredStudents.map(
                  (
                    student,
                    index
                  ) => {

                    const isDeleting =
                      deletingId ===
                      student.id;

                    return (

                      <div
                        key={
                          student.id
                        }
                        className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
                      >

                        {/* FIRST LINE */}

                        <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 border-b border-gray-100">

                          {
                            student.passport
                              ? (

                                <img
                                  src={`${SERVER_BASE_URL}/uploads/${student.passport}`}
                                  alt={
                                    student.fullName ||
                                    "Student"
                                  }
                                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm"
                                />

                              )
                              : (

                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 flex-shrink-0">

                                  <FaUserGraduate />

                                </div>

                              )
                          }


                          <div className="min-w-0 flex-1">

                            <div className="flex items-center gap-2">

                              <span className="text-xs text-gray-400 font-semibold">

                                #
                                {
                                  index + 1
                                }

                              </span>

                              <h3 className="font-semibold text-gray-800 break-words">

                                {
                                  student.fullName
                                }

                              </h3>

                            </div>

                            <p className="text-xs text-gray-500 mt-0.5 break-all">

                              {
                                student.regNumber
                              }

                            </p>

                          </div>


                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex-shrink-0 ${
                              student.status ===
                              "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : student.status ===
                                  "INACTIVE"
                                ? "bg-red-100 text-red-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >

                            {
                              student.status
                            }

                          </span>

                        </div>


                        {/* SECOND LINE */}

                        <div className="grid grid-cols-2 gap-3 px-3 py-3">

                          <div>

                            <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">

                              Gender

                            </p>

                            <p className="text-sm text-gray-700 font-medium mt-0.5">

                              {
                                student.gender ||
                                "N/A"
                              }

                            </p>

                          </div>


                          <div>

                            <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">

                              Admission No

                            </p>

                            <p className="text-sm text-gray-700 font-medium mt-0.5 break-all">

                              {
                                student.admissionNumber ||
                                "N/A"
                              }

                            </p>

                          </div>

                        </div>


                        {/* ACTIONS */}

                        <div className="grid grid-cols-3 gap-2 px-3 pb-3">

                          <button
                            onClick={() =>
                              navigate(
                                `/students/edit/${student.id}`
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition"
                          >

                            <FaEdit />

                            Edit

                          </button>


                          <button
                            onClick={() =>
                              openProfile(
                                student
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition"
                          >

                            <FaEye />

                            View

                          </button>


                          <button
                            onClick={() =>
                              handleDelete(
                                student
                              )
                            }
                            disabled={
                              isDeleting
                            }
                            className="bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                          >

                            <FaTrash />

                            {
                              isDeleting
                                ? "..."
                                : "Delete"
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
          !loadingStudents &&
          filteredStudents.length === 0 && (

            <div className="py-16 text-center">

              <FaUserGraduate
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />

              <h2 className="text-xl font-semibold text-gray-600">

                No students found

              </h2>

              <p className="text-gray-400 mt-2 px-4">

                {
                  search ||
                  selectedClass
                    ? "Try adjusting your search or class filter."
                    : "There are currently no students to display."
                }

              </p>

            </div>

          )
        }

      </div>


      {/* ========================================
          PROFILE MODAL
      ======================================== */}

      {
        showProfile &&
        selectedStudent && (

          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-3 sm:p-4"
            onClick={closeProfile}
          >

            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[94vh] overflow-hidden flex flex-col"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* HEADER */}

              <div className="bg-blue-700 text-white p-5 sm:p-6 text-center relative flex-shrink-0">

                <button
                  onClick={
                    closeProfile
                  }
                  className="absolute right-3 top-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                  aria-label="Close profile"
                >

                  <FaTimes />

                </button>


                {/* SCHOOL LOGO */}

                <div className="flex justify-center mb-3">

                  <img
                    src="/Logo.png"
                    alt="School Logo"
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border-4 border-white"
                  />

                </div>

                <h1 className="text-xl sm:text-3xl font-bold">

                  GRISFIELD SCHOOLS

                </h1>

                <p className="text-sm sm:text-lg mt-1 sm:mt-2 text-blue-100">

                  STUDENT PROFILE

                </p>

              </div>


              {/* BODY */}

              <div className="p-4 sm:p-6 overflow-y-auto">

                <div className="flex flex-col md:flex-row gap-6">

                  {/* PASSPORT */}

                  <div className="flex justify-center md:justify-start flex-shrink-0">

                    {
                      selectedStudent.passport
                        ? (

                          <img
                            src={`${SERVER_BASE_URL}/uploads/${selectedStudent.passport}`}
                            alt={
                              selectedStudent.fullName ||
                              "Student"
                            }
                            className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl object-cover border"
                          />

                        )
                        : (

                          <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">

                            <FaUserGraduate
                              size={40}
                            />

                          </div>

                        )
                    }

                  </div>


                  {/* DETAILS */}

                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div>

                      <h3 className="font-bold text-gray-600 text-sm">

                        Full Name

                      </h3>

                      <p className="text-gray-800 break-words mt-0.5">

                        {
                          selectedStudent.fullName
                        }

                      </p>

                    </div>


                    <div>

                      <h3 className="font-bold text-gray-600 text-sm">

                        Reg Number

                      </h3>

                      <p className="text-gray-800 break-all mt-0.5">

                        {
                          selectedStudent.regNumber
                        }

                      </p>

                    </div>


                    <div>

                      <h3 className="font-bold text-gray-600 text-sm">

                        Admission Number

                      </h3>

                      <p className="text-gray-800 break-all mt-0.5">

                        {
                          selectedStudent.admissionNumber
                        }

                      </p>

                    </div>


                    <div>

                      <h3 className="font-bold text-gray-600 text-sm">

                        Gender

                      </h3>

                      <p className="text-gray-800 mt-0.5">

                        {
                          selectedStudent.gender ||
                          "N/A"
                        }

                      </p>

                    </div>


                    <div>

                      <h3 className="font-bold text-gray-600 text-sm">

                        Status

                      </h3>

                      <p className="mt-0.5">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                            selectedStudent.status ===
                            "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : selectedStudent.status ===
                                "INACTIVE"
                              ? "bg-red-100 text-red-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >

                          {
                            selectedStudent.status
                          }

                        </span>

                      </p>

                    </div>


                    <div>

                      <h3 className="font-bold text-gray-600 text-sm flex items-center gap-2">

                        <FaCalendarAlt className="text-blue-600" />

                        Date Of Birth

                      </h3>

                      <p className="text-gray-800 mt-0.5">

                        {
                          selectedStudent.dob ||
                          "N/A"
                        }

                      </p>

                    </div>


                    <div>

                      <h3 className="font-bold text-gray-600 text-sm">

                        Class

                      </h3>

                      <p className="text-gray-800 mt-0.5">

                        {
                          classes.find(
                            (cls) =>
                              String(
                                cls.id
                              ) ===
                              String(
                                selectedStudent.currentClass
                              )
                          )?.className ||
                          "N/A"
                        }

                      </p>

                    </div>


                    <div>

                      <h3 className="font-bold text-gray-600 text-sm flex items-center gap-2">

                        <FaPhone className="text-blue-600" />

                        Parent Contact 1

                      </h3>

                      <p className="text-gray-800 break-all mt-0.5">

                        {
                          selectedStudent.contact1 ||
                          "N/A"
                        }

                      </p>

                    </div>


                    <div>

                      <h3 className="font-bold text-gray-600 text-sm flex items-center gap-2">

                        <FaPhone className="text-blue-600" />

                        Parent Contact 2

                      </h3>

                      <p className="text-gray-800 break-all mt-0.5">

                        {
                          selectedStudent.contact2 ||
                          "N/A"
                        }

                      </p>

                    </div>


                    <div className="sm:col-span-2">

                      <h3 className="font-bold text-gray-600 text-sm flex items-center gap-2">

                        <FaMapMarkerAlt className="text-blue-600" />

                        Address

                      </h3>

                      <p className="text-gray-800 break-words mt-0.5">

                        {
                          selectedStudent.address ||
                          "N/A"
                        }

                      </p>

                    </div>

                  </div>

                </div>


                {/* CLOSE BUTTON */}

                <div className="mt-7 text-center">

                  <button
                    onClick={
                      closeProfile
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition w-full sm:w-auto min-w-[120px]"
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

  );

}

export default ViewStudents;