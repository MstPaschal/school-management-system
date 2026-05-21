import {

  FaHome,

  FaUserGraduate,

  FaChalkboardTeacher,

  FaBook,

  FaComment,

  FaMoneyBill,

  FaClipboardList,

  FaSchool,

  FaBookOpen,

  FaTasks,

  FaSignOutAlt,

  FaRegCommentDots,

  FaUserCheck,

  FaArrowUp,

  FaFileUpload

} from "react-icons/fa";

import {

  Link,

  useNavigate

} from "react-router-dom";

import {

  useAuth

} from "../context/AuthContext";



function Sidebar() {

  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();


  const handleLogout =
    () => {

      logout();

      navigate("/");

    };


  return (

    <div className="w-64 min-h-screen bg-blue-900 text-white p-5 flex flex-col justify-between">

      <div>

        <h1 className="text-2xl font-bold mb-2">

          Grisfield Schools

        </h1>

        <p className="text-sm text-gray-300 mb-10">

          {user?.role}

        </p>


        <ul className="space-y-4">

          <li>

            <Link
              to={
                user?.role === "teacher"
                  ? "/teacher-dashboard"
                  : "/dashboard"
              }
              className="flex items-center gap-3 hover:text-yellow-300"
            >

              <FaHome />

              Dashboard

            </Link>

          </li>

          {/* SUPER ADMIN ONLY */}
          {
            user?.role === "superadmin" && (
            <>
              <li>

                <Link
                  to="/create-admin"
                  className="flex items-center gap-3 hover:text-yellow-300"
                >

                  <FaUserCheck />

                  Create Admin

                </Link>

              </li>

              
              
              <li>

                  <Link
                    to="/result-pins"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaClipboardList />

                    Result Pins

                  </Link>

                </li>
              </>
            )
          }
          {/* ADMIN ONLY */}
          {
            (
              user?.role === "admin" ||
              user?.role === "superadmin"
            ) && (

              <>

                {/* CREATE STUDENT */}
                <li>

                  <Link
                    to="/students/create"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaUserGraduate />

                    Create Student

                  </Link>

                </li>


                {/* VIEW STUDENTS */}
                <li>

                  <Link
                    to="/students/view"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaUserGraduate />

                    View Students

                  </Link>

                </li>


                {/* STUDENT STATUS */}
                <li>

                  <Link
                    to="/student-status"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaUserCheck />

                    Student Status

                  </Link>

                </li>


                <li>

                  <Link
                    to="/student-promotion"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaArrowUp />

                    Student Promotion

                  </Link>

                </li>


                <li>

                  <Link
                    to="/sessions"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaClipboardList />

                    Sessions

                  </Link>

                </li>


                <li>

                  <Link
                    to="/teachers"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaChalkboardTeacher />

                    Teachers

                  </Link>

                </li>


                <li>
                  <Link 
                    to="/comment-manager"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaComment />

                    Comment Manager

                  </Link>
                </li>


                <li>

                  <Link
                    to="/admin-settings"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaMoneyBill />

                    Admin Settings

                  </Link>

                </li>


                <li>

                  <Link
                    to="/classes"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaSchool />

                    Classes

                  </Link>

                </li>


                <li>

                  <Link
                    to="/subjects"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaBookOpen />

                    Subjects

                  </Link>

                </li>


                <li>

                  <Link
                    to="/assign-subject"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaTasks />

                    Assign Subjects

                  </Link>

                </li>


                <li>

                  <Link
                    to="/documents"
                    className="flex items-center gap-3 hover:text-yellow-300"
                  >

                    <FaFileUpload />

                    Documents

                  </Link>

                </li>


              </>

            )
          }


          {/* BOTH ADMIN & TEACHERS */}
          <li>

            <Link
              to="/score-entry"
              className="flex items-center gap-3 hover:text-yellow-300"
            >

              <FaBook />

              Score Entry

            </Link>

          </li>


          <li>
            <Link
              to="/make-comments"
              className="flex items-center gap-3 hover:text-yellow-300"
            >

              <FaRegCommentDots />

              Make Comments

            </Link>
          </li>


          <li>

            <Link
              to="/payments/set"
              className="flex items-center gap-3 hover:text-yellow-300"
            >

              <FaMoneyBill />

              Payments

            </Link>

          </li>


          


          


          <li>

            <Link
              to="/results"
              className="flex items-center gap-3 hover:text-yellow-300"
            >

              <FaClipboardList />

              Reports

            </Link>

          </li>

        </ul>

      </div>

      {/* CHANGE PASSWORD */}
      <li>

        <Link
          to="/change-password"
          className="flex items-center gap-3 hover:text-yellow-300"
        >

          <FaUserCheck />

          Change Password

        </Link>

      </li>
      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg"
      >

        <FaSignOutAlt />

        Logout

      </button>

    </div>

  );

}

export default Sidebar;