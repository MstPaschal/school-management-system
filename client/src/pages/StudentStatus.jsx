import {
  useEffect,
  useState
} from "react";

import api from "../services/api";


function StudentStatus() {

  const [classes, setClasses] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [selectedClass, setSelectedClass] =
    useState("");


  // LOAD CLASSES
  useEffect(() => {

    fetchClasses();

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


  // LOAD STUDENTS
  const loadStudents =
    async () => {

      if (!selectedClass) {

        return alert(
          "Select class"
        );

      }

      try {

        setLoading(true);

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


  // CHANGE STATUS
  const changeStatus =
    async (studentId) => {

      try {

        const res =
          await api.put(

            `/students/status/${studentId}`

          );

        alert(
          res.data.message
        );

        loadStudents();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Failed to update status"

        );

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Student Status Manager

        </h1>


        {/* FILTER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          {/* CLASS */}
          <select
            value={selectedClass}
            onChange={(e) =>
              setSelectedClass(
                e.target.value
              )
            }
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


          {/* LOAD BUTTON */}
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

            <div className="overflow-x-auto">

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
                    students.map((student) => (

                      <tr
                        key={student.id}
                        className="border-b"
                      >

                        {/* NAME */}
                        <td className="p-3">

                          {student.fullName}

                        </td>


                        {/* REG NUMBER */}
                        <td className="p-3">

                          {student.regNumber}

                        </td>


                        {/* STATUS */}
                        <td className="p-3">

                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              student.status ===
                              "ACTIVE"

                                ? "bg-green-100 text-green-700"

                                : "bg-red-100 text-red-700"
                            }`}
                          >

                            {student.status}

                          </span>

                        </td>


                        {/* ACTION */}
                        <td className="p-3">

                          <button
                            onClick={() =>
                              changeStatus(
                                student.id
                              )
                            }
                            className={`px-4 py-2 rounded-lg text-white ${
                              student.status ===
                              "ACTIVE"

                                ? "bg-red-600 hover:bg-red-700"

                                : "bg-green-600 hover:bg-green-700"
                            }`}
                          >

                            {
                              student.status ===
                              "ACTIVE"

                                ? "Deactivate"

                                : "Activate"
                            }

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

      </div>

    </div>

  );

}

export default StudentStatus;