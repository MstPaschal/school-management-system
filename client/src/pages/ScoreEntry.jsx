import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import api from "../services/api";

import {
  useNotification,
} from "../context/NotificationContext";

function ScoreEntry() {
  const { user } =
    useAuth();

  const {
    notify,
  } = useNotification();

  const [classes, setClasses] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [teacherClass,
    setTeacherClass] =
    useState(null);

  const [filters, setFilters] =
    useState({
      classId: "",
      subjectId: "",
      sessionId: "",
      term: "",
    });

  // ======================================
  // LOAD DATA
  // ======================================

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    fetchSessions();

    if (user?.role === "teacher") {
      fetchTeacherDashboard();
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
  // FETCH SUBJECTS
  // ======================================

  const fetchSubjects =
    async () => {
      try {
        const res =
          await api.get(
            "/subjects"
          );

        setSubjects(res.data);
      } catch (error) {
        console.log(error);

        notify(
          error.response?.data?.message ||
            "Failed to load subjects.",
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
  // FETCH TEACHER DASHBOARD
  // ======================================

  const fetchTeacherDashboard =
    async () => {
      try {
        const res =
          await api.get(
            "/dashboard/teacher"
          );

        const assignedClass =
          res.data.assignedClass;

        setTeacherClass(
          assignedClass
        );

        setFilters(
          (prev) => ({
            ...prev,
            classId:
              assignedClass?.id ||
              "",
          })
        );
      } catch (error) {
        console.log(error);

        notify(
          error.response?.data?.message ||
            "Failed to load your assigned class.",
          "error"
        );
      }
    };

  // ======================================
  // HANDLE FILTER CHANGE
  // ======================================

  const handleFilterChange =
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

      // Clear previously loaded
      // students when filters change.
      if (
        name === "classId" ||
        name === "subjectId" ||
        name === "sessionId" ||
        name === "term"
      ) {
        setStudents([]);
      }
    };

  // ======================================
  // VALIDATE FILTERS
  // ======================================

  const validateFilters =
    () => {
      if (!filters.classId) {
        notify(
          "Please select a class.",
          "warning"
        );
        return false;
      }

      if (!filters.subjectId) {
        notify(
          "Please select a subject.",
          "warning"
        );
        return false;
      }

      if (!filters.sessionId) {
        notify(
          "Please select a session.",
          "warning"
        );
        return false;
      }

      if (!filters.term) {
        notify(
          "Please select a term.",
          "warning"
        );
        return false;
      }

      return true;
    };

  // ======================================
  // LOAD SCORESHEET
  // ======================================

  const loadScoreSheet =
    async () => {
      if (!validateFilters()) {
        return;
      }

      try {
        setLoading(true);

        const res =
          await api.get(
            "/scores/load",
            {
              params: filters,
            }
          );

        const updatedData =
          res.data.map(
            (item) => ({
              ...item,

              score: {
                firstCA:
                  item.score?.firstCA ??
                  "",

                secondCA:
                  item.score?.secondCA ??
                  "",

                project:
                  item.score?.project ??
                  "",

                exam:
                  item.score?.exam ??
                  "",

                total:
                  item.score?.total ??
                  0,
              },
            })
          );

        setStudents(
          updatedData
        );

        if (
          updatedData.length === 0
        ) {
          notify(
            "No students were found for the selected class.",
            "warning"
          );
        } else {
          notify(
            `${updatedData.length} student${
              updatedData.length ===
              1
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
            "Failed to load scoresheet.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

  // ======================================
  // HANDLE SCORE CHANGE
  // ======================================

  const handleScoreChange =
    (
      index,
      field,
      value
    ) => {
      const numericValue =
        Number(value);

      // Prevent negative values
      if (
        value !== "" &&
        numericValue < 0
      ) {
        notify(
          "Score cannot be negative.",
          "warning"
        );
        return;
      }

      // VALIDATION
      if (
        field === "firstCA" &&
        numericValue > 15
      ) {
        notify(
          "1st CA cannot be more than 15.",
          "warning"
        );
        return;
      }

      if (
        field === "secondCA" &&
        numericValue > 15
      ) {
        notify(
          "2nd CA cannot be more than 15.",
          "warning"
        );
        return;
      }

      if (
        field === "project" &&
        numericValue > 10
      ) {
        notify(
          "Project cannot be more than 10.",
          "warning"
        );
        return;
      }

      if (
        field === "exam" &&
        numericValue > 60
      ) {
        notify(
          "Exam cannot be more than 60.",
          "warning"
        );
        return;
      }

      const updated =
        [...students];

      updated[index] = {
        ...updated[index],
        score: {
          ...updated[index].score,
          [field]: value,
        },
      };

      const firstCA =
        Number(
          updated[index].score
            .firstCA || 0
        );

      const secondCA =
        Number(
          updated[index].score
            .secondCA || 0
        );

      const project =
        Number(
          updated[index].score
            .project || 0
        );

      const exam =
        Number(
          updated[index].score
            .exam || 0
        );

      updated[index].score.total =
        firstCA +
        secondCA +
        project +
        exam;

      setStudents(updated);
    };

  // ======================================
  // SAVE SCORES
  // ======================================

  const saveScores =
    async () => {
      if (!validateFilters()) {
        return;
      }

      if (!students.length) {
        notify(
          "Please load the scoresheet before saving scores.",
          "warning"
        );
        return;
      }

      try {
        setSaving(true);

        const payload = {
          scores:
            students.map(
              (item) => ({
                studentId:
                  item.student.id,

                classId:
                  filters.classId,

                subjectId:
                  filters.subjectId,

                sessionId:
                  filters.sessionId,

                term:
                  filters.term,

                firstCA:
                  item.score
                    ?.firstCA || 0,

                secondCA:
                  item.score
                    ?.secondCA || 0,

                project:
                  item.score
                    ?.project || 0,

                exam:
                  item.score
                    ?.exam || 0,
              })
            ),
        };

        const res =
          await api.post(
            "/scores",
            payload
          );

        notify(
          res.data.message ||
            "Scores saved successfully.",
          "success"
        );
      } catch (error) {
        console.log(error);

        notify(
          error.response?.data?.message ||
            "Save failed.",
          "error"
        );
      } finally {
        setSaving(false);
      }
    };

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        {/* HEADER */}

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Score Entry
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Select the class, subject,
            session and term before
            loading the scoresheet.
          </p>
        </div>

        {/* FILTERS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

          {/* CLASS */}

          <select
            name="classId"
            value={
              filters.classId
            }
            onChange={
              handleFilterChange
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

            {user?.role ===
            "teacher"
              ? teacherClass && (
                  <option
                    value={
                      teacherClass.id
                    }
                  >
                    {
                      teacherClass.className
                    }
                  </option>
                )
              : classes.map(
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
                )}
          </select>

          {/* SUBJECT */}

          <select
            name="subjectId"
            value={
              filters.subjectId
            }
            onChange={
              handleFilterChange
            }
            disabled={loading}
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map(
              (subject) => (
                <option
                  key={
                    subject.id
                  }
                  value={
                    subject.id
                  }
                >
                  {
                    subject.subjectName
                  }
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
              handleFilterChange
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
            )}
          </select>

          {/* TERM */}

          <select
            name="term"
            value={
              filters.term
            }
            onChange={
              handleFilterChange
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
              loadScoreSheet
            }
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Loading..."
              : "Load Scoresheet"}
          </button>
        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-gray-100">

                <th className="p-3 text-left">
                  Student
                </th>

                <th className="p-3 text-left">
                  1st CA
                </th>

                <th className="p-3 text-left">
                  2nd CA
                </th>

                <th className="p-3 text-left">
                  Project
                </th>

                <th className="p-3 text-left">
                  Exam
                </th>

                <th className="p-3 text-left">
                  Total
                </th>

              </tr>
            </thead>

            <tbody>
              {students.map(
                (
                  item,
                  index
                ) => (
                  <tr
                    key={
                      item.student.id
                    }
                    className="border-b"
                  >

                    <td className="p-3">
                      {
                        item.student
                          .fullName
                      }
                    </td>

                    <td className="p-3">

                      <input
                        type="number"
                        min="0"
                        max="15"
                        value={
                          item.score
                            .firstCA
                        }
                        onChange={(e) =>
                          handleScoreChange(
                            index,
                            "firstCA",
                            e.target
                              .value
                          )
                        }
                        className="border rounded px-3 py-2 w-20"
                      />

                    </td>

                    <td className="p-3">

                      <input
                        type="number"
                        min="0"
                        max="15"
                        value={
                          item.score
                            .secondCA
                        }
                        onChange={(e) =>
                          handleScoreChange(
                            index,
                            "secondCA",
                            e.target
                              .value
                          )
                        }
                        className="border rounded px-3 py-2 w-20"
                      />

                    </td>

                    <td className="p-3">

                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={
                          item.score
                            .project
                        }
                        onChange={(e) =>
                          handleScoreChange(
                            index,
                            "project",
                            e.target
                              .value
                          )
                        }
                        className="border rounded px-3 py-2 w-20"
                      />

                    </td>

                    <td className="p-3">

                      <input
                        type="number"
                        min="0"
                        max="60"
                        value={
                          item.score
                            .exam
                        }
                        onChange={(e) =>
                          handleScoreChange(
                            index,
                            "exam",
                            e.target
                              .value
                          )
                        }
                        className="border rounded px-3 py-2 w-20"
                      />

                    </td>

                    <td className="p-3 font-bold">
                      {
                        item.score
                          .total
                      }
                    </td>

                  </tr>
                )
              )}
            </tbody>

          </table>
        </div>

        {/* MOBILE CARDS */}

        <div className="md:hidden space-y-4">

          {students.map(
            (
              item,
              index
            ) => (
              <div
                key={
                  item.student.id
                }
                className="bg-white border rounded-xl p-4 shadow-sm"
              >

                <h3 className="font-bold text-lg mb-4">
                  {
                    item.student
                      .fullName
                  }
                </h3>

                <div className="grid grid-cols-2 gap-3">

                  {/* 1ST CA */}

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      1st CA
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={
                        item.score
                          .firstCA
                      }
                      onChange={(e) =>
                        handleScoreChange(
                          index,
                          "firstCA",
                          e.target
                            .value
                        )
                      }
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* 2ND CA */}

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      2nd CA
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={
                        item.score
                          .secondCA
                      }
                      onChange={(e) =>
                        handleScoreChange(
                          index,
                          "secondCA",
                          e.target
                            .value
                        )
                      }
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* PROJECT */}

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      Project
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={
                        item.score
                          .project
                      }
                      onChange={(e) =>
                        handleScoreChange(
                          index,
                          "project",
                          e.target
                            .value
                        )
                      }
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  {/* EXAM */}

                  <div>
                    <label className="text-sm text-gray-600 block mb-1">
                      Exam
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="60"
                      value={
                        item.score
                          .exam
                      }
                      onChange={(e) =>
                        handleScoreChange(
                          index,
                          "exam",
                          e.target
                            .value
                        )
                      }
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                </div>

                {/* TOTAL */}

                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex justify-between">

                  <span className="font-medium">
                    Total Score
                  </span>

                  <span className="font-bold text-green-700">
                    {
                      item.score
                        .total
                    }
                  </span>

                </div>

              </div>
            )
          )}

        </div>

        {/* SAVE BUTTON */}

        <div className="mt-6">

          <button
            onClick={
              saveScores
            }
            disabled={
              saving ||
              loading ||
              students.length === 0
            }
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving
              ? "Saving..."
              : "Save All Scores"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ScoreEntry;