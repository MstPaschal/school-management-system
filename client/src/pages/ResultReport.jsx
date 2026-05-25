import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

function ResultReport() {

  const { user } = useAuth();

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

      term: "1st Term"

    });

  // LOAD DATA
  useEffect(() => {

    fetchClasses();

    fetchSessions();

  }, []);

  // LOCK TEACHER CLASS
  useEffect(() => {

    if (

      user?.role === "teacher" &&

      user?.assignedClass

    ) {

      setFilters((prev) => ({

        ...prev,

        classId: user.assignedClass

      }));

    }

  }, [user]);

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

      }

    };

  // FETCH SESSIONS
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

      }

    };

  // HANDLE CHANGE
  const handleChange =
    (e) => {

      setFilters({

        ...filters,

        [e.target.name]:
          e.target.value

      });

    };

  // LOAD STUDENTS
  const loadStudents =
    async () => {

      if (
        !filters.classId ||
        !filters.sessionId
      ) {

        return alert(
          "Select class and session"
        );

      }

      try {

        setLoading(true);

        const res =
          await api.get(
            `/students/class/${filters.classId}`
          );

        setStudents(res.data);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to load students"
        );

      } finally {

        setLoading(false);

      }

    };

  // VIEW RESULT
  const viewResult =
    async (student) => {

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
                  filters.term

              }

            }

          );

        console.log(
          "RESULT DATA:",
          res.data
        );

        setResult(res.data);

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Failed to load result"

        );

      } finally {

        setLoading(false);

      }

    };

  // PRINT
  const handlePrint =
    () => {

      window.print();

    };

  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Result Report

        </h1>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          {/* CLASS */}
          <select
            name="classId"
            value={filters.classId}
            onChange={handleChange}
            disabled={user?.role === "teacher"}
            className="border rounded-lg px-4 py-3"
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

          {/* SESSION */}
          <select
            name="sessionId"
            value={filters.sessionId}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >

            <option value="">
              Select Session
            </option>

            {
              sessions.map((session) => (

                <option
                  key={session.id}
                  value={session.id}
                >

                  {session.sessionName}

                </option>

              ))
            }

          </select>

          {/* TERM */}
          <select
            name="term"
            value={filters.term}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >

            <option>
              1st Term
            </option>

            <option>
              2nd Term
            </option>

            <option>
              3rd Term
            </option>

          </select>

          {/* LOAD */}
          <button
            onClick={loadStudents}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3"
          >

            {
              loading
                ? "Loading..."
                : "Load Students"
            }

          </button>

        </div>

        {/* STUDENTS */}
        {
          students.length > 0 && (

            <div className="overflow-x-auto mb-10">

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
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    students.map((student) => (

                      <tr
                        key={student.id}
                        className="border-b"
                      >

                        <td className="p-3">

                          {student.fullName}

                        </td>

                        <td className="p-3">

                          {student.regNumber}

                        </td>

                        <td className="p-3">

                          <button
                            onClick={() =>
                              viewResult(student)
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                          >

                            View Result

                          </button>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            </div>

          )
        }

        {/* RESULT */}
        {
          result && (

            <div
              id="print-area"
              className="border rounded-2xl p-8 bg-white"
            >

              <h2 className="text-2xl font-bold mb-6 text-center">

                STUDENT RESULT

              </h2>

              {/* STUDENT INFO */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                <div>

                  <p className="font-bold">
                    Name
                  </p>

                  <p>
                    {result.student?.fullName}
                  </p>

                </div>

                <div>

                  <p className="font-bold">
                    Reg Number
                  </p>

                  <p>
                    {result.student?.regNumber}
                  </p>

                </div>

                <div>

                  <p className="font-bold">
                    Session
                  </p>

                  <p>
                    {result.sessionName}
                  </p>

                </div>

                <div>

                  <p className="font-bold">
                    Term
                  </p>

                  <p>
                    {result.term}
                  </p>

                </div>

              </div>

              {/* SUBJECTS */}
              <div className="overflow-x-auto mb-8">

                <table className="w-full border-collapse border">

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

                    {
                      result.result?.subjects?.map(

                        (subject, index) => (

                          <tr key={index}>

                            <td className="border p-3">
                              {subject.subject}
                            </td>

                            <td className="border p-3">
                              {subject.firstCA}
                            </td>

                            <td className="border p-3">
                              {subject.secondCA}
                            </td>

                            <td className="border p-3">
                              {subject.project}
                            </td>

                            <td className="border p-3">
                              {subject.exam}
                            </td>

                            <td className="border p-3">
                              {subject.total}
                            </td>

                            <td className="border p-2 text-center">

                              {subject.highestScore}

                            </td>

                            <td className="border p-2 text-center">

                              {subject.lowestScore}

                            </td>

                            <td className="border p-2 text-center font-bold">

                              {subject.subjectAverage}

                            </td>

                            <td className="border p-3">
                              {subject.grade}
                            </td>

                            <td className="border p-3">
                              {subject.remark}
                            </td>

                          </tr>

                        )

                      )
                    }

                  </tbody>

                </table>

              </div>

              {/* SUMMARY */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                <div>

                  <p className="font-bold">
                    Grand Total
                  </p>

                  <p>
                    {result.result?.total}
                  </p>

                </div>

                <div>

                  <p className="font-bold">
                    Average
                  </p>

                  <p>
                    {result.result?.average}
                  </p>

                </div>

                <div>

                  <p className="font-bold">
                    Grade
                  </p>

                  <p>
                    {result.result?.mainGrade}
                  </p>

                </div>

                <div>

                  <p className="font-bold">
                    Position
                  </p>

                  <p>
                    {result.result?.position}
                  </p>

                </div>

              </div>

              {/* COMMENTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div>

                  <p className="font-bold mb-2">

                    Teacher's Comment

                  </p>

                  <div className="border rounded-lg p-4">

                    {
                      result.result?.teacherComment ||

                      "No comment"
                    }

                  </div>

                </div>

                <div>

                  <p className="font-bold mb-2">

                    Proprietor's Comment

                  </p>

                  <div className="border rounded-lg p-4">

                    {
                      result.result?.proprietorComment ||

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
                    result.result?.nextTermResumptionDate

                      ? new Date(
                          result.result.nextTermResumptionDate
                        ).toLocaleDateString()

                      : "Not Set"
                  }

                </p>

              </div>

              {/* PRINT */}
              <div className="text-center">

                <button
                  onClick={handlePrint}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
                >

                  Print Result

                </button>

              </div>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default ResultReport;