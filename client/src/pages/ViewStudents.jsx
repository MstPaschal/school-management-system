import {

  useEffect,

  useState

} from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";


function ViewStudents() {

  const navigate =
    useNavigate();

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

  const [selectedStudent,
  setSelectedStudent] =
  useState(null);

  const [showProfile,
  setShowProfile] =
  useState(false);


  // LOAD DATA
  useEffect(() => {

    fetchStudents();

    fetchClasses();

  }, []);


  // FETCH STUDENTS
  const fetchStudents =
    async () => {

      try {

        const res =
          await api.get(
            "/students"
          );

        setStudents(res.data);

        setFilteredStudents(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };


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


  // DELETE STUDENT
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(

          "Are you sure you want to delete this student?"

        );

      if (!confirmDelete) return;


      try {

        const res =
          await api.delete(

            `/students/${id}`

          );

        alert(
          res.data.message
        );

        fetchStudents();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Delete failed"

        );

      }

    };


  // SEARCH & FILTER
  useEffect(() => {

    let data = students;


    // SEARCH
    if (search) {

      data = data.filter(
        (student) =>

          student.fullName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }


    // FILTER BY CLASS
    if (selectedClass) {

      data = data.filter(
        (student) =>

          String(
            student.currentClass
          ) ===
          String(selectedClass)
      );

    }


    setFilteredStudents(data);

  }, [

    search,

    selectedClass,

    students

  ]);


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

          <h1 className="text-3xl font-bold">

            Students

          </h1>


          <div className="flex gap-3 flex-col md:flex-row">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="border rounded-lg px-4 py-2"
            />


            {/* FILTER */}
            <select
              value={selectedClass}
              onChange={(e) =>
                setSelectedClass(
                  e.target.value
                )
              }
              className="border rounded-lg px-4 py-2"
            >

              <option value="">
                All Classes
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


        {/* TABLE */}
        <div className="overflow-x-auto">

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
                  (student) => (

                    <tr
                      key={student.id}
                      className="border-b"
                    >

                      {/* PASSPORT */}
                      <td className="p-3">

                        {
                          student.passport
                            ? (

                              <img
                                src={`http://localhost:5000/uploads/${student.passport}`}
                                alt="passport"
                                className="w-14 h-14 rounded-full object-cover"
                              />

                            ) : (

                              <div className="w-14 h-14 rounded-full bg-gray-300" />

                            )
                        }

                      </td>


                      {/* NAME */}
                      <td className="p-3 font-medium">

                        {student.fullName}

                      </td>


                      {/* GENDER */}
                      <td className="p-3">

                        {student.gender}

                      </td>


                      {/* REG NUMBER */}
                      <td className="p-3">

                        {student.regNumber}

                      </td>


                      {/* STATUS */}
                      <td className="p-3">

                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            student.status === "ACTIVE"
                              ? "bg-green-500"
                              : student.status === "INACTIVE"
                              ? "bg-red-500"
                              : "bg-purple-500"
                          }`}
                        >

                          {student.status}

                        </span>

                      </td>


                      {/* ACTIONS */}
                      <td className="p-3 flex gap-2">

                        <button
                          onClick={() =>
                            navigate(
                              `/students/edit/${student.id}`
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >

                          Edit

                        </button>


                        <button
                          onClick={() => {

                            setSelectedStudent(student);

                            setShowProfile(true);

                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >

                          View

                        </button>


                        <button
                          onClick={() =>
                            handleDelete(student.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        
        {/* PROFILE MODAL */}
          {
            showProfile && selectedStudent && (

              <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">

                  {/* HEADER */}
                  <div className="bg-blue-700 text-white p-6 text-center">

                    {/* SCHOOL LOGO */}
                    <div className="flex justify-center mb-3">

                      <img
                        src="/public/Logo.png"
                        alt="School Logo"
                        className="w-24 h-24 object-cover rounded-full border-4 border-white"
                      />

                    </div>

                    <h1 className="text-3xl font-bold">

                      GRISFIELD SCHOOLS

                    </h1>

                    <p className="text-lg mt-2">

                      STUDENT PROFILE

                    </p>

                  </div>


                  {/* BODY */}
                  <div className="p-6">

                    <div className="flex flex-col md:flex-row gap-6">

                      {/* PASSPORT */}
                      <div className="flex justify-center">

                        {
                          selectedStudent.passport
                            ? (

                              <img
                                src={`http://localhost:5000/uploads/${selectedStudent.passport}`}
                                alt="passport"
                                className="w-40 h-40 rounded-xl object-cover border"
                              />

                            ) : (

                              <div className="w-40 h-40 rounded-xl bg-gray-300" />

                            )
                        }

                      </div>


                      {/* DETAILS */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>

                          <h3 className="font-bold text-gray-600">

                            Full Name

                          </h3>

                          <p>

                            {selectedStudent.fullName}

                          </p>

                        </div>


                        <div>

                          <h3 className="font-bold text-gray-600">

                            Reg Number

                          </h3>

                          <p>

                            {selectedStudent.regNumber}

                          </p>

                        </div>


                        <div>

                          <h3 className="font-bold text-gray-600">

                            Gender

                          </h3>

                          <p>

                            {selectedStudent.gender}

                          </p>

                        </div>


                        <div>

                          <h3 className="font-bold text-gray-600">

                            Status

                          </h3>

                          <p>

                            {selectedStudent.status}

                          </p>

                        </div>


                        <div>

                          <h3 className="font-bold text-gray-600">

                            Date Of Birth

                          </h3>

                          <p>

                            {selectedStudent.dob}

                          </p>

                        </div>


                        <div>

                          <h3 className="font-bold text-gray-600">

                            Class

                          </h3>

                          <p>

                            {
                              classes.find(
                                (cls) =>
                                  String(cls.id) ===
                                  String(selectedStudent.currentClass)
                              )?.className || "N/A"
                            }

                          </p>

                        </div>


                        <div>

                          <h3 className="font-bold text-gray-600">

                            Parent Contact

                          </h3>

                          <p>

                            {selectedStudent.contact1}

                          </p>

                        </div>


                        <div>

                          <h3 className="font-bold text-gray-600">

                            Parent Contact

                          </h3>

                          <p>

                            {selectedStudent.contact2}

                          </p>

                        </div>


                        <div>

                          <h3 className="font-bold text-gray-600">

                            Address

                          </h3>

                          <p>

                            {selectedStudent.address}

                          </p>

                        </div>

                      </div>

                    </div>


                    {/* CLOSE BUTTON */}
                    <div className="mt-8 text-center">

                      <button
                        onClick={() =>
                          setShowProfile(false)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
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

      </div>

    </div>

  );

}

export default ViewStudents;