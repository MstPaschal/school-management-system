import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";

import {
  useNotification,
} from "../context/NotificationContext";

function ResultReport() {
  const { user } = useAuth();

  const {
    notify,
  } = useNotification();

  const [classes, setClasses] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [filters, setFilters] =
    useState({
      classId: "",
      sessionId: "",
      term: "",
    });

  // ======================================
  // LOAD DATA
  // ======================================

  useEffect(() => {
    fetchClasses();
    fetchSessions();
  }, []);

  // ======================================
  // LOCK TEACHER CLASS
  // ======================================

  useEffect(() => {
    if (
      user?.role === "teacher" &&
      user?.assignedClass
    ) {
      setFilters((prev) => ({
        ...prev,
        classId:
          user.assignedClass,
      }));
    }
  }, [user]);

  // ======================================
  // FETCH CLASSES
  // ======================================

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
            "Failed to load classes.",
          "error"
        );
      }
    };

  // ======================================
  // FETCH SESSIONS
  // ======================================

  const fetchSessions =
    async () => {
      try {
        const res =
          await api.get(
            "/sessions"
          );

        setSessions(res.data);
      } catch (error) {
        console.log(error);

        notify(
          error.response?.data?.message ||
            "Failed to load sessions.",
          "error"
        );
      }
    };

  // ======================================
  // HANDLE CHANGE
  // ======================================

  const handleChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setFilters(
        (prev) => ({
          ...prev,
          [name]: value,
        })
      );

      // Clear previous data when
      // report filters change.
      if (
        name === "classId" ||
        name === "sessionId" ||
        name === "term"
      ) {
        setStudents([]);
        setResult(null);
      }
    };

  // ======================================
  // LOAD STUDENTS
  // ======================================

  const loadStudents =
    async () => {
      if (!filters.classId) {
        notify(
          "Please select a class.",
          "warning"
        );
        return;
      }

      if (!filters.sessionId) {
        notify(
          "Please select a session.",
          "warning"
        );
        return;
      }

      if (!filters.term) {
        notify(
          "Please select a term.",
          "warning"
        );
        return;
      }

      try {
        setLoading(true);
        setResult(null);

        const res =
          await api.get(
            `/students/class/${filters.classId}`
          );

        setStudents(res.data);

        if (
          res.data.length === 0
        ) {
          notify(
            "No students were found in the selected class.",
            "warning"
          );
        } else {
          notify(
            `${res.data.length} student${
              res.data.length === 1
                ? ""
                : "s"
            } loaded successfully.`,
            "success"
          );
        }
      } catch (error) {
        console.log(error);

        notify(
          error.response?.data?.message ||
            "Failed to load students.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

  // ======================================
  // VIEW RESULT
  // ======================================

  const viewResult =
    async (student) => {
      if (!filters.classId) {
        notify(
          "Please select a class.",
          "warning"
        );
        return;
      }

      if (!filters.sessionId) {
        notify(
          "Please select a session.",
          "warning"
        );
        return;
      }

      if (!filters.term) {
        notify(
          "Please select a term.",
          "warning"
        );
        return;
      }

      try {
        setLoading(true);

        const res =
          await api.get(
            "/results/view",
            {
              params: {
                studentId:
                  student.id,

                classId:
                  filters.classId,

                sessionId:
                  filters.sessionId,

                term:
                  filters.term,
              },
            }
          );

        console.log(
          "RESULT DATA:",
          res.data
        );

        setResult(res.data);

        notify(
          "Student result loaded successfully.",
          "success"
        );
      } catch (error) {
        console.log(error);

        notify(
          error.response?.data?.message ||
            "Failed to load result.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

  // ======================================
  // PRINT
  // ======================================

  const handlePrint =
    () => {
      if (!result) {
        notify(
          "Please load a student result before printing.",
          "warning"
        );
        return;
      }

      window.print();
    };

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        {/* HEADER */}

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Result Report
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Select a class, session and
            term to view student results.
          </p>
        </div>

        {/* FILTERS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          {/* CLASS */}

          <select
            name="classId"
            value={
              filters.classId
            }
            onChange={
              handleChange
            }
            disabled={
              user?.role ===
                "teacher" ||
              loading
            }
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">
              Select Class
            </option>

            {classes.map(
              (cls) => (
                <option
                  key={cls.id}
                  value={cls.id}
                >
                  {cls.className}
                </option>
              )
            )}
          </select>

          {/* SESSION */}

          <select
            name="sessionId"
            value={
              filters.sessionId
            }
            onChange={
              handleChange
            }
            disabled={loading}
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">
              Select Session
            </option>

            {sessions.map(
              (session) => (
                <option
                  key={session.id}
                  value={session.id}
                >
                  {
                    session.sessionName
                  }
                </option>
              )
            )}
          </select>

          {/* TERM */}

          <select
            name="term"
            value={
              filters.term
            }
            onChange={
              handleChange
            }
            disabled={loading}
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">
              Select Term
            </option>

            <option value="1st Term">
              1st Term
            </option>

            <option value="2nd Term">
              2nd Term
            </option>

            <option value="3rd Term">
              3rd Term
            </option>
          </select>

          {/* LOAD */}

          <button
            onClick={
              loadStudents
            }
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Loading..."
              : "Load Students"}
          </button>
        </div>

        {/* STUDENTS */}

        {students.length > 0 && (
          <div className="mb-10 overflow-x-auto">
            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-gray-100">

                  <th className="p-3 text-left whitespace-nowrap">
                    Student Name
                  </th>

                  <th className="p-3 text-left whitespace-nowrap">
                    Reg Number
                  </th>

                  <th className="p-3 text-left whitespace-nowrap">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>
                {students.map(
                  (student) => (
                    <tr
                      key={student.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3">
                        {
                          student.fullName
                        }
                      </td>

                      <td className="p-3">
                        {
                          student.regNumber
                        }
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() =>
                            viewResult(
                              student
                            )
                          }
                          disabled={
                            loading
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          View Result
                        </button>
                      </td>

                    </tr>
                  )
                )}
              </tbody>

            </table>
          </div>
        )}

        {/* RESULT */}

        {result && (
          <div
            id="print-area"
            className="border rounded-2xl p-4 sm:p-6 md:p-8 bg-white overflow-hidden"
          >

            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
              STUDENT RESULT
            </h2>

            {/* STUDENT INFO */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">

              <div>
                <p className="font-bold">
                  Name
                </p>

                <p className="break-words">
                  {
                    result.student
                      ?.fullName
                  }
                </p>
              </div>

              <div>
                <p className="font-bold">
                  Reg Number
                </p>

                <p className="break-words">
                  {
                    result.student
                      ?.regNumber
                  }
                </p>
              </div>

              <div>
                <p className="font-bold">
                  Session
                </p>

                <p className="break-words">
                  {
                    result.sessionName
                  }
                </p>
              </div>

              <div>
                <p className="font-bold">
                  Term
                </p>

                <p className="break-words">
                  {
                    result.term
                  }
                </p>
              </div>

            </div>

            {/* SUBJECTS */}

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border min-w-[1000px]">

                <thead>
                  <tr className="bg-gray-100">

                    <th className="border p-3">
                      Subject
                    </th>

                    <th className="border p-3">
                      1st CA
                    </th>

                    <th className="border p-3">
                      2nd CA
                    </th>

                    <th className="border p-3">
                      Project
                    </th>

                    <th className="border p-3">
                      Exam
                    </th>

                    <th className="border p-3">
                      Total
                    </th>

                    <th className="border p-2">
                      Class Highest
                    </th>

                    <th className="border p-2">
                      Class Lowest
                    </th>

                    <th className="border p-2">
                      Subject Avg
                    </th>

                    <th className="border p-3">
                      Grade
                    </th>

                    <th className="border p-3">
                      Remark
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {result.result?.subjects?.map(
                    (subject, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50"
                      >

                        <td className="border p-3">
                          {
                            subject.subject
                          }
                        </td>

                        <td className="border p-3">
                          {
                            subject.firstCA
                          }
                        </td>

                        <td className="border p-3">
                          {
                            subject.secondCA
                          }
                        </td>

                        <td className="border p-3">
                          {
                            subject.project
                          }
                        </td>

                        <td className="border p-3">
                          {
                            subject.exam
                          }
                        </td>

                        <td className="border p-3">
                          {
                            subject.total
                          }
                        </td>

                        <td className="border p-2 text-center">
                          {
                            subject.highestScore
                          }
                        </td>

                        <td className="border p-2 text-center">
                          {
                            subject.lowestScore
                          }
                        </td>

                        <td className="border p-2 text-center font-bold">
                          {
                            subject.subjectAverage
                          }
                        </td>

                        <td className="border p-3">
                          {
                            subject.grade
                          }
                        </td>

                        <td className="border p-3">
                          {
                            subject.remark
                          }
                        </td>

                      </tr>
                    )
                  )}
                </tbody>

              </table>
            </div>

            {/* SUMMARY */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">

              <div>
                <p className="font-bold">
                  Grand Total
                </p>

                <p>
                  {
                    result.result
                      ?.total
                  }
                </p>
              </div>

              <div>
                <p className="font-bold">
                  Average
                </p>

                <p>
                  {
                    result.result
                      ?.average
                  }
                </p>
              </div>

              <div>
                <p className="font-bold">
                  Grade
                </p>

                <p>
                  {
                    result.result
                      ?.mainGrade
                  }
                </p>
              </div>

              <div>
                <p className="font-bold">
                  Position
                </p>

                <p>
                  {
                    result.result
                      ?.position
                  }
                </p>
              </div>

            </div>

            {/* COMMENTS */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

              <div>
                <p className="font-bold mb-2">
                  Teacher's Comment
                </p>

                <div className="border rounded-lg p-4 break-words">
                  {
                    result.result
                      ?.teacherComment ||
                    "No comment"
                  }
                </div>
              </div>

              <div>
                <p className="font-bold mb-2">
                  Proprietor's Comment
                </p>

                <div className="border rounded-lg p-4 break-words">
                  {
                    result.result
                      ?.proprietorComment ||
                    "No comment"
                  }
                </div>
              </div>

            </div>

            {/* NEXT TERM */}

            <div className="mb-8">
              <p className="font-bold">
                Next Term Resumption Date
              </p>

              <p>
                {
                  result.result
                    ?.nextTermResumptionDate
                    ? new Date(
                        result.result
                          .nextTermResumptionDate
                      ).toLocaleDateString()
                    : "Not Set"
                }
              </p>
            </div>

            {/* PRINT */}

            <div className="text-center print:hidden">
              <button
                onClick={
                  handlePrint
                }
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition"
              >
                Print Result
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default ResultReport;