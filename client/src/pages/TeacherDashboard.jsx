import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaSchool
} from "react-icons/fa";


function TeacherDashboard() {

  const [teacherData, setTeacherData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // ======================================
  // LOAD TEACHER DASHBOARD
  // ======================================
  useEffect(() => {

    fetchTeacherDashboard();

  }, []);


  const fetchTeacherDashboard =
    async () => {

      try {

        const res =
          await api.get(
            "/dashboard/teacher"
          );

        setTeacherData(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };


  if (loading) {

    return (

      <div className="p-6">

        <h1 className="text-2xl font-bold">

          Loading Teacher Dashboard...

        </h1>

      </div>

    );

  }


  return (

    <div className="p-6">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-8">

        Teacher Dashboard

      </h1>


      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


        {/* TEACHER INFO */}
        <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-6 flex justify-between items-center">

          <div>

            <h2 className="text-lg font-medium">

              Teacher

            </h2>

            <p className="text-2xl font-bold mt-2">

              {
                teacherData?.teacher
                  ?.fullName || "N/A"
              }

            </p>

          </div>

          <FaChalkboardTeacher size={45} />

        </div>


        {/* ASSIGNED CLASS */}
        <div className="bg-green-600 text-white rounded-2xl shadow-lg p-6 flex justify-between items-center">

          <div>

            <h2 className="text-lg font-medium">

              Assigned Class

            </h2>

            <p className="text-2xl font-bold mt-2">

              {
                teacherData?.assignedClass
                  ?.className || "N/A"
              }

            </p>

          </div>

          <FaSchool size={45} />

        </div>


        {/* TOTAL STUDENTS */}
        <div className="bg-purple-600 text-white rounded-2xl shadow-lg p-6 flex justify-between items-center">

          <div>

            <h2 className="text-lg font-medium">

              Total Students

            </h2>

            <p className="text-2xl font-bold mt-2">

              {
                teacherData?.studentCount || 0
              }

            </p>

          </div>

          <FaUserGraduate size={45} />

        </div>

      </div>


      {/* DETAILS SECTION */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">

          Teacher Information

        </h2>


        <div className="space-y-4">

          <p>

            <strong>Full Name:</strong>{" "}

            {
              teacherData?.teacher
                ?.fullName || "N/A"
            }

          </p>


          <p>

            <strong>Registration Number:</strong>{" "}

            {
              teacherData?.teacher
                ?.regNumber || "N/A"
            }

          </p>


          <p>

            <strong>Assigned Class:</strong>{" "}

            {
              teacherData?.assignedClass
                  ?.className || "N/A"
            }

          </p>


          <p>

            <strong>Total Students In Class:</strong>{" "}

            {
              teacherData?.studentCount || 0
            }

          </p>

        </div>

      </div>

    </div>

  );

}

export default TeacherDashboard;