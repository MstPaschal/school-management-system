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
      {
        !isOpen && (
          <button
            onClick={() =>
              setIsOpen(true)
            }
            className="lg:hidden fixed top-4 left-4 z-[60] bg-blue-900 text-white p-3 rounded-lg shadow-lg"
          >
          </button>
        )
      }


      {/* OVERLAY */}
      {
        isOpen && (

          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

        )
      }


      {/* SIDEBAR */}
      <aside
  
        className={`

          fixed lg:sticky
          top-0 left-0 z-50

          w-64 h-screen

          bg-blue-900 text-white p-5

          flex flex-col justify-between

          transform transition-transform duration-300

          ${

            isOpen
              ? "translate-x-0"
              : "-translate-x-full"

          }

          lg:translate-x-0

          overflow-y-auto

        `}
      >

        {/* HEADER */}
        <div className="p-5 border-b border-blue-800">

          <div className="flex items-center justify-between lg:hidden">

            <h1 className="text-xl font-bold">

              Menu

            </h1>

            <button
              onClick={closeSidebar}
            >

              <FaTimes size={22} />

            </button>

          </div>

          <div className="mt-2">

            <h1 className="text-2xl font-bold">

              Grisfield Schools

            </h1>

            <p className="text-sm text-blue-200 mt-1 capitalize">

              {user?.role}

            </p>

          </div>

        </div>


        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto px-5 py-6 scrollbar-hide">

          <ul className="space-y-3">


            {/* DASHBOARD */}
            <SidebarLink
              to={
                user?.role === "teacher"
                  ? "/teacher-dashboard"
                  : "/dashboard"
              }
              icon={<FaHome />}
              label="Dashboard"
              closeSidebar={closeSidebar}
            />


            {/* SUPER ADMIN */}
            {
              user?.role === "superadmin" && (

                <>

                  <SidebarLink
                    to="/create-admin"
                    icon={<FaUserCheck />}
                    label="Create Admin"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/result-pins"
                    icon={<FaClipboardList />}
                    label="Result Pins"
                    closeSidebar={closeSidebar}
                  />

                </>

              )
            }


            {/* ADMIN + SUPERADMIN */}
            {
              (
                user?.role === "admin" ||
                user?.role === "superadmin"
              ) && (

                <>

                  <SidebarLink
                    to="/students/create"
                    icon={<FaUserGraduate />}
                    label="Create Student"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/students/view"
                    icon={<FaUserGraduate />}
                    label="View Students"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/student-status"
                    icon={<FaUserCheck />}
                    label="Student Status"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/student-promotion"
                    icon={<FaArrowUp />}
                    label="Student Promotion"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/sessions"
                    icon={<FaClipboardList />}
                    label="Sessions"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/teachers"
                    icon={<FaChalkboardTeacher />}
                    label="Teachers"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/comment-manager"
                    icon={<FaComment />}
                    label="Comment Manager"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/admin-settings"
                    icon={<FaMoneyBill />}
                    label="Admin Settings"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/classes"
                    icon={<FaSchool />}
                    label="Classes"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/subjects"
                    icon={<FaBookOpen />}
                    label="Subjects"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/assign-subject"
                    icon={<FaTasks />}
                    label="Assign Subjects"
                    closeSidebar={closeSidebar}
                  />

                  <SidebarLink
                    to="/documents"
                    icon={<FaFileUpload />}
                    label="Documents"
                    closeSidebar={closeSidebar}
                  />

                </>

              )
            }


            {/* COMMON */}
            <SidebarLink
              to="/score-entry"
              icon={<FaBook />}
              label="Score Entry"
              closeSidebar={closeSidebar}
            />

            <SidebarLink
              to="/make-comments"
              icon={<FaRegCommentDots />}
              label="Make Comments"
              closeSidebar={closeSidebar}
            />

            <SidebarLink
              to="/payments/set"
              icon={<FaMoneyBill />}
              label="Payments"
              closeSidebar={closeSidebar}
            />

            <SidebarLink
              to="/results"
              icon={<FaClipboardList />}
              label="Reports"
              closeSidebar={closeSidebar}
            />

          </ul>

        </div>


        {/* FOOTER */}
        <div className="p-5 border-t border-blue-800 space-y-3">

          <SidebarLink
            to="/change-password"
            icon={<FaUserCheck />}
            label="Change Password"
            closeSidebar={closeSidebar}
          />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>

    </>

  );

}


// REUSABLE SIDEBAR LINK
function SidebarLink({
  to,
  icon,
  label,
  closeSidebar
}) {

  return (

    <li>

      <Link
        to={to}
        onClick={closeSidebar}
        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition duration-200"
      >

        {icon}

        <span>{label}</span>

      </Link>

    </li>

  );

}

export default Sidebar;