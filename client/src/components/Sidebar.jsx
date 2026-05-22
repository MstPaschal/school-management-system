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

  FaFileUpload,

  FaBars,

  FaTimes

} from "react-icons/fa";

import {

  Link,

  useNavigate

} from "react-router-dom";

import {

  useAuth

} from "../context/AuthContext";

import {

  useState

} from "react";


function Sidebar() {

  const { user, logout } =
    useAuth();

  const navigate =
    useNavigate();

  const [isOpen, setIsOpen] =
    useState(false);


  const handleLogout =
    () => {

      logout();

      navigate("/");

    };


  const closeSidebar =
    () => {

      setIsOpen(false);

    };


  return (

    <>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() =>
          setIsOpen(true)
        }
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-900 text-white p-3 rounded-lg shadow-lg"
      >

        <FaBars size={20} />

      </button>


      {/* OVERLAY */}
      {
        isOpen && (

          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />

        )
      }


      {/* SIDEBAR */}
      <div
        className={`

          fixed top-0 left-0 z-50

          w-64 min-h-screen

          bg-blue-900 text-white p-5

          flex flex-col justify-between

          transform transition-transform duration-300

          ${

            isOpen
              ? "translate-x-0"
              : "-translate-x-full"

          }

          lg:translate-x-0 lg:static

        `}
      >

        <div>

          {/* MOBILE CLOSE BUTTON */}
          <div className="flex justify-between items-center mb-6 lg:hidden">

            <h1 className="text-xl font-bold">

              Menu

            </h1>

            <button
              onClick={closeSidebar}
              className="text-white"
            >

              <FaTimes size={22} />

            </button>

          </div>


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
                onClick={closeSidebar}
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
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaUserCheck />

                      Create Admin

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/result-pins"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaClipboardList />

                      Result Pins

                    </Link>

                  </li>

                </>
              )
            }


            {/* ADMIN */}
            {
              (
                user?.role === "admin" ||
                user?.role === "superadmin"
              ) && (

                <>

                  <li>

                    <Link
                      to="/students/create"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaUserGraduate />

                      Create Student

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/students/view"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaUserGraduate />

                      View Students

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/student-status"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaUserCheck />

                      Student Status

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/student-promotion"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaArrowUp />

                      Student Promotion

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/sessions"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaClipboardList />

                      Sessions

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/teachers"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaChalkboardTeacher />

                      Teachers

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/comment-manager"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaComment />

                      Comment Manager

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/admin-settings"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaMoneyBill />

                      Admin Settings

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/classes"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaSchool />

                      Classes

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/subjects"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaBookOpen />

                      Subjects

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/assign-subject"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaTasks />

                      Assign Subjects

                    </Link>

                  </li>


                  <li>

                    <Link
                      to="/documents"
                      onClick={closeSidebar}
                      className="flex items-center gap-3 hover:text-yellow-300"
                    >

                      <FaFileUpload />

                      Documents

                    </Link>

                  </li>

                </>

              )
            }


            {/* COMMON */}
            <li>

              <Link
                to="/score-entry"
                onClick={closeSidebar}
                className="flex items-center gap-3 hover:text-yellow-300"
              >

                <FaBook />

                Score Entry

              </Link>

            </li>


            <li>

              <Link
                to="/make-comments"
                onClick={closeSidebar}
                className="flex items-center gap-3 hover:text-yellow-300"
              >

                <FaRegCommentDots />

                Make Comments

              </Link>

            </li>


            <li>

              <Link
                to="/payments/set"
                onClick={closeSidebar}
                className="flex items-center gap-3 hover:text-yellow-300"
              >

                <FaMoneyBill />

                Payments

              </Link>

            </li>


            <li>

              <Link
                to="/results"
                onClick={closeSidebar}
                className="flex items-center gap-3 hover:text-yellow-300"
              >

                <FaClipboardList />

                Reports

              </Link>

            </li>

          </ul>

        </div>


        <div className="space-y-4">

          {/* CHANGE PASSWORD */}
          <Link
            to="/change-password"
            onClick={closeSidebar}
            className="flex items-center gap-3 hover:text-yellow-300"
          >

            <FaUserCheck />

            Change Password

          </Link>


          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </div>

    </>

  );

}

export default Sidebar;