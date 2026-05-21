import {
  useEffect,
  useState
} from "react";

import {
  useAuth
} from "../context/AuthContext";

import api from "../services/api";

function ScoreEntry() {

  const { user } =
  useAuth();

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

      term: "1st Term"

    });


  // LOAD DATA
  useEffect(() => {

    fetchClasses();

    fetchSubjects();

    fetchSessions();

    // LOAD TEACHER CLASS
    if (user?.role === "teacher") {

      fetchTeacherDashboard();

    }

  }, []);


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


  // FETCH SUBJECTS
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


  // FETCH TEACHER DASHBOARD
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

        // AUTO SET FILTER
        setFilters((prev) => ({

          ...prev,

          classId:
            assignedClass?.id || ""

        }));

      } catch (error) {

        console.log(error);

      }

    };


  // HANDLE FILTER CHANGE
  const handleFilterChange =
    (e) => {

      setFilters({

        ...filters,

        [e.target.name]:
          e.target.value

      });

    };


  // LOAD SCORESHEET
  const loadScoreSheet =
    async () => {

      try {

        setLoading(true);

        const res =
          await api.get(

            "/scores/load",

            {

              params: filters

            }

          );

        const updatedData =
          res.data.map((item) => ({

            ...item,

            score: {

              firstCA:
                item.score?.firstCA || "",

              secondCA:
                item.score?.secondCA || "",

              project:
                item.score?.project || "",

              exam:
                item.score?.exam || "",

              total:
                item.score?.total || 0

            }

          }));

        setStudents(updatedData);

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed to load scoresheet"
        );

      } finally {

        setLoading(false);

      }

    };


  // HANDLE SCORE CHANGE
  const handleScoreChange =
    (index, field, value) => {

        let numericValue =
        Number(value);


        // VALIDATION
        if (
        field === "firstCA" &&
        numericValue > 15
        ) {

        alert(
            "1st CA cannot be more than 15"
        );

        return;

        }


        if (
        field === "secondCA" &&
        numericValue > 15
        ) {

        alert(
            "2nd CA cannot be more than 15"
        );

        return;

        }


        if (
        field === "project" &&
        numericValue > 10
        ) {

        alert(
            "Project cannot be more than 10"
        );

        return;

        }


        if (
        field === "exam" &&
        numericValue > 60
        ) {

        alert(
            "Exam cannot be more than 60"
        );

        return;

        }


        const updated =
        [...students];

        updated[index].score[field] =
        value;


        const firstCA =
        Number(
            updated[index].score.firstCA || 0
        );

        const secondCA =
        Number(
            updated[index].score.secondCA || 0
        );

        const project =
        Number(
            updated[index].score.project || 0
        );

        const exam =
        Number(
            updated[index].score.exam || 0
        );


        updated[index].score.total =

        firstCA +

        secondCA +

        project +

        exam;


        setStudents(updated);

    };


  // SAVE SCORE
  const saveScores = async () => {

    try {

        setSaving(true);

        const payload = {

        scores: students.map((item) => ({

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
            item.score?.firstCA || 0,

            secondCA:
            item.score?.secondCA || 0,

            project:
            item.score?.project || 0,

            exam:
            item.score?.exam || 0

        }))

        };


        const res =
        await api.post(

            "/scores",

            payload

        );


        alert(res.data.message);

    } catch (error) {

        console.log(error);

        alert(

        error.response?.data?.message ||

        "Save failed"

        );

    } finally {

        setSaving(false);

    }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Score Entry

        </h1>


        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

          {/* CLASS */}
          <select
            name="classId"
            value={filters.classId}
            onChange={handleFilterChange}
            disabled={user?.role === "teacher"}
            className="border rounded-lg px-4 py-3"
          >

            <option value="">
              Select Class
            </option>

            {
              user?.role === "teacher"

                ? teacherClass && (

                  <option
                    value={teacherClass.id}
                  >

                    {teacherClass.className}

                  </option>

                )

                : classes.map((cls) => (

                <option
                  key={cls.id}
                  value={cls.id}
                >

                  {cls.className}

                </option>

              ))
            }

          </select>


          {/* SUBJECT */}
          <select
            name="subjectId"
            value={filters.subjectId}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-3"
          >

            <option value="">
              Select Subject
            </option>

            {
              subjects.map((subject) => (

                <option
                  key={subject.id}
                  value={subject.id}
                >

                  {subject.subjectName}

                </option>

              ))
            }

          </select>


          {/* SESSION */}
          <select
            name="sessionId"
            value={filters.sessionId}
            onChange={handleFilterChange}
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
            onChange={handleFilterChange}
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
            onClick={loadScoreSheet}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3"
          >

            {
              loading
                ? "Loading..."
                : "Load Scoresheet"
            }

          </button>

        </div>


        {/* TABLE */}
        <div className="overflow-x-auto">

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

              {
                students.map(
                  (item, index) => (

                    <tr
                      key={item.student.id}
                      className="border-b"
                    >

                      {/* NAME */}
                      <td className="p-3">

                        {
                          item.student.fullName
                        }

                      </td>


                      {/* FIRST CA */}
                      <td className="p-3">

                        <input
                          type="number"
                          max="15"
                          value={
                            item.score.firstCA
                          }
                          onChange={(e) =>
                            handleScoreChange(

                              index,

                              "firstCA",

                              e.target.value

                            )
                          }
                          className="border rounded px-3 py-2 w-20"
                        />

                      </td>


                      {/* SECOND CA */}
                      <td className="p-3">

                        <input
                          type="number"
                          max="15"
                          value={
                            item.score.secondCA
                          }
                          onChange={(e) =>
                            handleScoreChange(

                              index,

                              "secondCA",

                              e.target.value

                            )
                          }
                          className="border rounded px-3 py-2 w-20"
                        />

                      </td>


                      {/* PROJECT */}
                      <td className="p-3">

                        <input
                          type="number"
                          max="10"
                          value={
                            item.score.project
                          }
                          onChange={(e) =>
                            handleScoreChange(

                              index,

                              "project",

                              e.target.value

                            )
                          }
                          className="border rounded px-3 py-2 w-20"
                        />

                      </td>


                      {/* EXAM */}
                      <td className="p-3">

                        <input
                          type="number"
                          max="60"
                          value={
                            item.score.exam
                          }
                          onChange={(e) =>
                            handleScoreChange(

                              index,

                              "exam",

                              e.target.value

                            )
                          }
                          className="border rounded px-3 py-2 w-20"
                        />

                      </td>


                      {/* TOTAL */}
                      <td className="p-3 font-bold">

                        {
                          item.score.total
                        }

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

          {/* SAVE */}
            <div className="mt-6">

                <button
                    onClick={saveScores}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >

                    {
                        loading
                            ? "Saving..."
                            : "Save All Scores"
                    }

                </button>

            </div>

        </div>

      </div>

    </div>

  );

}

export default ScoreEntry;