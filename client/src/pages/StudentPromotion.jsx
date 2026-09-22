import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  FaUserGraduate,
  FaUsers,
  FaCheckCircle,
  FaGraduationCap
} from "react-icons/fa";

import {
  useNotification
} from "../context/NotificationContext";


function StudentPromotion() {

  const {
    notify,
    confirmAction
  } = useNotification();

  const [classes, setClasses] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [selectedStudents, setSelectedStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [loadingClasses, setLoadingClasses] =
    useState(true);

  const [loadingSessions, setLoadingSessions] =
    useState(true);

  const [filters, setFilters] =
    useState({
      classId: "",
      sessionId: ""
    });

  const [newClassId, setNewClassId] =
    useState("");


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    fetchClasses();
    fetchSessions();

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
  // FETCH SESSIONS
  // ==========================================

  const fetchSessions =
    async () => {

      try {

        setLoadingSessions(true);

        const res =
          await api.get(
            "/sessions"
          );

        setSessions(
          res.data
        );

      } catch (error) {

        console.log(
          "Failed to load sessions:",
          error
        );

        notify(
          error.response?.data?.message ||
            "Failed to load sessions.",
          "error"
        );

      } finally {

        setLoadingSessions(false);

      }

    };


  // ==========================================
  // HANDLE FILTER CHANGE
  // ==========================================

  const handleChange =
    (e) => {

      setFilters({
        ...filters,
        [e.target.name]:
          e.target.value
      });

      setStudents([]);
      setSelectedStudents([]);
      setNewClassId("");

    };


  // ==========================================
  // LOAD STUDENTS
  // ==========================================

  const loadStudents =
    async () => {

      if (
        !filters.classId
      ) {

        notify(
          "Please select a class.",
          "warning"
        );

        return;

      }

      if (
        !filters.sessionId
      ) {

        notify(
          "Please select an academic session.",
          "warning"
        );

        return;

      }

      try {

        setLoading(true);

        setSelectedStudents([]);
        setNewClassId("");

        const res =
          await api.get(
            "/promotions/load",
            {
              params: {
                classId:
                  filters.classId,

                sessionId:
                  filters.sessionId
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
            "No students were found for the selected class and session.",
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
  // SELECT ALL
  // ==========================================

  const toggleSelectAll =
    () => {

      if (
        selectedStudents.length ===
        students.length
      ) {

        setSelectedStudents([]);

      } else {

        setSelectedStudents(
          students.map(
            (item) =>
              item.student.id
          )
        );

      }

    };


  // ==========================================
  // SELECT STUDENT
  // ==========================================

  const toggleStudent =
    (studentId) => {

      if (
        selectedStudents.includes(
          studentId
        )
      ) {

        setSelectedStudents(
          selectedStudents.filter(
            (id) =>
              id !== studentId
          )
        );

      } else {

        setSelectedStudents([
          ...selectedStudents,
          studentId
        ]);

      }

    };


  // ==========================================
  // PROMOTE
  // ==========================================

  const promoteStudents =
    async () => {

      if (
        selectedStudents.length === 0
      ) {

        notify(
          "Please select at least one student to promote.",
          "warning"
        );

        return;

      }

      if (
        !newClassId
      ) {

        notify(
          "Please select the promotion class.",
          "warning"
        );

        return;

      }


      const selectedCount =
        selectedStudents.length;

      const confirmed =
        await confirmAction(
          `You are about to promote ${selectedCount} ${
            selectedCount === 1
              ? "student"
              : "students"
          } to ${
            newClassId === "GRADUATED"
              ? "GRADUATED"
              : classes.find(
                  (cls) =>
                    String(cls.id) ===
                    String(newClassId)
                )?.className ||
                "the selected class"
          }. Do you want to continue?`,
          {
            title:
              "Confirm Student Promotion",
            confirmText:
              "Promote Students",
            cancelText:
              "Cancel"
          }
        );

      if (!confirmed) {
        return;
      }


      try {

        setLoading(true);

        const res =
          await api.post(
            "/promotions",
            {
              studentIds:
                selectedStudents,

              newClassId
            }
          );

        notify(
          res.data.message ||
            "Students promoted successfully.",
          "success"
        );

        setSelectedStudents([]);

        await loadStudents();

      } catch (error) {

        console.log(
          "Promotion failed:",
          error
        );

        notify(
          error.response?.data?.message ||
            "Promotion failed.",
          "error"
        );

      } finally {

        setLoading(false);

      }

    };


  const allSelected =
    students.length > 0 &&
    selectedStudents.length ===
      students.length;


  return (

    <div className="p-3 sm:p-4 md:p-6 overflow-x-hidden">

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="flex items-center gap-3 mb-6">

          <div className="bg-blue-100 text-blue-700 p-3 rounded-xl flex-shrink-0">

            <FaGraduationCap
              size={22}
            />

          </div>

          <div className="min-w-0">

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">

              Student Promotion

            </h1>

            <p className="text-gray-500 text-sm sm:text-base mt-1">

              Select students and promote them
              to their next class.

            </p>

          </div>

        </div>


        {/* ========================================
            FILTERS
        ======================================== */}

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* CLASS */}

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">

                Select Class

              </label>

              <select
                name="classId"
                value={
                  filters.classId
                }
                onChange={
                  handleChange
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


            {/* SESSION */}

            <div>

              <label className="block text-sm font-semibold text-gray-600 mb-2">

                Select Session

              </label>

              <select
                name="sessionId"
                value={
                  filters.sessionId
                }
                onChange={
                  handleChange
                }
                disabled={
                  loading ||
                  loadingSessions
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >

                <option value="">

                  {loadingSessions
                    ? "Loading sessions..."
                    : "Select Session"}

                </option>

                {
                  sessions.map(
                    (session) => (

                      <option
                        key={
                          session.id
                        }
                        value={
                          session.id
                        }
                      >

                        {
                          session.sessionName
                        }

                      </option>

                    )
                  )
                }

              </select>

            </div>


            {/* LOAD */}

            <div className="flex items-end">

              <button
                onClick={
                  loadStudents
                }
                disabled={
                  loading ||
                  loadingClasses ||
                  loadingSessions
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
            STUDENT SUMMARY
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
                  selectedStudents.length
                } selected

              </div>

            </div>

          )
        }


        {/* ========================================
            DESKTOP STUDENTS TABLE
        ======================================== */}

        {
          students.length > 0 && (

            <div className="hidden md:block overflow-hidden mb-8">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-3 text-left">

                      <div className="flex items-center gap-2">

                        <input
                          type="checkbox"
                          checked={
                            allSelected
                          }
                          onChange={
                            toggleSelectAll
                          }
                          className="w-4 h-4 accent-blue-600 cursor-pointer"
                        />

                        <span>

                          Select All

                        </span>

                      </div>

                    </th>

                    <th className="p-3 text-left">

                      Student Name

                    </th>

                    <th className="p-3 text-left">

                      Reg Number

                    </th>

                    <th className="p-3 text-left">

                      Average

                    </th>

                  </tr>

                </thead>


                <tbody>

                  {
                    students.map(
                      (item) => (

                        <tr
                          key={
                            item.student.id
                          }
                          className="border-b hover:bg-gray-50"
                        >

                          <td className="p-3">

                            <input
                              type="checkbox"
                              checked={
                                selectedStudents.includes(
                                  item.student.id
                                )
                              }
                              onChange={() =>
                                toggleStudent(
                                  item.student.id
                                )
                              }
                              className="w-4 h-4 accent-blue-600 cursor-pointer"
                            />

                          </td>

                          <td className="p-3 font-medium">

                            {
                              item.student.fullName
                            }

                          </td>

                          <td className="p-3">

                            {
                              item.student.regNumber
                            }

                          </td>

                          <td className="p-3 font-bold">

                            {
                              item.cumulativeAverage
                            }

                          </td>

                        </tr>

                      )
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

            <div className="md:hidden space-y-3 mb-8">

              {/* SELECT ALL */}

              <div className="flex items-center justify-between gap-3 bg-gray-100 rounded-xl px-4 py-3">

                <label className="flex items-center gap-3 font-semibold text-gray-700 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={
                      allSelected
                    }
                    onChange={
                      toggleSelectAll
                    }
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                  />

                  <span>

                    Select All Students

                  </span>

                </label>

                <span className="text-xs text-gray-500">

                  {
                    selectedStudents.length
                  } / {
                    students.length
                  }

                </span>

              </div>


              {
                students.map(
                  (
                    item,
                    index
                  ) => {

                    const isSelected =
                      selectedStudents.includes(
                        item.student.id
                      );

                    return (

                      <div
                        key={
                          item.student.id
                        }
                        className={`border rounded-2xl overflow-hidden transition ${
                          isSelected
                            ? "border-blue-300 bg-blue-50/40"
                            : "border-gray-200 bg-white"
                        }`}
                      >

                        {/* FIRST LINE */}

                        <div className="flex items-center gap-3 px-4 py-3">

                          <input
                            type="checkbox"
                            checked={
                              isSelected
                            }
                            onChange={() =>
                              toggleStudent(
                                item.student.id
                              )
                            }
                            className="w-5 h-5 accent-blue-600 cursor-pointer flex-shrink-0"
                          />

                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">

                            {
                              index + 1
                            }

                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="font-semibold text-gray-800 break-words">

                              {
                                item.student.fullName
                              }

                            </p>

                          </div>

                        </div>


                        {/* SECOND LINE */}

                        <div className="grid grid-cols-2 gap-3 px-4 pb-4 pt-1 border-t border-gray-100">

                          <div className="min-w-0">

                            <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">

                              Reg Number

                            </p>

                            <p className="text-sm text-gray-700 font-medium break-all mt-0.5">

                              {
                                item.student.regNumber
                              }

                            </p>

                          </div>

                          <div>

                            <p className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">

                              Average

                            </p>

                            <p className="text-sm text-blue-700 font-bold mt-0.5">

                              {
                                item.cumulativeAverage
                              }

                            </p>

                          </div>

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
            PROMOTION ACTION
        ======================================== */}

        {
          students.length > 0 && (

            <div className="border-t border-gray-100 pt-6">

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* PROMOTION CLASS */}

                <div>

                  <label className="block text-sm font-semibold text-gray-600 mb-2">

                    Promotion Class

                  </label>

                  <select
                    value={
                      newClassId
                    }
                    onChange={(e) =>
                      setNewClassId(
                        e.target.value
                      )
                    }
                    disabled={
                      loading
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >

                    <option value="">

                      Select Promotion Class

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

                    <option value="GRADUATED">

                      GRADUATED

                    </option>

                  </select>

                </div>


                {/* PROMOTE BUTTON */}

                <div className="md:col-span-2 flex items-end">

                  <button
                    onClick={
                      promoteStudents
                    }
                    disabled={
                      loading ||
                      selectedStudents.length === 0 ||
                      !newClassId
                    }
                    className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-lg px-4 py-3 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                  >

                    {
                      loading
                        ? "Processing..."
                        : `Promote ${
                            selectedStudents.length || ""
                          } Selected ${
                            selectedStudents.length === 1
                              ? "Student"
                              : "Students"
                          }`
                    }

                  </button>

                </div>

              </div>

            </div>

          )
        }


        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {
          !loading &&
          students.length === 0 &&
          filters.classId &&
          filters.sessionId && (

            <div className="py-14 text-center">

              <FaUserGraduate
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />

              <h2 className="text-xl font-semibold text-gray-600">

                No students found

              </h2>

              <p className="text-gray-400 mt-2 px-4">

                No students were found for the
                selected class and session.

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
          !filters.classId &&
          !filters.sessionId && (

            <div className="py-14 text-center">

              <FaGraduationCap
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />

              <h2 className="text-xl font-semibold text-gray-600">

                Ready for Promotion

              </h2>

              <p className="text-gray-400 mt-2 px-4">

                Select a class and academic session,
                then load the students to begin.

              </p>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default StudentPromotion;