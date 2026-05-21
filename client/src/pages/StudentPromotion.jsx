import {
  useEffect,
  useState
} from "react";

import api from "../services/api";


function StudentPromotion() {

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

  const [filters, setFilters] =
    useState({

      classId: "",

      sessionId: ""

    });

  const [newClassId, setNewClassId] =
    useState("");


  // LOAD DATA
  useEffect(() => {

    fetchClasses();

    fetchSessions();

  }, []);


  // FETCH CLASSES
  const fetchClasses =
    async () => {

      try {

        const res =
          await api.get("/classes");

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
          await api.get("/sessions");

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



    // SELECT ALL
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
            (item) => item.student.id
            )

        );

        }

    };


  // SELECT STUDENT
  const toggleStudent =
    (studentId) => {

      if (
        selectedStudents.includes(studentId)
      ) {

        setSelectedStudents(

          selectedStudents.filter(
            (id) => id !== studentId
          )

        );

      } else {

        setSelectedStudents([

          ...selectedStudents,

          studentId

        ]);

      }

    };


  // PROMOTE
  const promoteStudents =
    async () => {

      if (
        selectedStudents.length === 0
      ) {

        return alert(
          "Select students"
        );

      }

      if (!newClassId) {

        return alert(
          "Select new class"
        );

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

        alert(res.data.message);

        setSelectedStudents([]);

        loadStudents();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||

          "Promotion failed"
        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Student Promotion

        </h1>


        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          {/* CLASS */}
          <select
            name="classId"
            value={filters.classId}
            onChange={handleChange}
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


        {/* STUDENTS TABLE */}
        {
          students.length > 0 && (

            <div className="overflow-x-auto mb-8">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-3">

                    <div className="flex items-center gap-2">

                        <input
                        type="checkbox"
                        checked={
                            students.length > 0 &&

                            selectedStudents.length ===
                            students.length
                        }
                        onChange={toggleSelectAll}
                        />

                        <span>Select All</span>

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
                    students.map((item) => (

                      <tr
                        key={item.student.id}
                        className="border-b"
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
                          />

                        </td>

                        <td className="p-3">

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

                    ))
                  }

                </tbody>

              </table>

            </div>

          )
        }


        {/* PROMOTION */}
        {
          students.length > 0 && (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <select
                value={newClassId}
                onChange={(e) =>
                  setNewClassId(
                    e.target.value
                  )
                }
                className="border rounded-lg px-4 py-3"
              >

                <option value="">
                  Select Promotion Class
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

                <option value="GRADUATED">

                  GRADUATED

                </option>

              </select>


              <button
                onClick={promoteStudents}
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-3"
              >

                Promote Selected Students

              </button>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default StudentPromotion;