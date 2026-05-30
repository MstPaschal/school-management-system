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
  FaTimes,
  FaAddressBook
} from "react-icons/fa";

import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/portal");
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* MOBILE BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-[60] bg-blue-900 text-white p-3 rounded-lg shadow-lg"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          w-64 h-screen
          bg-blue-900 text-white p-5
          flex flex-col justify-between
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          overflow-y-auto
        `}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-blue-800">
          <div className="flex items-center justify-between lg:hidden">
            <h1 className="text-xl font-bold">Menu</h1>
            <button onClick={closeSidebar}>
              <FaTimes size={22} />
            </button>
          </div>

          <div className="mt-2">
            <h1 className="text-2xl font-bold">Grisfield Schools</h1>
            <p className="text-sm text-blue-200 mt-1 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-3">

            <SidebarLink
              to={
                user?.role === "teacher"
                  ? "/teacher-dashboard"
                  : "/dashboard"
              }
              icon={<FaHome />}
              label="Dashboard"
              location={location}
              closeSidebar={closeSidebar}
            />

            {user?.role === "superadmin" && (
              <>
                <SidebarLink
                  to="/create-admin"
                  icon={<FaUserCheck />}
                  label="Create Admin"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/result-pins"
                  icon={<FaClipboardList />}
                  label="Result Pins"
                  location={location}
                  closeSidebar={closeSidebar}
                />
              </>
            )}

            {(user?.role === "admin" ||
              user?.role === "superadmin") && (
              <>
                <SidebarLink
                  to="/students/create"
                  icon={<FaUserGraduate />}
                  label="Create Student"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/students/view"
                  icon={<FaUserGraduate />}
                  label="View Students"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/student-status"
                  icon={<FaUserCheck />}
                  label="Student Status"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/student-promotion"
                  icon={<FaArrowUp />}
                  label="Student Promotion"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/sessions"
                  icon={<FaClipboardList />}
                  label="Sessions"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/teachers"
                  icon={<FaChalkboardTeacher />}
                  label="Teachers"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/comment-manager"
                  icon={<FaComment />}
                  label="Comment Manager"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/admin-settings"
                  icon={<FaMoneyBill />}
                  label="Admin Settings"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/classes"
                  icon={<FaSchool />}
                  label="Classes"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/subjects"
                  icon={<FaBookOpen />}
                  label="Subjects"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/assign-subject"
                  icon={<FaTasks />}
                  label="Assign Subjects"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/documents"
                  icon={<FaFileUpload />}
                  label="Documents"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/admission-requests"
                  icon={<FaAddressBook />}
                  label="Admissions"
                  location={location}
                  closeSidebar={closeSidebar}
                />
              </>
            )}

            <SidebarLink
              to="/score-entry"
              icon={<FaBook />}
              label="Score Entry"
              location={location}
              closeSidebar={closeSidebar}
            />

            <SidebarLink
              to="/make-comments"
              icon={<FaRegCommentDots />}
              label="Make Comments"
              location={location}
              closeSidebar={closeSidebar}
            />

            <SidebarLink
              to="/payments/set"
              icon={<FaMoneyBill />}
              label="Payments"
              location={location}
              closeSidebar={closeSidebar}
            />

            <SidebarLink
              to="/results"
              icon={<FaClipboardList />}
              label="Reports"
              location={location}
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
            location={location}
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

/* =========================
   REUSABLE LINK (UPDATED)
========================= */
function SidebarLink({
  to,
  icon,
  label,
  location,
  closeSidebar
}) {
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        onClick={closeSidebar}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200
          ${isActive ? "bg-blue-700" : "hover:bg-blue-800"}
        `}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
}

export default Sidebar;